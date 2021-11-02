import { memo } from 'react';
import { Col, Row } from 'antd';

import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import { ReactComponent as CoverImageIcon } from '@svgs/cover-image.svg';

const CoverImage = ({ visible, onClose}) => (
  <BlurredModal blurred visible={visible} width={686} onCancel={onClose}>
    <Row gutter={[0, 40]} className='upload small'>
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
      <Col>
        <ActionButtons cancelText='SKIP' saveText='PUBLISH' onCancel={onClose} onSave={onClose} />
      </Col>
    </Row>
  </BlurredModal>
);

export default memo(CoverImage);
