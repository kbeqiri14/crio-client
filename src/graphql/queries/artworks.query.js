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

export const getArtworks = gql`
  query {
    getArtworks {
      ...ArtworkAttributes
    }
  }
  ${artwork_fragment}
`;
