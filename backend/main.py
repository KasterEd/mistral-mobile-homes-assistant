# main.py
import os, ssl, smtplib, socket
from datetime import datetime
from email.message import EmailMessage

from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, field_validator
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "mail.sinomodx.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))  # SSL port
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
MAIL_TO   = os.getenv("MAIL_TO", SMTP_USER)

if not (SMTP_USER and SMTP_PASS and MAIL_TO):
    raise RuntimeError("Missing SMTP_USER/SMTP_PASS/MAIL_TO env vars")

app = FastAPI(title="Contact Form Mailer")

# Allow your frontend origin(s)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://sinomodx.com", "https://www.sinomodx.com", "http://localhost:5173"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

    @field_validator("name")
    @classmethod
    def name_len(cls, v):
        v = v.strip()
        if not (1 <= len(v) <= 80):
            raise ValueError("Name must be 1–80 chars")
        return v

    @field_validator("subject")
    @classmethod
    def subj_len(cls, v):
        v = v.strip()
        if not (1 <= len(v) <= 120):
            raise ValueError("Subject must be 1–120 chars")
        return v

    @field_validator("message")
    @classmethod
    def msg_len(cls, v):
        v = v.strip()
        if not (1 <= len(v) <= 5000):
            raise ValueError("Message must be 1–5000 chars")
        return v

def build_email(data: ContactForm) -> EmailMessage:
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    body = (
        f"New contact form submission\n"
        f"Time: {now}\n"
        f"Name: {data.name}\n"
        f"Email: {data.email}\n"
        f"Subject: {data.subject}\n\n"
        f"{data.message}\n"
    )
    msg = EmailMessage()
    msg["From"] = SMTP_USER                    # must be your mailbox (DMARC-friendly)
    msg["To"] = MAIL_TO
    msg["Reply-To"] = str(data.email)          # you can reply directly to the visitor
    msg["Subject"] = f"[Contact] {data.subject}"
    msg["Date"] = datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000")
    msg["X-Mailer"] = "SinoMod-FastAPI"
    msg.set_content(body)
    return msg

def send_via_smtps(msg: EmailMessage):
    context = ssl.create_default_context()
    # Optional: pin SNI / timeout
    timeout = 20
    try:
        with smtplib.SMTP_SSL(host=SMTP_HOST, port=SMTP_PORT, context=context, timeout=timeout) as server:
            server.ehlo()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
    except (smtplib.SMTPException, socket.timeout) as e:
        raise RuntimeError(f"SMTP send failed: {e}")

@app.post("/contact")
def contact(form: ContactForm, bg: BackgroundTasks):
    msg = build_email(form)
    # send in background to respond quickly
    bg.add_task(send_via_smtps, msg)
    return {"ok": True, "message": "Thank you. We received your message."}
