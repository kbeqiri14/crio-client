import { gql } from '@apollo/client';

export const signIn = gql`
  mutation {
    saveUser {
      id
      userId
      fbUserId
      email
      username
      firstName
      lastName
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($attributes: UserAttributes!) {
    updateUser(attributes: $attributes) {
      id
      userId
      email
      username
      firstName
      lastName
    }
  }
`;
