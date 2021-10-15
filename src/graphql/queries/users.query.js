import { gql } from '@apollo/client';

export const me_fragment = gql`
  fragment Me on UserInfo {
    email
    username
    firstName
    lastName
    creator
  }
`;

export const me = gql`
  query {
    me {
      ...Me
    }
  }
  ${me_fragment}
`;
