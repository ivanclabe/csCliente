import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import ProveedoresList from './ProveedoresList';

const ProveedorBasicRoutes = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}/list`} exact component={ProveedoresList} />
    <Route path={`${url}/new`} exact />
    <Route path={`${url}/:proveedorId/edit`} exact />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

ProveedorBasicRoutes.propTypes = { match: PropTypes.object.isRequired };

export default withRouter(ProveedorBasicRoutes);
