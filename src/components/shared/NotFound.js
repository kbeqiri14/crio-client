import { memo } from 'react';

import { Col, Row, Text } from '@ui-kit';

const NotFound = ({ text, icon }) => (
  <Row justify='center' align='middle' className='full-height'>
    <Col>
      <Row justify='center' gutter={[0, 40]}>
        <Col>{icon}</Col>
        <Col span={24} align='center'>
          <Text level={3} color='white'>
            {text}
          </Text>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default memo(NotFound);
