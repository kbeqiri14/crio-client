import { gql } from '@apollo/client';

export const signIn = gql`
  mutation saveUser($attributes: UserAttributes!) {
    saveUser(attributes: $attributes) {
      id
      userId
      email
      username
      firstName
      lastName
    }
  }
`;
