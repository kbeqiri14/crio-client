import axios from 'axios';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { Progress } from 'antd';
import { useMutation } from '@apollo/client';

import { createArtwork } from '@app/graphql/mutations/artwork.mutation';
import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import { errorToast } from '@ui-kit/Notification';
import './styles.less';

const Uploading = ({ state, types, dispatch }) => {
  const closeModal = useCallback(() => dispatch({ type: types.UPLOADED_VIDEO_VISIBLE }), [types, dispatch]);
  const [saveArtwork] = useMutation(createArtwork, {
    variables: { videoUri: state.videoUri },
    onCompleted: ({ createArtwork }) => dispatch({ type: types.UPLOADED_VIDEO_VISIBLE, artworkId: createArtwork.id }),
  });
  const timeStarted = useMemo(() => new Date(), []);
  const formatRemainingTime = useCallback((time) => {
    let formattedTime = time;
    let timeUnit = 'seconds';
    if (time > 60) {
      formattedTime = time / 60;
      timeUnit = 'minutes'
    }
    return `${formattedTime} ${timeUnit} left`;
  }, []);

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
          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            const timeElapsed = (new Date()) - timeStarted;
            const uploadSpeed = progressEvent.loaded / (timeElapsed / 1000);
            dispatch({
              type: types.UPDATE_VIDEO_STATUS,
              percent: percentCompleted,
              remainingTime: Math.round((progressEvent.total - progressEvent.loaded) / uploadSpeed),
            });
          }
        });
        if (request.status === 204) {
          saveArtwork();
        }
      } catch (e) {
        errorToast('Uploading Error', 'Something went wrong. Please try later.');
      }
    }
    if (state.file && state.uploadLink) {
      upload();
    }
  }, [state.file, state.uploadLink, timeStarted, types.UPDATE_VIDEO_STATUS, types.UPLOADED_VIDEO_VISIBLE, dispatch, saveArtwork])

  return (
    <BlurredModal blurred visible={state.uploadingVisible} width={686} onCancel={closeModal}>
      <Title level={10} color='white'>Uploading</Title>
      <Text level={30} color='white_75'>{`${state.percent} % - ${formatRemainingTime(state.remainingTime)}`}</Text>
      <Progress percent={state.percent} showInfo={false} />
    </BlurredModal>
  );
};

export default memo(Uploading);
