import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';

import { ApolloProvider } from '@apollo/react-hooks';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import App from './App';
import Main from './Main';
import './helpers/initFA';

// const client = new ApolloClient({
//   uri: 'http://localhost:3000/api/graphql'
// });

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'http://localhost:3000/api/graphql'
    })
  ]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Main>
      <App />
    </Main>
  </ApolloProvider>,
  document.getElementById('main')
);
