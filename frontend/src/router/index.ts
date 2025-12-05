// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Pages
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import TextPage from '@/pages/TextPage.vue'
import Products from '@/pages/Products.vue'            // (kept if you use it elsewhere)
import ProductsCategory from '@/pages/ProductsCategory.vue'
import ProductDetail from '@/pages/ProductDetail.vue'
import News from '@/pages/News.vue'
import Cases from '@/pages/Cases.vue'                  // (not used below; keeping import if referenced)
import FAQ from '@/pages/FAQ.vue'
import Contact from '@/pages/Contact.vue'
import Video from '@/pages/Video.vue'
import NotFound from '@/pages/NotFound.vue'

// i18n guard
import { installI18nGuard } from '@/router/localeGuards.ts'

// Helper to DRY the locale prefix
const LOCALE_PREFIX = '/:locale(zh|kz|ru)?'

const routes: RouteRecordRaw[] = [
  // Home
  {
    path: `${LOCALE_PREFIX}`,
    name: 'Home',
    component: Home,
  },

  // About (with section pages)
  {
    path: `${LOCALE_PREFIX}/about`,
    name: 'About',
    component: About,
    children: [
      {
        path: '',
        name: 'AboutDefault',
        redirect: (to) => ({
          path: `/${to.params.locale ?? ''}/about/gsjj`.replace('//', '/'),
        }),
      },
      {
        path: ':slug',
        component: TextPage,
        props: route => ({ section: route.params.slug, type: 'about' }),
      },
    ],
  },

  // Products
  // optional index page (kept your original redirect intent)
  {
    path: `${LOCALE_PREFIX}/products`,
    redirect: (to) => ({
      name: 'products',
      params: { locale: to.params.locale, category: 'folding-house' },
    }),
  },
  // category listing
  {
    path: `${LOCALE_PREFIX}/products/:category`,
    name: 'products',
    component: ProductsCategory,
    props: true,
  },
  // product detail
  {
    path: `${LOCALE_PREFIX}/products/:category/:slug`,
    name: 'product-detail',
    component: ProductDetail,
    props: true,
  },

  {
  path: `${LOCALE_PREFIX}/news`,
  // Parent layout for news (must contain <router-view/>)
  component: () => import('@/pages/News.vue'),
  children: [
    // /:locale?/news  ->  /:locale?/news/company
    {
      path: '',
      redirect: to => ({
        name: 'NewsList',
        params: { locale: to.params.locale, category: 'company' },
        query: to.query, // keep any filters/pagination if you add later
      }),
    },

    // List by category
    {
      path: ':category(company|industry)',
      name: 'NewsList',
      component: () => import('@/pages/news/NewsList.vue'),
      props: route => ({
        category: route.params.category,
        locale: route.params.locale,
      }),
      meta: { section: 'news' },
    },

    // Detail
    {
      path: ':category(company|industry)/:slug',
      name: 'NewsDetail',
      component: () => import('@/pages/news/NewsDetail.vue'),
      props: route => ({
        category: route.params.category,
        slug: route.params.slug,
        locale: route.params.locale,
      }),
      meta: { section: 'news' },
    },
  ],
},

  // Cooperation / Cases
  {
    path: `${LOCALE_PREFIX}/cooperation`,
    name: 'cooperation',
    component: () => import('@/pages/CooperationPage.vue'),
    props: (route) => ({ tab: (route.query.tab as string) ?? 'partners' }),
  },
  {
    path: `${LOCALE_PREFIX}/about/customized`,
    name: 'Customized',
    component: () => import('@/pages/Customized.vue'),
  },

  // Video
  {
    path: `${LOCALE_PREFIX}/video`,
    name: 'Video',
    component: Video,
  },

  // FAQ & Contact
  {
    path: `${LOCALE_PREFIX}/faq`,
    name: 'FAQ',
    component: FAQ,
  },
  {
    path: `${LOCALE_PREFIX}/contact`,
    name: 'Contact',
    component: Contact,
  },

  // Files (example redirect — fix path to your actual asset)
  {
    path: `${LOCALE_PREFIX}/files`,
    name: 'Files',
    children: [
      // Replace with the correct public path or serve via /public
      { path: 'brochure', redirect: '/assets/brochure.pdf' },
    ],
  },

  // 404 (locale-aware)
  {
    path: `${LOCALE_PREFIX}/:pathMatch(.*)*`,
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Sync i18n.locale <-> URL (/zh|kz|ru) and normalize missing prefixes
installI18nGuard(router)

export default router
