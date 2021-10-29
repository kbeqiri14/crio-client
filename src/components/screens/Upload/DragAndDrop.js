import { memo } from 'react';
import { Col, Row } from 'antd';

import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as DragAndDropIcon } from '@svgs/drag-and-drop.svg';

const DragAndDrop = ({ onContinue }) => (
  <Row gutter={[0, 50]} className='upload'>
    <Col span={24}>
      <Title inline level='10' color='white'>Upload your artwork</Title>
    </Col>
    <Col span={12} offset={6}>
      <Row justify='center' align='center' gutter={[0, 11]} className='dray-and-drop'>
        <Col span={24}>
          <DragAndDropIcon />
        </Col>
        <Col span={24}>
          <Text inline level='10' color='white'>Drag and drop a video</Text>
        </Col>
        <Col span={24}>
          <Text inline level='10' color='white'>1920 x 1080 higher recommended. Max 20GB each.</Text>
        </Col>
      </Row>
    </Col>
    <Col span={12} offset={10}>
      <ActionButtons saveText='CONTINUE' onSave={onContinue} />
    </Col>
  </Row>
);

export default memo(DragAndDrop);
