import { gql } from '@apollo/client';
import { artworkFragment } from '../fragments';

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

export const getArtwork = gql`
  query getArtwork($artworkId: ID!) {
    getArtwork(artworkId: $artworkId) {
      ...ArtworkDetailAttributes
    }
  }
  ${artworkFragment}
`;

export const getUserArtworks = gql`
  query getUserArtworks($params: UserAttributesParams!) {
    getUserArtworks(params: $params) {
      ...ArtworkDetailAttributes
    }
  }
  ${artworkFragment}
`;

export const getRandomArtworks = gql`
  query getRandomArtworks($params: paginationParams!) {
    getRandomArtworks(params: $params) {
      ...ArtworkDetailAttributes
    }
  }
  ${artworkFragment}
`;

export const getArtworkLikes = gql`
  query getArtworkLikes($artworkId: ID!) {
    getArtworkLikes(artworkId: $artworkId) {
      userId
    }
  }
`;
