import { gql } from '@apollo/client';

export const me_fragment = gql`
  fragment Me on UserInfo {
    id
    email
    userId
    providerType
    providerUserId
    username
    firstName
    lastName
    avatar
    about
    isCreator
    payment {
      customerEmail
      periodStart
      periodEnd
      subscriptionStatus
      lastEventSnapshot
      subscriptionCancel
    }
    artworksCount
    followersCount
    followingsCount
    isFollowing
    followings
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

export const getUser = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      ...Me
    }
  }
  ${me_fragment}
`;

export const following_info_fragment = gql`
  fragment FollowingInfoAttributes on FollowingInfo {
    id
    userId
    providerType
    providerUserId
    name
    email
    username
    firstName
    lastName
    avatar
    artworks {
      artworkId
      videoUri
      thumbnailUri
      title
      description
    }
  }
`;

export const getFollowings = gql`
  query getFollowings($username: String) {
    getFollowings(username: $username) {
      ...FollowingInfoAttributes
    }
  }
  ${following_info_fragment}
`;

export const isFollowing = gql`
  query isFollowing($followingUsername: String!) {
    isFollowing(followingUsername: $followingUsername)
  }
`;

export const isSubscriber = gql`
  query isSubscriber($subscriberId: ID!) {
    isSubscriber(subscriberId: $subscriberId)
  }
`;
