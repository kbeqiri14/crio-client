import { memo, useCallback, useEffect } from 'react';
import { Progress } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import './styles.less';

const Uploading = ({ state, types, dispatch }) => {
  const closeModal = useCallback(() => dispatch({ type: types.UPLOADED_VIDEO_VISIBLE }), [types, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.percent === 100) {
        dispatch({ type: types.UPLOADED_VIDEO_VISIBLE });
      }
      dispatch({ type: types.UPDATE_VIDEO_STATUS, percent: state.percent + 1 });
    }, 50);
    return () => clearInterval(interval);
  }, [state.percent, types.UPDATE_VIDEO_STATUS, types.UPLOADED_VIDEO_VISIBLE, dispatch]);

  return (
    <BlurredModal blurred visible={state.uploadingVisible} width={686} onCancel={closeModal}>
      <Title level={10} color='white'>Uploading</Title>
      <Text level={30} color='white_75'>{`${state.percent} % - ${100 - state.percent} minutes left`}</Text>
      <Progress percent={state.percent} showInfo={false} />
    </BlurredModal>
  );
};

export default memo(Uploading);
