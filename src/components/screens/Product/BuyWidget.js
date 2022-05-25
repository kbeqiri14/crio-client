import { memo } from 'react';
import styled from 'styled-components';

import { Button, Col, Row, Text } from '@ui-kit';

const Wrapper = styled('div')`
  float: right;
  width: 268px;
  height: 162px;
  padding: 20px;
  background-color: #202020;
  border-radius: 16px;
  margin-right: 20px;
`;

export const MoreProductsSection = ({ price, limit, onClick }) => (
  <Wrapper>
    <Row gutter={[0, 8]}>
      <Col span={24}>
        <Row justify='space-between'>
          <Col>
            <Text level={2}>Price:</Text>
          </Col>
          <Col>
            <Text level={2}>{price ? `$${price?.toFixed(2)}` : 'Free'}</Text>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify='space-between'>
          <Col>
            <Text level={2}>Availability:</Text>
          </Col>
          <Col>
            <Text level={2}>{limit || 'Unlimited'}</Text>
          </Col>
        </Row>
      </Col>
      <Col span={24} padding_top={6}>
        <Button block type='primary' fill_color={price ? 'blue' : 'green'} onClick={onClick}>
          {price ? 'Buy' : 'Email'}
        </Button>
      </Col>
    </Row>
  </Wrapper>
);

export default memo(MoreProductsSection);
