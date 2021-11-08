import { Fragment, memo, useReducer } from 'react';

import DragAndDrop from './DragAndDrop';
import Uploading from './Uploading';
import VideoInfo from './VideoInfo';
import CoverImage from './CoverImage';
import './styles.less';

const types = {
  UPLOADING: 1,
  UPDATE_VIDEO_STATUS: 2,
  UPLOADED_VIDEO_VISIBLE: 3,
  UPLOAD_COVER_IMAGE: 4,
  SET_VIDEO_URI: 5,
};

const reducer = (state, { type, ...payload }) => {
  switch (type) {
    case types.UPLOADING:
      return { ...state, uploadingVisible: true, file: payload.file };
    case types.UPDATE_VIDEO_STATUS:
      return { ...state, percent: payload.percent, remainingTime: payload.remainingTime };
    case types.UPLOADED_VIDEO_VISIBLE:
      return { ...state, uploadingVisible: false, uploadedVideoVisible: true, artworkId: payload.artworkId };
    case types.UPLOAD_COVER_IMAGE:
      return { ...state, uploadedVideoVisible: false, coverImageVisible: true };
    case types.SET_VIDEO_URI:
      return { ...state, videoUri: payload.videoUri, uploadLink: payload.uploadLink };
    default:
      return state;
  }
};

const Upload = () => {
  const [state, dispatch] = useReducer(reducer, {
    percent: 0,
    uploadingVisible: false,
    uploadedVideoVisible: false,
    coverImageVisible: false,
  });
console.log(state.videoUri, 'statestate')
  return (
    <Fragment>
      {!state.uploadedVideoVisible && <DragAndDrop types={types} dispatch={dispatch} />}
      {state.uploadingVisible && <Uploading state={state} types={types} dispatch={dispatch} />}
      {state.uploadedVideoVisible && <VideoInfo artworkId={state.artworkId} types={types} dispatch={dispatch} />}
      {state.coverImageVisible && <CoverImage visible={state.coverImageVisible} artworkId={state.artworkId} />}
    </Fragment>
  );
};

export default memo(Upload);
