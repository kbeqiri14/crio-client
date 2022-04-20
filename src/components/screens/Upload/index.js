import { Fragment, memo, useCallback, useReducer } from 'react';
import { useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import Confirmation from '@shared/Confirmation';
import { deleteArtwork } from '@app/graphql/mutations/artwork.mutation';
import DragAndDrop from './DragAndDrop';
import Uploading from './Uploading';
import VideoDetails from '../Video/Details';
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
  const { user } = useLoggedInUser();
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
  const goToProfile = useCallback(
    () => history.push(`/profile/${user?.username}`),
    [user?.username],
  );

  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { artworkId: state.artworkId, videoUri: state.videoUri } },
    onCompleted: goToProfile,
  });

  const onCancel = useCallback(() => dispatch({ type: types.CONFIRMATION_VISIBLE }), [dispatch]);
  const onCompleted = useCallback(() => dispatch({ type: types.UPLOAD_COVER_IMAGE }), [dispatch]);

  return (
    <Fragment>
      {!state.uploadedVideoVisible && (
        <DragAndDrop
          videoUri={state.videoUri}
          file={state.file}
          types={types}
          dispatch={dispatch}
          goToProfile={goToProfile}
        />
      )}
      {state.uploadingVisible && <Uploading state={state} types={types} dispatch={dispatch} />}
      {state.uploadedVideoVisible && (
        <VideoDetails
          artworkId={state.artworkId}
          file={state.file}
          onCancel={onCancel}
          onCompleted={onCompleted}
        />
      )}
      {state.coverImageVisible && (
        <CoverImage
          visible={state.coverImageVisible}
          artworkId={state.artworkId}
          goToProfile={goToProfile}
        />
      )}
      {state.confirmationVisible && (
        <Confirmation
          visible={state.confirmationVisible}
          title='Cancel the uploading?'
          loading={removingArtwork}
          onConfirm={removeArtwork}
          onCancel={hideConfirmation}
        />
      )}
    </Fragment>
  );
};

export default memo(Upload);
