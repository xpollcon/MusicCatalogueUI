import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT || '';
const apiKey = import.meta.env.VITE_API_KEY || '';

console.log('AppSync Endpoint:', endpoint);
console.log('API Key present:', !!apiKey);

export const client = new ApolloClient({
  link: new HttpLink({
    uri: endpoint,
    headers: {
      'x-api-key': apiKey,
    },
  }),
  cache: new InMemoryCache(),
});
