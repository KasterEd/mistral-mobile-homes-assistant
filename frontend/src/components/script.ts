// inside your component/script setup
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const route = useRoute()

const form = ref({ name: '', email: '', message: '', company: '' })
const submitted = ref(false)
const sending = ref(false)
const errorMsg = ref<string | null>(null)

async function onSubmit() {
  sending.value = true
  errorMsg.value = null
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        locale: locale.value,
        page: route.fullPath,
        ua: navigator.userAgent,
        ts: new Date().toISOString(),
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `Request failed: ${res.status}`)
    }

    submitted.value = true
    setTimeout(() => (submitted.value = false), 4000)

    // clear form
    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
    form.value.company = ''
  } catch (err: any) {
    errorMsg.value = err?.message || 'Send failed'
  } finally {
    sending.value = false
  }
}
