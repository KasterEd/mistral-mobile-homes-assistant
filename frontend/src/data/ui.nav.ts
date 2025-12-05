import type { LText } from '@/types/localized';

export interface NavItem {
  key: string;
  to: string;
  label: LText;
  hasDropdown?: boolean;
}

export const navItems: NavItem[] = [
  { key: 'home',     to: '/',            label: { zh:'首页',   kz:'Басты бет',      ru:'Главная' } },
  { key: 'products', to: '/products',    label: { zh:'产品中心', kz:'Өнімдер',       ru:'Продукция' }, hasDropdown: true },
  { key: 'news',     to: '/news',        label: { zh:'新闻中心', kz:'Жаңалықтар',    ru:'Новости' },   hasDropdown: true },
  { key: 'cases',    to: '/cooperation', label: { zh:'合作案例', kz:'Кейстер',       ru:'Кейсы' },     hasDropdown: true },
  { key: 'about',    to: '/about/gsjj',  label: { zh:'关于我们', kz:'Біз туралы',    ru:'О нас' },     hasDropdown: true },
  { key: 'videos',   to: '/video',       label: { zh:'视频演示', kz:'Видео',         ru:'Видео' } },
  { key: 'contact',  to: '/contact', label: { zh:'联系我们', kz:'Байланыс', ru:'Контакты' } },
];
