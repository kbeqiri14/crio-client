import { gql } from '@apollo/client';

export const meFragment = gql`
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
    productsCount
    artworksCount
    followersCount
    followingsCount
    isFollowing
    followings
    boughtProducts
  }
`;

export const followingInfoFragment = gql`
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

export const productFragment = gql`
  fragment ProductDetailAttributes on ProductDetail {
    productId
    userId
    username
    providerType
    providerUserId
    avatar
    type
    title
    description
    price
    limit
    accessibility
    thumbnail
  }
`;

export const artworkFragment = gql`
  fragment ArtworkDetailAttributes on WorkDetail {
    artworkId
    userId
    username
    providerType
    providerUserId
    avatar
    videoUri
    thumbnailUri
    title
    description
    accessibility
    status
  }
`;
