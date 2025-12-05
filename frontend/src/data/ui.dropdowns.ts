// src/data/ui.dropdowns.ts
import type { LText } from '@/types/localized'

export interface DropLink {
  to: string
  title: LText
  desc?: LText
  img?: string
}

/* ABOUT */
export const aboutDropdownHeader = {
  title: { zh:'关于我们', kz:'Біз туралы', ru:'О нас' },
  desc:  { zh:'了解公司的简介、资质与社会责任等信息。',
           kz:'Компания туралы, біліктілік және әлеуметтік жауапкершілік.',
           ru:'О компании, сертификатах и социальной ответственности.' },
}
export const aboutDropdown: DropLink[] = [
  { to: '/about/gsjj',          title: { zh:'公司简介', kz:'Компания туралы', ru:'О компании' } },
  { to: '/about/qywh',          title: { zh:'企业文化', kz:'Мәдениет', ru:'Корп. культура' } },
  { to: '/about/qyzizhi',       title: { zh:'企业资质', kz:'Біліктілік', ru:'Сертификаты' } },
  { to: '/about/shezeren',      title: { zh:'社会责任', kz:'Әлеум. жауапкерш.', ru:'Соц. ответственность' } },
  { to: '/about/shfw',          title: { zh:'售后服务', kz:'Кепілдік қызмет', ru:'Сервис' } },
  { to: '/about/ziliao-xiazai', title: { zh:'资料下载', kz:'Материалдар', ru:'Файлы' } },
]

/* PRODUCTS */
export const productDropdownHeader = {
  title: { zh:'产品中心', kz:'Өнімдер', ru:'Продукция' },
  desc:  { zh:'主营产品涵盖折叠房、一体房等，满足多场景搭建需求。',
           kz:'Негізгі өнімдер: жиналмалы үй, бір/екі қабатты модульдер.',
           ru:'Основные продукты: складные и модульные дома для разных задач.' },
}
export const productDropdown: DropLink[] = [
  { to: '/products/folding-house', title: { zh:'应急折叠房', kz:'Жиналмалы үй', ru:'Складной дом' } },
  { to: '/products?cat=single-floor',  title: { zh:'单层一体房', kz:'Бір қабатты модуль', ru:'Одноэтажный модуль' } },
  { to: '/products?cat=double-floor',  title: { zh:'二层一体房', kz:'Екі қабатты модуль', ru:'Двухэтажный модуль' } },
]

/* NEWS */
export const newsDropdownHeader = {
  title: { zh:'新闻中心', kz:'Жаңалықтар', ru:'Новости' },
  desc:  { zh:'最新动态与媒体报道，了解企业进展与行业趋势。',
           kz:'Соңғы жаңалықтар және БАҚ материалдары.',
           ru:'Последние новости и публикации в прессе.' },
}
export const newsDropdown: DropLink[] = [
  { to: '/news',           title: { zh:'最新动态', kz:'Соңғы жаңалықтар', ru:'Последние новости' } },
  { to: '/news?cat=media', title: { zh:'媒体报道', kz:'БАҚ', ru:'Пресса' } },
]

/* COOPERATION / CASES */
export const cooperationDropdownHeader = {
  title: { zh:'合作案例', kz:'Кейстер', ru:'Кейсы' },
  desc:  { zh:'真实落地项目案例展示工程能力与交付质量。',
           kz:'Жобалар арқылы тәжірибе мен сапаны көрсетеміз.',
           ru:'Реальные проекты демонстрируют опыт и качество.' },
}
export const cooperationDropdown: DropLink[] = [
  { to: '/cases', title: { zh:'项目案例', kz:'Жобалар', ru:'Проекты' } },
]
