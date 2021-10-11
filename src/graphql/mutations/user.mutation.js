import { gql } from '@apollo/client';

export const signIn = gql`
  mutation {
    saveUser {
      id
      userId
      email
      username
      firstName
      lastName
      creator
    }
  }
`;
