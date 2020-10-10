import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layouts/Layout';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datetime/css/react-datetime.css';
import 'react-image-lightbox/style.css';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'

const store = ConfigureStore();

const App = () => { 
  return (
    <Provider store = {store} >
      <Router basename={process.env.PUBLIC_URL}>
        <Layout />
      </Router>
    </Provider>
  );
};

export default App;
