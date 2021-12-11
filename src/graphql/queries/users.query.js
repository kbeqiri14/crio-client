import { gql } from '@apollo/client';

export const me_fragment = gql`
  fragment Me on UserInfo {
    id
    email
    userId
    fbUserId
    username
    firstName
    lastName
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
    fbUserId
    name
    email
    username
    firstName
    lastName
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
