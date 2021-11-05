import { gql } from '@apollo/client';

export const createArtwork = gql`
  mutation createArtwork($videoUri: String!) {
    createArtwork(videoUri: $videoUri) {
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
