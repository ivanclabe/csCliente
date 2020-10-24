// import { version } from './config';

export const homeRoutes = {
  name: 'Home',
  to: '/',
  exact: true,
  icon: 'chart-pie',
  children: [
    {
      to: '/',
      name: 'Dashboard',
      exact: true
    },
    { to: '/dashboard-alt', name: 'Dashboard alt' },
    { to: '/feed', name: 'Feed', exact: true },
    { to: '/landing', name: 'Landing' }
  ]
};

export const authenticationRoutes = {
  name: 'Authentication',
  to: '/authentication',
  icon: 'lock',
  children: [
    { to: '/authentication/login', name: 'Login' },
    { to: '/authentication/logout', name: 'Logout' },
    { to: '/authentication/register', name: 'Register' },
    { to: '/authentication/forget-password', name: 'Forgot password' },
    { to: '/authentication/password-reset', name: 'Reset password' },
    { to: '/authentication/confirm-mail', name: 'Confirm mail' },
    { to: '/authentication/lock-screen', name: 'Lock screen' }
  ]
};

export const generalesRoute = {
  name: 'Generales',
  to: '/generales',
  icon: 'plug',
  children: [{ to: '/generales/usuarios', name: 'Usuario' }]
};

export const inventarioRoute = {
  name: 'Inventario',
  to: '/inventario',
  icon: 'puzzle-piece',
  children: [
    { to: '/inventario/items', name: 'Item' },
    { to: '/inventario/items-grupo', name: 'ItemsGrupo' },
    { to: '/inventario/marca', name: 'Marca' },
    { to: '/inventario/fabricante', name: 'Fabricante' }
  ]
};

export const terceroRoute = {
  name: 'Terceros',
  to: '/terceros',
  icon: ['fab', 'trello'],
  children: [
    { to: '/clientes/list', name: 'Cliente' },
    { to: '/proveedores/list', name: 'Proveedores' }
  ]
};

export const facturacionRoute = {
  name: 'Facturacion',
  to: '/facturacion',
  icon: 'poll',
  children: [
    { to: '/facturacion/factura', name: 'Factura' },
    { to: '/facturacion/contrato', name: 'Contrato' },
    { to: '/facturacion/tarifa', name: 'Tarifa' }
  ]
};

export default [
  homeRoutes,
  authenticationRoutes,
  generalesRoute,
  inventarioRoute,
  terceroRoute,
  facturacionRoute
];
