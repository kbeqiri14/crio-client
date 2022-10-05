import axios from 'axios';
import { memo, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { createArtwork } from '@app/graphql/mutations/artwork.mutation';
import { Modal, notification, Text, Title, Progress } from '@ui-kit';
import { Spinner } from '@ui-kit/Spinner';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';

const timeStarted = new Date();
const formatRemainingTime = (time) => {
  let formattedTime = Math.round(time);
  let timeUnit = 'seconds';
  if (time > 60) {
    let minutes = Math.round(time / 60);
    const hours = Math.round(minutes / 60);
    minutes = minutes - hours * 60;
    formattedTime = hours ? `${hours} hour ${minutes < 0 ? 0 : minutes}` : minutes;
    timeUnit = 'minutes';
  }
  return `${formattedTime} ${timeUnit} left`;
};

const Uploading = ({ state, types, dispatch }) => {
  const [saveArtwork, { loading }] = useMutation(createArtwork, {
    variables: { params: { content: state.content, isVideo: true } },
    onCompleted: ({ createArtwork }) =>
      dispatch({ type: types.UPLOADED_VIDEO_VISIBLE, artworkId: createArtwork.id }),
    onError: () => {
      dispatch({ type: types.CANCEL_UPLOADING });
      notification.errorToast('Something went wrong!', 'Please, try again later!');
    },
  });

  useEffect(() => {
    const upload = async () => {
      try {
        const request = await axios.patch(state.uploadLink, state.file, {
          headers: {
            Accept: 'application/vnd.vimeo.*+json;version=3.4',
            'Content-Type': 'application/offset+octet-stream',
            'Tus-Resumable': '1.0.0',
            'Upload-Offset': 0,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            const timeElapsed = new Date() - timeStarted;
            const uploadSpeed = progressEvent.loaded / (timeElapsed / 1000);
            dispatch({
              type: types.UPDATE_UPLOADING_STATE,
              percent: percentCompleted,
              remainingTime: (progressEvent.total - progressEvent.loaded) / uploadSpeed,
            });
          },
        });
        if (request.status === 204) {
          saveArtwork();
        }
      } catch (e) {
        notification.errorToast('Something went wrong!', 'Please, try again later!');
      }
    };
    if (state.file && state.uploadLink) {
      upload();
    }
  }, [
    state.file,
    state.uploadLink,
    types.UPDATE_UPLOADING_STATE,
    types.UPLOADED_VIDEO_VISIBLE,
    dispatch,
    saveArtwork,
  ]);

  return (
    <Modal
      centered
      footer={null}
      closeIcon={<CloseIcon />}
      open={state.uploadingVisible}
      closable={false}
      maskClosable={false}
      width={686}
      className='uploading'
    >
      <Spinner spinning={loading} color='white'>
        <Title level={2}>Uploading</Title>
        <Text level={3}>
          <span>{state.percent} % &bull; </span>
          <span>{formatRemainingTime(state.remainingTime)}</span>
        </Text>
        <Progress percent={state.percent} showInfo={false} />
      </Spinner>
    </Modal>
  );
};

export default memo(Uploading);
