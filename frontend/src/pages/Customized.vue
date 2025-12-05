<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-4 flex items-center gap-2">
      <RouterLink :to="localizedPath('/')" class="hover:text-blue-600">{{ L(TEXT.home) }}</RouterLink>
      <span>/</span>
      <span class="text-gray-700">{{ L(TEXT.customized) }}</span>
    </nav>

    <!-- Hero -->
    <header class="mb-8 text-center">
      <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900">
        {{ L(TEXT.customized) }}
      </h1>
      <p class="mt-2 text-gray-600">
        {{ L(TEXT.subtitle) }}
      </p>
    </header>

    <!-- Steps grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="(s, i) in steps"
        :key="s.key"
        class="rounded-lg border bg-white p-5"
      >
        <div class="text-xs text-gray-500 font-mono">{{ String(i+1).padStart(2,'0') }}/</div>
        <h3 class="mt-1 text-lg font-semibold text-gray-900">{{ L(s.title) }}</h3>
        <p class="mt-1 text-gray-600 text-sm leading-relaxed">{{ L(s.desc) }}</p>
      </article>
    </div>

    <!-- Call to action -->
    <div class="mt-10 rounded-lg border bg-white p-5">
      <h2 class="text-lg font-semibold text-gray-900 mb-2">{{ L(TEXT.contactTitle) }}</h2>
      <p class="text-sm text-gray-600 mb-4">{{ L(TEXT.contactLine) }}</p>

      <div class="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6">
        <!-- Form -->
        <form @submit.prevent="onSubmit" class="space-y-3">
          <div>
            <label class="block text-sm text-gray-700 mb-1">{{ L(TEXT.msgLabel) }}</label>
            <textarea
              v-model.trim="form.message"
              rows="4"
              class="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              :placeholder="L(TEXT.msgPh)"
              required
            ></textarea>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm text-gray-700 mb-1">{{ L(TEXT.phone) }}</label>
              <input
                v-model.trim="form.phone"
                type="tel"
                class="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                :placeholder="L(TEXT.phonePh)"
                required
              />
            </div>
            <div>
              <label class="block text-sm text-gray-700 mb-1">Email</label>
              <input
                v-model.trim="form.email"
                type="email"
                class="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                :placeholder="L(TEXT.emailPh)"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="inline-flex items-center gap-2 rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            {{ L(TEXT.submit) }}
          </button>
          <p v-if="submitted" class="text-green-700 text-sm mt-2">{{ L(TEXT.thanks) }}</p>
        </form>

        <!-- Contact block -->
        <aside class="rounded-lg border bg-gray-50 p-4 space-y-2 text-sm">
          <div class="font-medium text-gray-900">{{ L(TEXT.hotline) }}</div>
          <div>0991-5820888</div>
          <div class="text-gray-500">{{ L(TEXT.responseTip) }}</div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useL } from '@/composables/useL'
import { customizedSteps } from '@/data/customized'

type LText = { zh:string; kz:string; ru:string }
const route = useRoute()
const { locale } = useI18n({ useScope: 'global' })
const { L } = useL()

const TEXT = {
  home:        { zh:'首页', kz:'Басты бет', ru:'Главная' } as LText,
  customized:  { zh:'定制服务', kz:'Тапсырыстық қызмет', ru:'Индивидуальные решения' } as LText,
  subtitle:    { zh:'以满足客户需求为宗旨，以提供优质产品和服务为己任。', kz:'Тұтынушы қажеттілігі — мақсат, сапалы өнім мен сервис — міндет.', ru:'Ориентируемся на потребности клиента и качество продукции/сервиса.' } as LText,
  contactTitle:{ zh:'联系我们', kz:'Бізбен байланысыңыз', ru:'Свяжитесь с нами' } as LText,
  contactLine: { zh:'我们的工作人员将在工作日 24 小时内联系您。', kz:'Қызметкеріміз жұмыс күндері 24 сағат ішінде хабарласады.', ru:'Мы свяжемся с вами в течение 24 часов в рабочее время.' } as LText,
  hotline:     { zh:'服务热线', kz:'Қызмет телефоны', ru:'Горячая линия' } as LText,
  responseTip: { zh:'如需其他服务，欢迎拨打服务热线。', kz:'Қосымша қызметтер үшін қызмет телефонына қоңырау шалыңыз.', ru:'Для доп. услуг звоните на горячую линию.' } as LText,
  msgLabel:    { zh:'留言内容', kz:'Хабарлама мазмұны', ru:'Текст сообщения' } as LText,
  phone:       { zh:'手机', kz:'Телефон', ru:'Телефон' } as LText,
  submit:      { zh:'立即提交', kz:'Дереу жіберу', ru:'Отправить' } as LText,
  thanks:      { zh:'感谢您的留言，我们会尽快联系您。', kz:'Хабарыңызға рақмет! Жақын арада байланысамыз.', ru:'Спасибо! Мы скоро свяжемся с вами.' } as LText,
  msgPh:       { zh:'请描述您的需求或项目…', kz:'Сұранысыңызды/жобаңызды сипаттаңыз…', ru:'Опишите ваши требования или проект…' } as LText,
  phonePh:     { zh:'请输入您的手机号', kz:'Телефоныңызды енгізіңіз', ru:'Введите ваш телефон' } as LText,
  emailPh:     { zh:'请输入您的邮箱', kz:'Электрон поштаны енгізіңіз', ru:'Введите ваш email' } as LText,
} as const

const steps = customizedSteps

const form = reactive({ message:'', phone:'', email:'' })
const submitted = ref(false)
function onSubmit() {
  console.log('[customized] submit', { ...form, locale: locale.value })
  submitted.value = true
  setTimeout(() => (submitted.value = false), 4000)
  form.message = ''; form.phone = ''; form.email = ''
}

/** keep /zh|kz|ru prefix */
function localizedPath(target: string) {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) { const lang = m[1]; const clean = target.startsWith('/')?target:`/${target}`; return `/${lang}${clean==='/'?'':clean}` }
  return target
}
</script>
