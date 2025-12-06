<template>
  <div class="assistant-container">
    <!-- Header -->
    <header class="assistant-header">
      <div class="header-content">
        <h1>{{ L(TEXT.title) }}</h1>
        <p class="subtitle">{{ L(TEXT.subtitle) }}</p>
      </div>

      <!-- Language Switcher (Top Right) -->
      <div class="lang-switch">
        <select v-model="locale">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="zh">中文</option>
          <option value="kz">Қазақша</option>
          <option value="ru">Русский</option>
        </select>
      </div>
    </header>

    <!-- Chat Window -->
    <div class="chat-window" ref="chatContainer">
      <!-- Zero State / Placeholder (Shows only when no messages) -->
      <div v-if="messages.length === 0" class="empty-state">
        <div class="icon">💬</div>
        <h3>{{ L(TEXT.welcomeTitle) }}</h3>
        <p>{{ L(TEXT.welcomeDesc) }}</p>
      </div>

      <!-- Message List -->
      <div v-for="(reply, idx) in replies" :key="idx" class="assistant-block">
        <p class="summary">{{ reply.summary }}</p>
      <div
        v-for="p in reply.products"
        :key="p.id"
        class="mt-4 flex gap-4 rounded-lg border bg-white p-4 shadow-sm"
      >
        <img
          :src="p.image_url"
          alt=""
          class="h-24 w-24 flex-shrink-0 rounded object-cover"
        />

        <div class="flex-1">
          <h4 class="text-sm font-semibold">
            {{ p.title }}
          </h4>
          <p class="mt-1 text-xs text-gray-600">
            {{ p.description }}
          </p>
          <p class="mt-1 text-xs text-gray-500">
            {{ p.reason }}
          </p>

          <!-- CTA buttons -->
          <div class="mt-3 flex flex-wrap gap-2">
            <RouterLink
              :to="productLink(p)"
              class="inline-flex items-center rounded border px-3 py-1 text-xs font-medium hover:bg-gray-50"
            >
              View details
            </RouterLink>

            <RouterLink
              :to="contactLink(p)"
              class="inline-flex items-center rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
            >
              Contact us about this
            </RouterLink>
          </div>
        </div>
        </div>
      </div>


      <!-- Loading Indicator -->
      <div v-if="loading" class="message-row assistant">
        <div class="bubble loading-bubble">
          <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-area">
      <form @submit.prevent="send" class="input-group">
        <input
          v-model="input"
          type="text"
          :placeholder="L(TEXT.placeholder).value"
          :disabled="loading"
        />
        <button type="submit" :disabled="loading || !input.trim()">
          <!-- SVG Icon for Send -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          <span class="btn-text">{{ L(TEXT.send) }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, watch } from 'vue'
import axios from 'axios'
import { useL } from '@/composables/useL'

// --- 1. Locale & Text Definitions ---
const { L, locale } = useL()

// Define the type to strictly ensure all 5 languages are present
type LText = { zh: string; kz: string; ru: string; en: string; fr: string }

const TEXT = {
  title: {
    zh: '智能产品助手',
    kz: 'Зияткерлік өнім көмекшісі',
    ru: 'Интеллектуальный помощник',
    en: 'Intelligent Product Assistant',
    fr: 'Assistant Produit Intelligent'
  } as LText,
  subtitle: {
    zh: '全天候为您解答关于移动房屋与目录的疑问。',
    kz: 'Мобильді үйлер мен каталог туралы сұрақтарға жауап береді.',
    ru: 'Отвечает на вопросы о мобильных домах и каталоге 24/7.',
    en: 'Answering your questions about mobile homes and catalogs 24/7.',
    fr: 'Répond à vos questions sur les maisons mobiles et catalogues 24/7.'
  } as LText,
  welcomeTitle: {
    zh: '你好！有什么可以帮您？',
    kz: 'Сәлем! Сізге қалай көмектесе аламын?',
    ru: 'Здравствуйте! Чем могу помочь?',
    en: 'Hello! How can I help you?',
    fr: 'Bonjour ! Comment puis-je vous aider ?'
  } as LText,
  welcomeDesc: {
    zh: '请询问关于折叠房、太空舱或价格的信息。',
    kz: 'Жиналмалы үйлер, ғарыш капсулалары немесе бағалар туралы сұраңыз.',
    ru: 'Спросите о складных домах, капсулах или ценах.',
    en: 'Ask about folding houses, space pods, or pricing.',
    fr: 'Posez des questions sur les maisons pliables, les capsules ou les prix.'
  } as LText,
  placeholder: {
    zh: '请输入您的问题...',
    kz: 'Сұрағыңызды енгізіңіз...',
    ru: 'Введите ваш вопрос...',
    en: 'Type your question here...',
    fr: 'Tapez votre question ici...'
  } as LText,
  send: {
    zh: '发送',
    kz: 'Жіберу',
    ru: 'Отправить',
    en: 'Send',
    fr: 'Envoyer'
  } as LText,
  loading: {
    zh: '思考中...',
    kz: 'Ойлануда...',
    ru: 'Думает...',
    en: 'Thinking...',
    fr: 'Réflexion...'
  } as LText
}

// --- 2. Chat Logic ---

interface ProductCard {
  id: string
  category: string
  title: string
  description: string
  image_url: string
  reason: string
}

function productLink(p: ProductCard) {
  // catalog section for this category
  return `/products/${p.category}`
}

function contactLink(p: ProductCard) {
  // pass product id so contact form can prefill subject later if you want
  return `/contact?product=${encodeURIComponent(p.id)}`
}

interface ChatReply {
  summary: string
  products: ProductCard[]
}

const replies = ref<ChatReply[]>([])

type Role = 'user' | 'assistant'
interface Message {
  role: Role
  content: string
}

const messages = ref<Message[]>([])
const input = ref('')
const loading = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const send = async () => {
  if (!input.value.trim()) return

  const userMessage = input.value
  messages.value.push({ role: 'user', content: userMessage })
  input.value = ''
  loading.value = true
  scrollToBottom()

  try {
    const resp = await axios.post('/api/chat', {
      message: userMessage,
      locale: locale.value, // Pass current locale to backend
    })
    replies.value.push({
      summary: resp.data.summary,
      products: resp.data.products,
    })
  } catch (e) {
    messages.value.push({
      role: 'assistant',
      content: locale.value === 'en' ? '服务暂时不可用' : 'Service currently unavailable.',
    })
  } finally {
    loading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
/* Container Layout */
.assistant-container {
  max-width: 900px;
  margin: 2rem auto;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 80vh; /* Fixed height relative to viewport */
  max-height: 800px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* Header */
.assistant-header {
  padding: 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  margin: 0;
  font-size: 1.25rem;
  color: #111827;
}

.subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Language Switcher */
.lang-switch select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: white;
  font-size: 0.875rem;
  cursor: pointer;
  outline: none;
}

/* Chat Window */
.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Empty State Placeholder */
.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #9ca3af;
}

.empty-state .icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  color: #374151;
  margin-bottom: 0.5rem;
}

/* Messages */
.message-row {
  display: flex;
  width: 100%;
}

.message-row.user {
  justify-content: flex-end;
}

.message-row.assistant {
  justify-content: flex-start;
}

.bubble {
  max-width: 75%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.5;
  word-wrap: break-word;
}

.user .bubble {
  background-color: #2563eb; /* Blue */
  color: white;
  border-bottom-right-radius: 2px;
}

.assistant .bubble {
  background-color: #f3f4f6; /* Gray */
  color: #1f2937;
  border-bottom-left-radius: 2px;
}

/* Loading Dots */
.loading-bubble {
  display: flex;
  gap: 4px;
  color: #6b7280;
  font-weight: bold;
}

/* Input Area */
.input-area {
  padding: 1rem 1.5rem;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
}

.input-group {
  display: flex;
  gap: 0.75rem;
}

input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #2563eb;
}

button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: #1d4ed8;
}

button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .assistant-container {
    height: 100vh;
    margin: 0;
    border-radius: 0;
  }
  .btn-text {
    display: none; /* Hide text on small screens, keep icon */
  }
}
</style>