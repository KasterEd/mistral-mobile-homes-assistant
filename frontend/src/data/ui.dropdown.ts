// src/data/ui.dropdowns.ts
import type { LText } from '@/types/localized'

export interface DropLink {
  to: string
  title: LText
  desc?: LText
  img?: string
}

export const aboutDropdown: DropLink[] = [
  { to: '/about/gsjj',     title: { zh:'公司简介', kz:'Компания туралы', ru:'О компании' } },
  { to: '/about/qywh',     title: { zh:'企业文化', kz:'Мәдениет', ru:'Корп. культура' } },
  { to: '/about/qyzizhi',  title: { zh:'企业资质', kz:'Біліктілік', ru:'Сертификаты' } },
  { to: '/about/shezeren', title: { zh:'社会责任', kz:'Әлеум. жауапкерш.', ru:'Соц. ответственность' } },
  { to: '/about/shfw',     title: { zh:'售后服务', kz:'Кепілдік қызмет', ru:'Сервис' } },
  { to: '/about/ziliao-xiazai', title: { zh:'资料下载', kz:'Материалдар', ru:'Файлы' } },
]

export const productDropdown: DropLink[] = [
  { to: '/products?cat=folding-house', title: { zh:'应急折叠房', kz:'Жиналмалы үй', ru:'Складной дом' } },
  { to: '/products?cat=single-floor',  title: { zh:'单层一体房', kz:'Бір қабатты', ru:'Одноэтажный' } },
  { to: '/products?cat=double-floor',  title: { zh:'二层一体房', kz:'Екі қабатты', ru:'Двухэтажный' } },
]

export const newsDropdown: DropLink[] = [
  { to: '/news',            title: { zh:'最新动态', kz:'Соңғы жаңалықтар', ru:'Последние новости' } },
  { to: '/news?cat=media',  title: { zh:'媒体报道', kz:'БАҚ', ru:'Пресса' } },
]

export const cooperationDropdown: DropLink[] = [
  { to: '/cases', title: { zh:'项目案例', kz:'Жобалар', ru:'Проекты' } },
]
