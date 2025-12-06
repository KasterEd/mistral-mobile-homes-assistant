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
  { key: 'contact',  to: '/contact', label: { zh:'联系我们', kz:'Байланыс', ru:'Контакты' } },
  { key: 'assistant', to: '/assistant', label: {zh:"Mistral.AI Assistant",kz:"Mistral.AI Assistant", ru:"Mistral.AI Assistant"}}
];
