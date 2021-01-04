import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layouts/Layout';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datetime/css/react-datetime.css';
import 'react-image-lightbox/style.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Provider } from 'react-redux';
import store from './redux/store';

// const store = ConfigureStore();
const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <Layout />
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
