import { memo } from 'react';

import { Badge, Col, Text } from '@ui-kit';

const Bullet = ({ title, desc, badgeArr }) => {
  return (
    <Col span={24}>
      {title && (
        <>
          <Text level={4}>{title}</Text>
          <br />
        </>
      )}
      <Text level={3}>{desc}</Text>
      {badgeArr.map((item) => (
        <div>
          <Badge status='default' color='white' level={3} text={item} />
        </div>
      ))}
    </Col>
  );
};

export default memo(Bullet);
