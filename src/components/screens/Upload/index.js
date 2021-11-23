import { Fragment, memo, useCallback, useReducer } from 'react';
import { useMutation } from '@apollo/client';

import history from '@app/configs/history';
import ActionButtons from '@shared/ActionButtons';
import { deleteArtwork } from '@app/graphql/mutations/artwork.mutation';
import { Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
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
  CONFIRMATION_VISIBLE: 8,
  CONFIRMATION_HIDE: 9,
};
const setState = (payload) => ({
  [types.UPLOADING]: { uploadingVisible: true },
  [types.CANCEL_UPLOADING]: { uploadingVisible: false, file: undefined },
  [types.UPDATE_UPLOADING_STATE]: {
    percent: payload.percent,
    remainingTime: payload.remainingTime,
  },
  [types.UPLOADED_VIDEO_VISIBLE]: {
    uploadingVisible: false,
    uploadedVideoVisible: true,
    artworkId: payload.artworkId,
  },
  [types.UPLOAD_COVER_IMAGE]: { coverImageVisible: true },
  [types.SET_FILE]: { file: payload.file },
  [types.SET_VIDEO_URI]: { videoUri: payload.videoUri, uploadLink: payload.uploadLink },
  [types.CONFIRMATION_VISIBLE]: { confirmationVisible: true },
  [types.CONFIRMATION_HIDE]: { confirmationVisible: false },
});
const reducer = (state, { type, ...payload }) => ({ ...state, ...setState(payload)[type] });

const Upload = () => {
  const [state, dispatch] = useReducer(reducer, {
    percent: 0,
    remainingTime: 0,
    uploadingVisible: false,
    uploadedVideoVisible: false,
    coverImageVisible: false,
    confirmationVisible: false,
  });

  const hideConfirmation = useCallback(
    () => dispatch({ type: types.CONFIRMATION_HIDE }),
    [dispatch],
  );
  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { artworkId: state.artworkId, videoUri: state.videoUri } },
    onCompleted: () => history.push('/account'),
  });

  return (
    <Fragment>
      {!state.uploadedVideoVisible && (
        <DragAndDrop
          videoUri={state.videoUri}
          file={state.file}
          types={types}
          dispatch={dispatch}
        />
      )}
      {state.uploadingVisible && <Uploading state={state} types={types} dispatch={dispatch} />}
      {state.uploadedVideoVisible && (
        <VideoInfo
          artworkId={state.artworkId}
          file={state.file}
          types={types}
          dispatch={dispatch}
        />
      )}
      {state.coverImageVisible && (
        <CoverImage visible={state.coverImageVisible} artworkId={state.artworkId} />
      )}
      {state.confirmationVisible && (
        <BlurredModal
          width={486}
          maskClosable={false}
          visible={state.confirmationVisible}
          onCancel={hideConfirmation}
          className='confirmation'
        >
          <Title level={10} color='white'>
            Cancel the uploading?
          </Title>
          <ActionButtons
            cancelText='NO'
            saveText='YES, CANCEL'
            loading={removingArtwork}
            onCancel={hideConfirmation}
            onSave={removeArtwork}
          />
        </BlurredModal>
      )}
    </Fragment>
  );
};

export default memo(Upload);
