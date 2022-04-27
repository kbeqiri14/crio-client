import { gql } from '@apollo/client';

export const signIn = gql`
  mutation {
    saveUser {
      error
    }
  }
`;

export const contactCreator = gql`
  mutation contactCreator($mailInfo: MailInfo!) {
    contactCreator(mailInfo: $mailInfo)
  }
`;

export const updateUser = gql`
  mutation updateUser($attributes: UserAttributes!) {
    updateUser(attributes: $attributes) {
      id
      userId
      providerType
      email
      username
      firstName
      lastName
      about
    }
  }
`;

export const createFollowing = gql`
  mutation createFollowing($followingUsername: String!) {
    createFollowing(followingUsername: $followingUsername)
  }
`;

export const createSubscriber = gql`
  mutation createSubscriber($subscriberId: ID!) {
    createSubscriber(subscriberId: $subscriberId)
  }
`;

export const cancelSubscription = gql`
  mutation {
    cancelSubscription
  }
`;
