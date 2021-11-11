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
      ...ArtworkAttributes
    }
  }
  ${artwork_fragment}
`;
