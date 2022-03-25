import { gql } from '@apollo/client';

export const work_fragment = gql`
  fragment WorkDetailAttributes on WorkDetail {
    id
    artworkId
    userId
    providerType
    providerUserId
    avatar
    name
    videoUri
    thumbnailUri
    title
    description
    status
  }
`;

export const getUploadUrl = gql`
  query getUploadUrl($size: Int!) {
    getUploadUrl(size: $size) {
      uri
      upload_link
      status
      pictures_uri
    }
  }
`;

export const getUploadImageLink = gql`
  query getUploadImageLink($artworkId: ID!) {
    getUploadImageLink(artworkId: $artworkId) {
      uri
      link
    }
  }
`;

export const getUserArtworks = gql`
  query getUserArtworks($username: String) {
    getUserArtworks(username: $username) {
      ...WorkDetailAttributes
    }
  }
  ${work_fragment}
`;

export const getRandomArtworksInfo = gql`
  query {
    getRandomArtworksInfo {
      count
      creatorIds
      artworks {
        ...WorkDetailAttributes
      }
    }
  }
  ${work_fragment}
`;

export const getRandomArtworks = gql`
  query getRandomArtworks($params: paginationParams!) {
    getRandomArtworks(params: $params) {
      ...WorkDetailAttributes
    }
  }
  ${work_fragment}
`;

export const getRandomArtworksForFeed = gql`
  query getRandomArtworksForFeed($params: paginationParams!) {
    getRandomArtworksForFeed(params: $params) {
      topArtworks {
        ...WorkDetailAttributes
      }
      userArtworks {
        ...WorkDetailAttributes
      }
      artworks {
        ...WorkDetailAttributes
      }
    }
  }
  ${work_fragment}
`;
