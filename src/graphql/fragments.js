import { gql } from '@apollo/client';

export const meFragment = gql`
  fragment Me on UserInfo {
    id
    email
    userId
    username
    firstName
    lastName
    image
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
    featuresSeen
    helpSeen
    showRevenue
    emailVisible
    revenue
    productLikes
    artworkLikes
    categories {
      productCategories
      artworkCategories
    }
  }
`;

export const followingInfoFragment = gql`
  fragment FollowingInfoAttributes on FollowingInfo {
    id
    followingId
    username
    firstName
    lastName
    image
  }
`;

export const productFragment = gql`
  fragment ProductDetailAttributes on ProductDetail {
    productId
    userId
    username
    image
    categoryId
    title
    description
    price
    limit
    accessibility
    thumbnails
    file
    likes
  }
`;

export const artworkFragment = gql`
  fragment ArtworkDetailAttributes on WorkDetail {
    artworkId
    userId
    username
    image
    content
    thumbnail
    title
    description
    accessibility
    categoryId
    status
    likes
  }
`;
