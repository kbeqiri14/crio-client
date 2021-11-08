import axios from 'axios';
import { memo, useCallback, useEffect, useState } from 'react';
import { Progress } from 'antd';
import { useMutation } from '@apollo/client';

import { createArtwork } from '@app/graphql/mutations/artwork.mutation';
import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import './styles.less';

const Uploading = ({ state, types, dispatch }) => {
  const [loading, setLoading] = useState(true);
  const closeModal = useCallback(() => dispatch({ type: types.UPLOADED_VIDEO_VISIBLE }), [types, dispatch]);
  const [saveArtwork, { loading: creatingArtwork }] = useMutation(createArtwork, {
    variables: { videoUri: state.videoUri },
    onCompleted: ({ createArtwork }) => dispatch({ type: types.UPLOADED_VIDEO_VISIBLE, artworkId: createArtwork.id }),
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
        });
        if (request.status === 204) {
          saveArtwork();
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    if (state.file && state.uploadLink) {
      upload();
    }
  }, [state.file, state.uploadLink, saveArtwork])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && !creatingArtwork) {
        dispatch({ type: types.UPLOADED_VIDEO_VISIBLE });
      }
      dispatch({ type: types.UPDATE_VIDEO_STATUS, percent: state.percent + 1.5 });
    }, 50);
    return () => clearInterval(interval);
  }, [
      loading,
      creatingArtwork,
      state.percent,
      types.UPDATE_VIDEO_STATUS,
      types.UPLOADED_VIDEO_VISIBLE,
      dispatch,
      saveArtwork,
    ]);

  return (
    <BlurredModal blurred visible={state.uploadingVisible} width={686} onCancel={closeModal}>
      <Title level={10} color='white'>Uploading</Title>
      <Text level={30} color='white_75'>{`${state.percent} % - ${100 - state.percent} minutes left`}</Text>
      <Progress percent={state.percent} showInfo={false} />
    </BlurredModal>
  );
};

export default memo(Uploading);
