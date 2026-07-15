import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/home',
    iconComponent: { name: 'cil-home' }
  },
  {
    title: true,
    name: 'Cadastros'
  },
  {
    name: 'Pessoas',
    url: '/persons',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Cartões',
    url: '/cards',
    iconComponent: { name: 'cil-credit-card' }
  },
  {
    name: 'Categorias',
    url: '/categories',
    iconComponent: { name: 'cil-tag' }
  },
  {
    name: 'Relatórios',
    url: '/reports',
    iconComponent: { name: 'cil-chart-pie' }
  }
];
