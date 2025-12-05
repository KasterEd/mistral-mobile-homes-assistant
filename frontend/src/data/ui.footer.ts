// src/data/ui.footer.ts
import type { LText } from '@/types/localized'

export const FOOTER = {
  brand: {
    name: { zh:'SinoMod', kz:'SinoMod', ru:'SinoMod' } as LText,
    blurb: {
      zh:'模块化建筑与临建一体化方案提供商。',
      kz:'Модульді құрылыс пен уақытша нысандарға кешенді шешімдер.',
      ru:'Комплексные решения для модульного и временного строительства.',
    } as LText,
    copyrightPrefix: {
      zh: '版权所有 ©',
      kz: 'Барлық құқықтар қорғалған ©',
      ru: 'Все права защищены ©',
    } as LText,
  },

  cols: {
    about: {
      title: { zh:'关于我们', kz:'Біз туралы', ru:'О нас' } as LText,
      links: [
        { to:'/about/gsjj',     label:{ zh:'公司简介', kz:'Компания туралы', ru:'О компании' } as LText },
        { to:'/about/qywh',  label:{ zh:'企业文化', kz:'Корпоративтік мәдениет', ru:'Корпоративная культура' } as LText },
        { to:'/about/shfw',  label:{ zh:'服务与保障', kz:'Қызмет пен кепілдік', ru:'Сервис и гарантия' } as LText },
      ],
    },
    products: {
      title: { zh:'产品中心', kz:'Өнімдер', ru:'Продукция' } as LText,
      links: [
        { to:'/products/folding-house',          label:{ zh:'折叠式活动房', kz:'Жиналмалы үй', ru:'Складной модульный дом' } as LText },
        { to:'/products/assembled-container',    label:{ zh:'装配式集装箱', kz:'Жиналмалы контейнер', ru:'Сборный контейнер' } as LText },
        { to:'/products/dual-extension-box',     label:{ zh:'双翼扩展箱',   kz:'Қос қанатты кеңейтілетін қорап', ru:'Контейнер с двойным расширением' } as LText },
      ],
      more: { to:'/products/folding-house', label:{ zh:'查看全部', kz:'Барлығын көру', ru:'Смотреть все' } as LText },
    },
    support: {
      title: { zh:'支持', kz:'Қолдау', ru:'Поддержка' } as LText,
      links: [
        { to:'/faq',           label:{ zh:'常见问题', kz:'ЖҚС', ru:'Вопросы и ответы' } as LText },
        { to:'/cooperation',   label:{ zh:'合作案例', kz:'Ынтымақтастық үлгілері', ru:'Примеры сотрудничества' } as LText },
        { to:'/video',         label:{ zh:'视频展示', kz:'Бейне көрме', ru:'Видео' } as LText },
      ],
    },
    contact: {
      title: { zh:'联系我们', kz:'Байланыс', ru:'Контакты' } as LText,
      addressTitle: { zh:'地址', kz:'Мекенжай', ru:'Адрес' } as LText,
      address: {
        zh:'阿拉木图市卡拉塔耶夫街 15 号 / 基尔皮奇诺扎沃德斯卡亚第五街 15 号',
        kz:'Алматы қаласы, Қаратаев көшесі, 15 / 5-ші Кирпичнозаводская көше, 15',
        ru:'г. Алматы, улица Каратаева, 15/5-я Кирпичнозаводская улица, 15'
      } as LText,
      phoneTitle: { zh:'电话', kz:'Телефон', ru:'Телефон' } as LText,
      phone: '+7 (777) 168-60-67 (ZH), +7 (747) 866-48-20 (KZ/RU/EN)',
      emailTitle: { zh:'邮箱', kz:'Email', ru:'Email' } as LText,
      email: 'info@sinomodx.com',
    },
  },

  bottom: {
    links: [
      { to:'/privacy', label:{ zh:'隐私政策', kz:'Құпиялылық саясаты', ru:'Политика конфиденциальности' } as LText },
      { to:'/terms',   label:{ zh:'使用条款', kz:'Пайдалану шарттары',  ru:'Условия использования' } as LText },
    ],
  },
} as const
