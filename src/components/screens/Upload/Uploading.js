import { memo, useCallback, useEffect } from 'react';
import { Progress } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import Modal from '@ui-kit/Modal';
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
      setPercent(percent + 10) || setRemainingTime(remainingTime - 1);
    }, 300);
    return () => clearInterval(interval);
  });

  return (
    <Modal blurred visible={visible} width={686} onCancel={closeModal}>
      <Title level={10} color='white'>Uploading</Title>
      <Text level={30} color='white_75'>{`${percent} % . ${remainingTime} left`}</Text>
      <Progress percent={percent} showInfo={false} />
    </Modal>
  );
};

export default memo(Uploading);
