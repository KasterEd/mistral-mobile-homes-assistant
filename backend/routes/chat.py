# backend/routes/chat.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import time
import json
from catalog import build_catalog_context, LANG, get_product_by_id
from config import settings
import re
router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: LANG = "en"  # default English

class ProductCard(BaseModel):
    id: str
    category: str
    title: str
    description: str
    image_url: str
    reason: str

class ChatResponse(BaseModel):
    summary: str
    products: list[ProductCard]
    latency_ms: int
def extract_json_from_text(text: str) -> str:
    """
    Extract a JSON object from a string that may contain markdown
    code fences or extra text.
    """
    text = text.strip()

    # Case 1: markdown code block like ```json\n...\n```
    if text.startswith("```"):
        lines = text.splitlines()
        # drop first line (``` or ```json)
        if lines and lines[0].startswith("```"):
            lines = lines[1:]
        # drop last line if it's a closing fence
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()

    # Case 2: extra text before/after JSON – grab from first { to last }
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        candidate = text[start : end + 1]
        return candidate

    # Fall back to original text
    return text

@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    catalog_text = build_catalog_context(req.language)

    system_prompt = f"""
    You are a recommender for mobile homes.

    Given the user's requirements and the catalog below, choose up to 2 products.

    Output ONLY valid JSON with this exact structure:

    {{
      "summary": "<one short sentence recommendation in language {req.language}>",
      "recommendations": [
        {{
          "id": "<product-id-from-catalog>",
          "reason": "<very short reason (max 25 words) in language {req.language}>"
        }}
      ]
    }}

    Constraints:
    - Use product IDs exactly as they appear in the catalog.
    - Do not invent new IDs.
    - Do not add extra fields.
    - **Do not wrap the JSON in markdown, backticks, or a code block.**
    - **Do not output any text outside of the JSON object.**
    Catalog:
    {catalog_text}
    """

    start = time.time()
    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            resp = await client.post(
                "https://api.mistral.ai/v1/chat/completions",
                headers={"Authorization": f"Bearer {settings.mistral_api_key}"},
                json={
                    "model": settings.mistral_model,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": req.message},
                    ],
                },
            )
        resp.raise_for_status()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=str(exc))

    data = resp.json()
    raw_content = data["choices"][0]["message"]["content"]

    clean = extract_json_from_text(raw_content)

    try:
        llm_obj = json.loads(clean)
    except json.JSONDecodeError:
        # Fallback: if the model still returns something weird,
        # just show it as a plain-text summary with no cards.
        latency_ms = int((time.time() - start) * 1000)
        return ChatResponse(summary=raw_content, products=[], latency_ms=latency_ms)

    summary = llm_obj.get("summary", "")
    recs = llm_obj.get("recommendations", [])

    cards = []
    for r in recs:
        pid = r.get("id")
        reason = r.get("reason", "")
        if not pid:
            continue

        item = get_product_by_id(pid)
        if not item:
            continue

        lang = req.language
        titles = item.get("titles", {})
        shorts = item.get("short", {})
        descs = item.get("description", {})

        title = titles.get(lang) or titles.get("en") or pid
        description = (
                shorts.get(lang)
                or descs.get(lang)
                or shorts.get("en")
                or descs.get("en")
                or ""
        )
        image_url = item.get("image_url", "")

        cards.append({
            "id": pid,
            "category": item["category"],
            "title": title,
            "description": description,
            "image_url": image_url,
            "reason": reason,
        })

    latency_ms = int((time.time() - start) * 1000)
    return ChatResponse(summary=summary, products=cards, latency_ms=latency_ms)
