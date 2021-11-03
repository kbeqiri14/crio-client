import { memo, useCallback, useEffect } from 'react';
import { Progress } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import './styles.less';

const Uploading = ({
  visible,
  setVisible,
  percent = 0,
  setPercent,
  remainingTime,
  setRemainingTime,
  setUploadedVideoVisible,
}) => {
  const closeModal = useCallback(() => setVisible(false), [setVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (percent === 100) {
        setVisible(false);
        setUploadedVideoVisible(true);
      }
      setPercent(percent + 1) || setRemainingTime(remainingTime - 1);
    }, 50);
    return () => clearInterval(interval);
  });

  return (
    <BlurredModal blurred visible={visible} width={686} onCancel={closeModal}>
      <Title level={10} color='white'>Uploading</Title>
      <Text level={30} color='white_75'>{`${percent} % - ${100 - percent} minutes left`}</Text>
      <Progress percent={percent} showInfo={false} />
    </BlurredModal>
  );
};

export default memo(Uploading);
