// src/data/videos.ts
export type Ltext = { zh: string; kz: string; ru: string }

export interface VideoItem {
  slug: string
  title: Ltext
  // thumb: string   // thumbnail image
  duration: string
  url: string     // local mp4 path or YouTube
}

export const videos: VideoItem[] = [
  {
    slug: 'factory-tour',
    title: { zh:'陕西厂房', kz:'Зауыт туры', ru:'Экскурсия по заводу' },
    // thumb: new URL('/images/video/thumb-factory.jpg', import.meta.url).href,
    duration: '00:00:17',
    url: new URL('/images/video/factory.mp4', import.meta.url).href
  },
  {
    slug: 'production',
    title: { zh:'陕西生产', kz:'Өндіріс', ru:'Производство' },
    // thumb: new URL('/images/video/thumb-production.jpg', import.meta.url).href,
    duration: '00:00:20',
    url: new URL('/images/video/production.mp4', import.meta.url).href
  },
  {
    slug: 'new-plant',
    title: { zh:'新园厂', kz:'Жаңа зауыт', ru:'Новый завод' },
    // thumb: new URL('/images/video/thumb-newplant.jpg', import.meta.url).href,
    duration: '00:00:25',
    url: new URL('/images/video/newplant.mp4', import.meta.url).href
  },
  // {
  //   slug: 'product-special',
  //   title: { zh:'产品集萃', kz:'Өнімдер топтамасы', ru:'Подборка продуктов' },
  //   // thumb: new URL('/images/video/thumb-products.jpg', import.meta.url).href,
  //   duration: '00:00:30',
  //   url: new URL('/images/video/products.mp4', import.meta.url).href
  // },
]
