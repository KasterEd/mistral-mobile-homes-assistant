export type LText = { zh:string; kz:string; ru:string }

export interface HomeSection {
  slug: 'gsjj' | 'dingzhi' | 'shehui' | 'hezuo'; // match keys in your about data
  label: LText;
  image: string;      // path to background image
}

export const homeSections: HomeSection[] = [
  {
    slug: 'gsjj',
    label: { zh:'公司简介', kz:'Компания профилі', ru:'Профиль компании' },
    image: '/images/home/1.png'
  },
  {
    slug: 'customized',
    label: { zh:'定制服务', kz:'Жекелеген қызметтер', ru:'Индивидуальные услуги' },
    image: '/images/home/2.png'
  },
  {
    slug: 'shezeren',
    label: { zh:'社会责任', kz:'Әлеуметтік жауапкершілік', ru:'Социальная ответственность' },
    image: '/images/home/3.png'
  },
  {
    slug: 'cooperation',
    label: { zh:'合作企业', kz:'Кооперативтік кәсіпорындар', ru:'Партнерские предприятия' },
    image: '/images/home/4.png'
  },
];
