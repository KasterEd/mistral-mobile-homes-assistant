// =============================================
// src/data/catalog.ts
// =============================================
export interface LocalizedText { zh: string; kz: string; ru: string }

export interface Category {
  id: string
  slug: string
  name: LocalizedText
  description?: LocalizedText
}

export interface Product {
  id: string
  slug: string
  category: string // category.slug
  title: LocalizedText
  cover: string
  excerpt?: LocalizedText
  gallery?: string[]
  specs?: Record<string, LocalizedText>
}

export const categories: Category[] = [
  {
    id: 'double-floor',
    slug: 'double-floor',
    name: {
      zh: '二层活动房',
      kz: 'Екі қабатты үйлер',
      ru: 'Двухэтажные модули'
    },
    description: {
      zh: '产品展示',
      kz: 'Өнімдер көрмесі',
      ru: 'Витрина продукции'
    }
  },
  {
    id: 'folding-house',
    slug: 'folding-house',
    name: {
      zh: '折叠活动板房',
      kz: 'Жиналмалы үйлер',
      ru: 'Складные дома'
    },
    description: { zh: '产品展示', kz: 'Өнімдер көрмесі', ru: 'Витрина продукции' }
  },
  {
    id: 'assembly-room',
    slug: 'assembly-room',
    name: {
      zh: '折叠式拼间',
      kz: 'Құрастырмалы бөлмелер',
      ru: 'Сборные комнаты'
    },
    description: { zh: '产品展示', kz: 'Өнімдер көрмесі', ru: 'Витрина продукции' }
  },
  {
    id: 'packing-box',
    slug: 'packing-box',
    name: {
      zh: '打包箱',
      kz: 'Қаптама контейнерлері',
      ru: 'Блок‑контейнеры'
    },
    description: { zh: '产品展示', kz: 'Өнімдер көрмесі', ru: 'Витрина продукции' }
  },
  {
    id: 'container',
    slug: 'container',
    name: {
      zh: '货柜集装箱',
      kz: 'Жүк контейнерлері',
      ru: 'Контейнеры'
    },
    description: { zh: '产品展示', kz: 'Өнімдер көрмесі', ru: 'Витрина продукции' }
  },
  {
    id: 'equipment-box',
    slug: 'equipment-box',
    name: {
      zh: '设备箱',
      kz: 'Жабдық қораптары',
      ru: 'Оборудовательные боксы'
    },
    description: { zh: '产品展示', kz: 'Өнімдер көрмесі', ru: 'Витрина продукции' }
  },
  {
    id: 'other-products',
    slug: 'other-products',
    name: {
      zh: '其他产品',
      kz: 'Басқа өнімдер',
      ru: 'Прочая продукция'
    },
    description: { zh: '产品展示', kz: 'Өнімдер көрмесі', ru: 'Витрина продукции' }
  },
  {
    id: 'tile-house',
    slug: 'tile-house',
    name: {
      zh: '瓦楞板房',
      kz: 'Профлист үйлері',
      ru: 'Дома из профнастила'
    },
    description: { zh: '产品展示', kz: 'Өнімдер көрмесі', ru: 'Витрина продукции' }
  },
  {
    id: 'expandable',
    slug: 'expandable',
    name: {
      zh: '双翼扩展箱',
      kz: 'Екі қақпақты кеңейтілетін модуль',
      ru: 'Расширяемые модули'
    },
    description: { zh: '产品展示', kz: 'Өнімдер көрмесі', ru: 'Витрина продукции' }
  }
]

// NOTE: Place your real images into /src/assets/products/* and replace the placeholders below.
export const products: Product[] = [
  {
    id: 'df-001',
    slug: 'double-floor-01',
    category: 'double-floor',
    title: {
      zh: '折叠式活动板房二层',
      kz: 'Екі қабатты жиналмалы модуль',
      ru: 'Двухэтажный складной модуль'
    },
    cover: '/images/products/double-floor/df-01.jpg',
    excerpt: {
      zh: '新型开发双层折叠箱式房屋，安装便捷。',
      kz: 'Жаңа екі қабатты жиналмалы модуль, орнатуы жеңіл.',
      ru: 'Новый двухэтажный складной модуль, быстрая установка.'
    },
    gallery: [
      '/images/products/double-floor/df-01.jpg',
      '/images/products/double-floor/df-01b.jpg'
    ]
  },
  {
    id: 'df-002',
    slug: 'double-floor-02',
    category: 'double-floor',
    title: {
      zh: '折叠式活动板房二层',
      kz: 'Екі қабатты жиналмалы модуль',
      ru: 'Двухэтажный складной модуль'
    },
    cover: '/images/products/double-floor/df-02.jpg'
  },
  {
    id: 'fold-001',
    slug: 'folding-01',
    category: 'folding-house',
    title: {
      zh: '折叠活动板房',
      kz: 'Жиналмалы үй',
      ru: 'Складной дом'
    },
    cover: '/images/products/folding/f-01.jpg'
  },
  {
    id: 'pack-001',
    slug: 'packing-01',
    category: 'packing-box',
    title: {
      zh: '打包箱',
      kz: 'Қаптама контейнері',
      ru: 'Блок‑контейнер'
    },
    cover: '/images/products/packing/p-01.jpg'
  },
  {
    id: 'equip-001',
    slug: 'equipment-01',
    category: 'equipment-box',
    title: {
      zh: '设备箱',
      kz: 'Жабдық қорабы',
      ru: 'Оборудовательный бокс'
    },
    cover: '/images/products/equipment/e-01.jpg'
  },
  {
    id: 'container-001',
    slug: 'container-01',
    category: 'container',
    title: {
      zh: '货柜集装箱',
      kz: 'Жүк контейнері',
      ru: 'Контейнер'
    },
    cover: '/images/products/container/c-01.jpg'
  },
  {
    id: 'expand-001',
    slug: 'expandable-01',
    category: 'expandable',
    title: {
      zh: '双翼扩展箱',
      kz: 'Екі қақпақты кеңейтілетін модуль',
      ru: 'Расширяемый модуль'
    },
    cover: '/images/products/expandable/x-01.jpg',
    excerpt: {
      zh: '可扩展模块化箱体，运输便捷，展开即用。',
      kz: 'Кеңейтілетін модульдік блок: тасымалдау ыңғайлы, жылдам іске қосу.',
      ru: 'Расширяемый модуль: удобная транспортировка, быстрый ввод в работу.'
    },
    gallery: [
      '/images/products/expandable/x-01.jpg',
      '/images/products/expandable/x-02.jpg',
      '/images/products/expandable/x-03.jpg'
    ]
  }
]

export function getProductsByCategory(slug: string) {
  return products.filter(p => p.category === slug)
}
