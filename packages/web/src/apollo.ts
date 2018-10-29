import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// import { onError } from 'apollo-link-error';
// import { ApolloLink } from 'apollo-link';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_SERVE_URL,
    credentials: 'include'
  }),
  cache: new InMemoryCache()
});

