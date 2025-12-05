// =============================================
// src/i18n/products.ts
// =============================================

// Chinese
export const zh = {
  products: {
    title: '产品展示',
    breadcrumb: { home: '首页', products: '产品中心' },
    specs: '参数',
    prev: '上一页',
    next: '下一页',
    page: '页',
    empty: '暂无产品',
  },
}

export const kz = {
  products: {
    title: 'Өнімдер көрмесі',
    breadcrumb: { home: 'Басты бет', products: 'Өнімдер орталығы' },
    specs: 'Сипаттамалар',
    prev: 'Алдыңғы',
    next: 'Келесі',
    page: 'Бет',
    empty: 'Әзірге өнім жоқ',
  },
}
export const ru = {
  products: {
    title: 'Витрина товаров',
    breadcrumb: { home: 'Главная', products: 'Центр продукции' },
    specs: 'Характеристики',
    prev: 'Назад',
    next: 'Вперед',
    page: 'Стр.',
    empty: 'Пока нет товаров',
  },
}
// Combined for easy import into i18n
export const productMessages = {
  zh,
  kz,
  ru,
}
