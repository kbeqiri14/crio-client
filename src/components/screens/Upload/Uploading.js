import { memo, useCallback, useEffect } from 'react';
import { Progress } from 'antd';
import { useMutation } from '@apollo/client';

import { createArtwork } from '@app/graphql/mutations/artwork.mutation';
import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import './styles.less';

const Uploading = ({ state, types, dispatch }) => {
  const closeModal = useCallback(() => dispatch({ type: types.UPLOADED_VIDEO_VISIBLE }), [types, dispatch]);
  const [saveArtwork] = useMutation(createArtwork, {
    variables: { videoUri: state.videoUri || '' },
    onCompleted: () => dispatch({ type: types.UPLOADED_VIDEO_VISIBLE }),
    onError: () => dispatch({ type: types.UPLOADED_VIDEO_VISIBLE }),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.percent === 100) {
        saveArtwork();
      }
      dispatch({ type: types.UPDATE_VIDEO_STATUS, percent: state.percent + 1 });
    }, 50);
    return () => clearInterval(interval);
  }, [state.percent, types.UPDATE_VIDEO_STATUS, types.UPLOADED_VIDEO_VISIBLE, dispatch, saveArtwork]);

  return (
    <BlurredModal blurred visible={state.uploadingVisible} width={686} onCancel={closeModal}>
      <Title level={10} color='white'>Uploading</Title>
      <Text level={30} color='white_75'>{`${state.percent} % - ${100 - state.percent} minutes left`}</Text>
      <Progress percent={state.percent} showInfo={false} />
    </BlurredModal>
  );
};

export default memo(Uploading);
