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
};

const reducer = (state, { type, ...payload }) => {
  switch (type) {
    case types.UPLOADING:
      return { ...state, uploadingVisible: true };
    case types.UPDATE_VIDEO_STATUS:
      return { ...state, percent: payload.percent, remainingTime: payload.remainingTime };
    case types.UPLOADED_VIDEO_VISIBLE:
      return { ...state, uploadingVisible: false, uploadedVideoVisible: true };
    case types.UPLOAD_COVER_IMAGE:
      return { ...state, uploadedVideoVisible: false, coverImageVisible: true };
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

  return (
    <Fragment>
      {!state.uploadedVideoVisible && <DragAndDrop types={types} dispatch={dispatch} />}
      {state.uploadingVisible && <Uploading state={state} types={types} dispatch={dispatch} />}
      {state.uploadedVideoVisible && <VideoInfo types={types} dispatch={dispatch} />}
      {state.coverImageVisible && <CoverImage visible={state.coverImageVisible} types={types} dispatch={dispatch} />}
    </Fragment>
  );
};

export default memo(Upload);
