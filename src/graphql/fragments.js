import { gql } from '@apollo/client';

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
    id
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
