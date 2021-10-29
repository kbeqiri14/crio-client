import { memo, useCallback } from 'react';
import { Col, Row } from 'antd';

import history from '@app/configs/history';
import ActionButtons from '@shared/ActionButtons';
import { usePresentation, defaultMockValue } from '@shared/PresentationView';
import { Text, Title } from '@ui-kit/Text';
import Modal from '@ui-kit/Modal';
import { ReactComponent as CoverImageIcon } from '@svgs/cover-image.svg';

const CoverImage = ({ visible, setVisible}) => {
  const { show } = usePresentation();
  const closeModal = useCallback(() => {
    setVisible(false);
    history.push('/', { state: 'cover-image' });
    show(defaultMockValue);
  }, [setVisible, show]);

  return (
    <Modal blurred visible={visible} width={686} onCancel={closeModal}>
      <Row  gutter={[0, 40]} className='upload small'>
        <Col span={24}>
          <Title inline level='10' color='white'>Upload cover image</Title>
        </Col>
        <Col span={24}>
          <Text inline level='10' color='white'>If skipped we will generate a cover image from video.</Text>
        </Col>
        <Col span={24}>
          <Row justify='center' align='center' gutter={[0, 11]} className='dray-and-drop small'>
            <Col span={24}>
              <CoverImageIcon />
            </Col>
            <Col span={24}>
              <Text inline level='10' color='white'>Drag and drop an image, or <a href='/'>Upload</a></Text>
            </Col>
          </Row>
        </Col>
        <Col span={12} offset={7}>
          <ActionButtons cancelText='SKIP' saveText='PUBLISH' onCancel={closeModal} onSave={closeModal} />
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(CoverImage);
