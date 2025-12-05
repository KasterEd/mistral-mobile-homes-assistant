// src/data/partners.ts
export type LText = { zh: string; kz: string; ru: string }

export interface Partner {
  name: LText
  logo: string
  url?: string
  blurb?: LText
}

export const partners: Partner[] = [
  {
    name: { zh:'中建某局', kz:'China State Construction (мысал)', ru:'China State Construction (пример)' },
    logo: '/images/partners/cscec.png',
    url: '#',
    blurb: {
      zh:'在多地基础设施项目中采用模块化宿舍与办公解决方案。',
      kz:'Бірқатар инфрақұрылым жобаларында модульді жатақхана және офис шешімдері қолданылды.',
      ru:'В ряде инфраструктурных проектов применены модульные общежития и офисы.',
    },
  },
  {
    name: { zh:'能源集团', kz:'Энергетикалық топ', ru:'Энергетический холдинг' },
    logo: '/images/partners/energy.png',
    url: '#',
    blurb: {
      zh:'为风电、光伏站点配套设备箱与值守用房。',
      kz:'Жел/КҚС нысандарына жабдық қораптары және кезекші модульдер.',
      ru:'Оборудование и дежурные модули для ВИЭ-площадок.',
    },
  },
  {
    name: { zh:'文旅投资', kz:'Туризм инвестициялар', ru:'Туристические инвестиции' },
    logo: '/images/partners/tourism.png',
    url: '#',
    blurb: {
      zh:'营地客房、接待及服务中心一体化交付。',
      kz:'Кемп нөмірлері мен қабылдау/сервис орталығы — кешенді жеткізу.',
      ru:'Комплексная поставка номеров кемпа и приёмно-сервисного центра.',
    },
  },
]
