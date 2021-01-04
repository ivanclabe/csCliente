import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Main from './Main';
import './helpers/initFA';

// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
// import { onError } from 'apollo-link-error';
// import { ApolloLink } from 'apollo-link';

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors)
//         graphQLErrors.forEach(({ message, locations, path }) =>
//           console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
//         );
//       if (networkError) console.log(`[Network error]: ${networkError}`);
//     }),
//     new HttpLink({
//       uri: 'http://localhost:3000/api/graphql'
//     })
//   ]),
//   cache: new InMemoryCache()
// });

ReactDOM.render(
  <Main>
    <App />
  </Main>,
  document.getElementById('main')
);
