import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const ClienteBasicRoutes = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}/list`} exact />
    <Route path={`${url}/new`} exact />
    <Route path={`${url}/:cliente_id/edit`} exact />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

ClienteBasicRoutes.propTypes = { match: PropTypes.object.isRequired };

export default withRouter(ClienteBasicRoutes);
