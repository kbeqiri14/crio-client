import { Fragment, memo, useReducer } from 'react';
import { useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { deleteArtwork } from '@app/graphql/mutations/artwork.mutation';
import DragAndDrop from './DragAndDrop';
import Uploading from './Uploading';
import VideoInfo from './VideoInfo';
import CoverImage from './CoverImage';
import './styles.less';

const types = {
  UPLOADING: 1,
  CANCEL_UPLOADING: 2,
  UPDATE_UPLOADING_STATE: 3,
  UPLOADED_VIDEO_VISIBLE: 4,
  UPLOAD_COVER_IMAGE: 5,
  SET_FILE: 6,
  SET_VIDEO_URI: 7,
};

const reducer = (state, { type, ...payload }) => {
  switch (type) {
    case types.UPLOADING:
      return { ...state, uploadingVisible: true };
    case types.CANCEL_UPLOADING:
      return { ...state, uploadingVisible: false, file: undefined };
    case types.UPDATE_UPLOADING_STATE:
      return { ...state, percent: payload.percent, remainingTime: payload.remainingTime };
    case types.UPLOADED_VIDEO_VISIBLE:
      return {
        ...state,
        uploadingVisible: false,
        uploadedVideoVisible: true,
        artworkId: payload.artworkId,
      };
    case types.UPLOAD_COVER_IMAGE:
      return { ...state, uploadedVideoVisible: false, coverImageVisible: true };
    case types.SET_FILE:
      return { ...state, file: payload.file };
    case types.SET_VIDEO_URI:
      return { ...state, videoUri: payload.videoUri, uploadLink: payload.uploadLink };
    default:
      return state;
  }
};

const Upload = () => {
  const [state, dispatch] = useReducer(reducer, {
    percent: 0,
    remainingTime: 0,
    uploadingVisible: false,
    uploadedVideoVisible: false,
    coverImageVisible: false,
  });

  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { artworkId: state.artworkId, videoUri: state.videoUri } },
    onCompleted: () => history.push('/account'),
  });

  return (
    <Fragment>
      {!state.uploadedVideoVisible && (
        <DragAndDrop
          file={state.file}
          types={types}
          dispatch={dispatch}
          removingArtwork={removingArtwork}
          removeArtwork={removeArtwork}
        />
      )}
      {state.uploadingVisible && <Uploading state={state} types={types} dispatch={dispatch} />}
      {state.uploadedVideoVisible && (
        <VideoInfo
          artworkId={state.artworkId}
          file={state.file}
          types={types}
          dispatch={dispatch}
          removingArtwork={removingArtwork}
          removeArtwork={removeArtwork}
        />
      )}
      {state.coverImageVisible && (
        <CoverImage visible={state.coverImageVisible} artworkId={state.artworkId} />
      )}
    </Fragment>
  );
};

export default memo(Upload);
