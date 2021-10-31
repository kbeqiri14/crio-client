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

export const getCreatorUsers = gql`
  query {
    getCreatorUsers {
      ...Me
    }
  }
  ${me_fragment}
`;

export const getFollowings = gql`
  query {
    getFollowings {
      ...Me
    }
  }
  ${me_fragment}
`;

export const isFollowing = gql`
  query isFollowing($followingId: ID!) {
    isFollowing(followingId: $followingId)
  }
`;
