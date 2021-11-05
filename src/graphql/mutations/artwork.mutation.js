import { gql } from '@apollo/client';

export const createArtwork = gql`
  mutation createArtwork($artwork: ArtworkInfo!) {
    createArtwork(artwork: $artwork) {
      id
      userId
      videoUri
      thumbnailUri
      title
      description
      status
      pictures_uri
    }
  }
`;

export const deleteArtwork = gql`
  mutation deleteArtwork($artworkId: ID!) {
    deleteArtwork(artworkId: $artworkId)
  }
`;
