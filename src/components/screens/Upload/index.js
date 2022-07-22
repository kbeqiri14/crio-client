import { Fragment, memo, useCallback, useReducer } from 'react';
import { useMutation } from '@apollo/client';

import history from '@configs/history';
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
    src: payload.src,
  },
  [types.UPLOAD_COVER_IMAGE]: { coverImageVisible: true },
  [types.SET_FILE]: { file: payload.file },
  [types.SET_VIDEO_URI]: { content: payload.content, uploadLink: payload.uploadLink },
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
    () => history.push(`/profile/artworks/${user?.username}`),
    [user?.username],
  );

  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { artworkId: state.artworkId, content: state.content } },
    onCompleted: goToProfile,
  });

  const onCancel = useCallback(() => {
    if (state.file?.type?.split('/')?.[0] === 'image') {
      history.push(`/profile/artworks/${state?.username}`);
    } else {
      dispatch({ type: types.CONFIRMATION_VISIBLE });
    }
  }, [state?.username, state.file?.type, dispatch]);
  const onConfirm = useCallback(
    () => (state.file?.type?.split('/')?.[0] === 'image' ? goToProfile() : removeArtwork()),
    [state.file?.type, goToProfile, removeArtwork],
  );
  const onCompleted = useCallback(() => dispatch({ type: types.UPLOAD_COVER_IMAGE }), [dispatch]);

  return (
    <Fragment>
      {!state.uploadedVideoVisible && (
        <DragAndDrop
          content={state.content}
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
          src={state.src}
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
          onConfirm={onConfirm}
          onCancel={hideConfirmation}
        />
      )}
    </Fragment>
  );
};

export default memo(Upload);
