import { gql } from '@apollo/client';

export const artwork_fragment = gql`
  fragment ArtworkAttributes on Artwork {
    id
    userId
    videoUri
    thumbnailUri
    title
    description
    status
    pictures_uri
  }
`;

export const work_fragment = gql`
  fragment WorkDetailAttributes on WorkDetail {
    id
    artworkId
    userId
    fbUserId
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

export const getArtworks = gql`
  query {
    getArtworks {
      ...ArtworkAttributes
    }
  }
  ${artwork_fragment}
`;

export const getUserArtworks = gql`
  query getUserArtworks($id: ID) {
    getUserArtworks(id: $id) {
      ...WorkDetailAttributes
    }
  }
  ${work_fragment}
`;

export const getRandomArtworksCount = gql`
  query {
    getRandomArtworksCount
  }
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
      artworks {
        ...WorkDetailAttributes
      }
      userArtworks {
        ...WorkDetailAttributes
      }
    }
  }
  ${work_fragment}
`;
