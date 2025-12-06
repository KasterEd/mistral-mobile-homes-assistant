# Mistral Mobile Homes Assistant

Multilingual product catalog site with an LLM-powered assistant that helps merchants and customers choose mobile homes for construction sites and camps.

- **Backend:** Python, FastAPI, Mistral Chat API  
- **Frontend:** Vue 3, TypeScript, Vite  
- **Infra:** Docker, docker-compose, Nginx  
- **Live demo:** https://mistral.its-kaster.de/kz/assistant
- Current limitation:
The UI and catalog content are localized, but the LLM answers are currently configured to respond in English for consistency. Extending the assistant to respond in the selected language is part of the planned future work.

This project is submitted as part of my application for the **Software Engineer – Paris (Internship)** position at Mistral AI.

---
## Key Files (Mistral Assistant)

- `backend/data/catalog_llm.json`  
  JSON catalog of all products (IDs, categories, localized text, specs, image URLs) used as the assistant’s knowledge base.

- `backend/catalog.py`  
  Loads `catalog_llm.json`, builds the catalog context for prompts, and provides helpers (e.g. `get_product_by_id`) to resolve model-selected IDs into full product data.

- `backend/routes/chat.py`  
  FastAPI implementation of `POST /api/chat`: constructs the Mistral prompt, calls the chat API, parses its JSON response, and returns summarized recommendations with product cards.

- `frontend/src/pages/AssistnatView.vue`  
  Assistant UI page: sends user queries to `/api/chat` and renders the reply as a short summary plus product cards with image, description, and links to view or contact.


## Architecture Overview

High-level diagram:

```text
[Browser]
   |
   |  (HTTPS, /kz/assistant etc.)
   v
[Host Nginx]  --->  forwards to Docker frontend container (port 8085)
   |
   |  (reverse proxy)
   v
[Frontend container: Nginx]
   |
   |  serves Vue SPA, proxies /api/* to backend
   v
[Backend container: FastAPI]
   |
   |  calls Mistral Chat API with catalog context
   v
[Mistral API]
```

- **Frontend (`frontend/`)**
  - Vue 3 + TypeScript SPA
  - Assistant page renders:
    - Chat input
    - Summary + product cards from `/api/chat`
  - Routing supports locale prefix (e.g. `/ru/assistant`)

- **Backend (`backend/`)**
  - FastAPI app
  - `/api/chat` endpoint:
    1. Loads catalog from `catalog_llm.json`
    2. Builds a language-specific context
    3. Calls Mistral chat completions API with a JSON-only system prompt
    4. Extracts JSON, looks up matching products, and returns:

       ```json
       {
         "summary": "…",
         "products": [
           {
             "id": "packaged-box-mod",
             "category": "packaged-box",
             "title": "…",
             "description": "…",
             "image_url": "…",
             "reason": "…"
           }
         ],
         "latency_ms": 123
       }
       ```

- **Docker / Nginx**
  - `backend` container runs `uvicorn main:app` on port 8000
  - `frontend` container builds static assets and serves them with Nginx on port 8085
  - Nginx proxies `/api/*` to the backend service

---

## Background & Motivation

Over the summer I built a commercial website for a company that manufactures modular mobile homes and container buildings. The original project was a classic catalog site:

- Product types for different use cases (worker housing, storage, offices, etc.)
- Multi-language UI and static descriptions
- Contact form for business inquiries

While preparing this internship application I realized how much an LLM can simplify the **sales process** in this kind of merchant business:

- Customers rarely know which product type fits their constraints (people count, climate, stacking, budget).
- Sales teams repeatedly answer similar questions in email or chat.

This project extends that summer website with an **Intelligent Product Assistant** powered by Mistral models. Instead of browsing categories manually, a user can describe their needs in natural language and receive:

- A concise recommendation
- One or two specific products from the catalog
- Images, descriptions, and direct links to view or inquire about those products

---

## Alignment with the Mistral Internship Brief

From the job description:

> **Flexible Topic:** Choose a topic using Python with FastAPI or Next.js with TypeScript that incorporates our SDK.

This project implements that option:

- **Python + FastAPI** backend that integrates with the **Mistral chat API**.
- Frontend SPA in **TypeScript** (Vue 3) providing a chat-like interface.
- The assistant is a concrete example of “LLM-powered tooling” for a real business vertical (modular housing).

Best practices highlighted in the brief:

- **Detailed README:** this document explains architecture, setup, and how to test.
- **Easy to test:** the project can be run locally with a few commands or via Docker, and the assistant can be exercised through both HTTP and UI.

---

## Features

### 1. Commercial Product Site

- Catalog of mobile homes / container buildings grouped by usage.
- Localized UI (Chinese, Kazakh, Russian, English, French).
- Product pages with images, bullet points, and specs.
- Company information, news, and case studies.

### 2. Intelligent Product Assistant

Accessible at:

- **Live demo:** https://mistral.its-kaster.de/kz/assistant  
  (language can be switched from the navbar).

Capabilities:

- Users describe requirements (e.g. _“We need housing for 200 workers in a desert climate for 6 months”_).
- Backend sends a structured view of the catalog plus the user query to the Mistral chat API.
- Model responds with a short JSON object identifying 1–2 recommended product IDs and reasons.
- Backend enriches this with catalog metadata (title, image, description, category).
- Frontend renders **product cards** with:
  - Image
  - Short description
  - LLM-generated reason
  - Buttons:
    - “View details” → navigates to the product section of the site
    - “Contact us about this” → opens contact page with product pre-selected

### 3. Developer-Oriented Design

- Clear separation between:
  - **Deterministic catalog data** (`catalog_llm.json`)
  - **LLM reasoning** (selection and explanation)
- Strong prompt design enforcing:
  - JSON-only responses
  - Short summaries and reasons (no long essays)
- Defensive JSON parsing with fallbacks when the model does not perfectly follow constraints.
- Dockerized deployment that mirrors production setup on my personal server.

---
