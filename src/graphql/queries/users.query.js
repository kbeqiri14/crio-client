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
    visibility
    isCreator
    vouchers {
      tier1
      tier2
      tier3
    }
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
  query getUser($id: ID!) {
    getUser(id: $id) {
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
    visibility
    artworks {
      videoUri
      thumbnailUri
      title
      description
    }
  }
`;

export const getFollowings = gql`
  query {
    getFollowings {
      ...FollowingInfoAttributes
    }
  }
  ${following_info_fragment}
`;

export const getFollowersCount = gql`
  query {
    getFollowersCount
  }
`;

export const isFollowing = gql`
  query isFollowing($followingId: ID!) {
    isFollowing(followingId: $followingId)
  }
`;

export const isSubscriber = gql`
  query isSubscriber($subscriberId: ID!) {
    isSubscriber(subscriberId: $subscriberId)
  }
`;
