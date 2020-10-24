import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProveedorBasicRoutes from '../components/sic/proveedor/ProveedorBasicRoutes';
import ClienteBasicRoutes from '../components/sic/cliente/ClienteBasicRoutes';
import ItemBasicRoutes from '../components/sic/item/ItemBasicRoutes';

const DashboardRoutes = () => (
  <Switch>
    <Route path="/proveedores" component={ProveedorBasicRoutes} />
    <Route path="/clientes" component={ClienteBasicRoutes} />
    <Route path="/items" component={ItemBasicRoutes} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

export default DashboardRoutes;
