import { gql } from '@apollo/client';

export const signIn = gql`
  mutation {
    saveUser {
      error
      userId
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

export const sendInvitation = gql`
  mutation sendInvitation($emails: [String!]!) {
    sendInvitation(emails: $emails)
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

export const acceptInvitation = gql`
  mutation acceptInvitation($email: String!) {
    acceptInvitation(email: $email)
  }
`;

export const createTransfers = gql`
  mutation {
    createTransfers
  }
`;

export const updateUserImage = gql`
  mutation updateUserImage($userId: ID!, $image: String!) {
    updateUserImage(userId: $userId, image: $image)
  }
`;
