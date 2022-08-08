import { memo } from 'react';

import { Badge, Col, Text } from '@ui-kit';

const Content = ({ contentArr }) => {
  return contentArr.map((item) => (
    <>
      {Array.isArray(item) ? (
        <Col span={24}>
          <Text level={4}>{item[0]}</Text>
          <br />
          <Text level={3}>{item[1]}</Text>
        </Col>
      ) : (
        <Col span={24}>
          <Text level={3}>{item}</Text>
        </Col>
      )}
    </>
  ));
};

export default memo(Content);
