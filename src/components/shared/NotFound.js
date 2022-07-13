import { memo } from 'react';
import styled from 'styled-components';

import { Col, Row, Text } from '@ui-kit';

const Wrapper = styled('div')`
  display: flex;
  align-content: center;
  justify-content: center;
  height: calc(100vh - 70px);
`;
const NotFound = ({ text, icon }) => (
  <Wrapper>
    <Row justify='center' align='middle' className='full-height'>
      <Col>
        <Row justify='center' gutter={[0, 40]}>
          <Col>{icon}</Col>
          <Col span={24} align='center'>
            <Text level={3}>{text}</Text>
          </Col>
        </Row>
      </Col>
    </Row>
  </Wrapper>
);

export default memo(NotFound);
