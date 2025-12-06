# backend/catalog.py
import json
from pathlib import Path
from typing import Literal
from fastapi import HTTPException

LANG = Literal["zh", "kz", "ru", "en", "fr"]

DATA_PATH = Path(__file__).parent / "data" / "catalog_llm.json"

with DATA_PATH.open("r", encoding="utf-8") as f:
    _CATALOG = json.load(f)

def get_catalog():
    return _CATALOG

def get_product_by_id(pid: str) -> dict | None:
    for item in _CATALOG:
        if item["id"] == pid:
            return item
    return None

def build_catalog_context(lang: LANG) -> str:
    lines: list[str] = []
    for item in _CATALOG:
        title = item["titles"][lang]
        desc = item["short"].get(lang) or item["description"][lang]
        bullets = item["bullets"][lang][:2]  # at most 2
        specs = item.get("specs", {})
        specs_str = ", ".join(f"{k}: {v}" for k, v in specs.items())

        lines.append(
            f"ID: {item['id']}\n"
            f"Title: {title}\n"
            f"Category: {item['category']}\n"
            f"Specs: {specs_str}\n"
            f"Summary: {desc}\n"
            f"Bullets: {'; '.join(bullets)}\n"
        )
    return "\n".join(lines)

