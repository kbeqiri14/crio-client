import { gql } from '@apollo/client';

export const createArtwork = gql`
  mutation createArtwork($params: ArtworkParams!) {
    createArtwork(params: $params) {
      id
    }
  }
`;

export const updateMetadata = gql`
  mutation updateMetadata($params: ThumbnailParams!) {
    updateMetadata(params: $params)
  }
`;

export const deleteArtwork = gql`
  mutation deleteArtwork($params: DeletingParams!) {
    deleteArtwork(params: $params)
  }
`;

export const likeArtwork = gql`
  mutation likeArtwork($artworkId: ID!) {
    likeArtwork(artworkId: $artworkId)
  }
`;
