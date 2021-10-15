import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Auth } from 'aws-amplify';

import { GRAPHQL_ROOT } from '@app/configs/environment';
import { getCurrentUser } from '@app/auth';

const httpLink = createHttpLink({
  uri: GRAPHQL_ROOT,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = await getCurrentUser();

  return {
    headers: {
      ...headers,
      Authorization: user ? `Bearer ${user.jwtToken}` : '',
    },
  };
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(async ({ message }) => {
      if (message.includes('Not Authorized!')) {
        await Auth.signOut();
        const loggedInUserVar = require('@configs/client-cache').loggedInUserVar;
        loggedInUserVar({});
        window.location.href = '/';
      }
      return console.log(`GraphQL Error: ${message}`);
    });
  }
  if (networkError) {
    console.log(`Network Error: ${networkError.message}`);
  }
});

const links = ApolloLink.from([errorLink, authLink, httpLink]);

export const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache({
    typePolicies: {
      Entity: {
        keyFields: ['id'],
      },
    },
  }),
});
