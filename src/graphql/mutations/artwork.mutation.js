import { gql } from '@apollo/client';

export const createArtwork = gql`
  mutation createArtwork($videoId: String!) {
    createArtwork(videoId: $videoId) {
      id
      userId
      videoId
      title
      description
      status
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
