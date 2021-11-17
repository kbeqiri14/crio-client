import axios from 'axios';
import { memo, useEffect } from 'react';
import { Progress } from 'antd';
import { useMutation } from '@apollo/client';

import { createArtwork } from '@app/graphql/mutations/artwork.mutation';
import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import { Spinner } from '@ui-kit/Spinner';
import { errorToast } from '@ui-kit/Notification';

const timeStarted = new Date();
const formatRemainingTime = (time) => {
  let formattedTime = time;
  let timeUnit = 'seconds';
  if (time > 60) {
    formattedTime = time / 60;
    timeUnit = 'minutes';
  }
  return `${Math.round(formattedTime)} ${timeUnit} left`;
};

const Uploading = ({ state, types, dispatch }) => {
  const [saveArtwork, { loading }] = useMutation(createArtwork, {
    variables: { videoUri: state.videoUri },
    onCompleted: ({ createArtwork }) =>
      dispatch({ type: types.UPLOADED_VIDEO_VISIBLE, artworkId: createArtwork.id }),
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
        errorToast('Uploading Video Error', 'Something went wrong. Please try later.');
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
    <BlurredModal
      blurred
      visible={state.uploadingVisible}
      closable={false}
      maskClosable={false}
      width={686}
      className='uploading'
    >
      <Spinner spinning={loading} color='white'>
        <Title level={10} color='white'>
          Uploading
        </Title>
        <Text level={20} color='white_75'>
          <span>{state.percent} % &bull; </span>
          <span>{formatRemainingTime(state.remainingTime)}</span>
        </Text>
        <Progress percent={state.percent} showInfo={false} />
      </Spinner>
    </BlurredModal>
  );
};

export default memo(Uploading);
