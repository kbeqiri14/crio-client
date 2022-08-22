import { memo } from 'react';

import { Badge, Col, Row, Text } from '@ui-kit';

const Bullet = ({ title, desc, badge }) => {
  return (
    <Row>
      {title && (
        <Col span={24}>
          <Text level={4}>{title}</Text>
        </Col>
      )}
      <Col span={24}>
        <Text level={3}>{desc}</Text>
        {badge.map((item) => (
          <Badge status='default' color='white' level={3} text={item} />
        ))}
      </Col>
    </Row>
  );
};

export default memo(Bullet);
