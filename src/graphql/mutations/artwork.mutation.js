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
