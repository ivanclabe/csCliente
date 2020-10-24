import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';

import DashboardLayout from './DashboardLayout';
import ErrorLayout from './ErrorLayout';

import loadable from '@loadable/component';

const AuthBasicLayout = loadable(() => import('./AuthBasicLayout'));
const Landing = loadable(() => import('../components/landing/Landing'));

const Layout = props => {
  useEffect(() => {
    AuthBasicLayout.preload();
    Landing.preload();
  }, []);

  return (
    <Router fallback={<span />}>
      <Switch>
        <Route path="/landing" exact component={Landing} />
        <Route path="/authentication" component={AuthBasicLayout} />
        <Route path="/errors" component={ErrorLayout} />
        <Route component={DashboardLayout} />
      </Switch>
      <ToastContainer
        transition={Fade}
        closeButton={<CloseButton />}
        position={toast.POSITION.BOTTOM_LEFT}
      />
    </Router>
  );
};

export default withRouter(Layout);
