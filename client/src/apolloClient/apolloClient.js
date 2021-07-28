import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://api.yelp.com/v3/graphql", // Server URL (must be absolute)
    credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    headers: {
      authorization: `Bearer A0ah63177b0XswTXkJq9S80S1Wg6_IKY0HRsBhCnWZ2Qi-Rn3QHLoyn45_9w5r0Eq9BcynO4X1h2MLkmJNgN5TpxiVyL1hOUuSXftR8fhkL1QuvVefNtGmDFuGH_YHYx`,
    },
  }),
});

export default client;
