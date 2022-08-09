import { memo } from 'react';

import { Col, Text } from '@ui-kit';

const Content = ({ content }) =>
  content.map((item) => (
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

export default memo(Content);
