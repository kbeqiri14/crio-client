import { gql } from '@apollo/client';
import { meFragment, followingInfoFragment } from '../fragments';

export const me = gql`
  query {
    me {
      ...Me
    }
  }
  ${meFragment}
`;

export const getUser = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      ...Me
    }
  }
  ${meFragment}
`;

export const getFollowings = gql`
  query getFollowings($username: String) {
    getFollowings(username: $username) {
      ...FollowingInfoAttributes
    }
  }
  ${followingInfoFragment}
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

export const job = gql`
  query {
    job {
      subscribersCount
      creatorsFollowersCount {
        firstName
        lastName
        email
        stripe
        followersCount
      }
    }
  }
`;

export const getInvitations = gql`
  query {
    getInvitations {
      username
      emails {
        email
        accept
      }
    }
  }
`;

export const getUserInvitations = gql`
  query {
    getUserInvitations {
      email
      accept
    }
  }
`;

export const getProfileImages = gql`
  query {
    getProfileImages {
      userId
      image
    }
  }
`;
