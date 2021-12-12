import { gql } from '@apollo/client';

export const signIn = gql`
  mutation {
    saveUser
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
      visibility
    }
  }
`;

export const createFollowing = gql`
  mutation createFollowing($followingId: ID!) {
    createFollowing(followingId: $followingId)
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
