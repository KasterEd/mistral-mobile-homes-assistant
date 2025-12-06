# backend/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    def __init__(self) -> None:
        self.mistral_api_key: str = os.getenv("MISTRAL_API_KEY", "")
        self.mistral_model: str = os.getenv("MISTRAL_MODEL", "mistral-small-latest")

settings = Settings()