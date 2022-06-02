import { memo } from 'react';
import styled from 'styled-components';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Col, Row, Text } from '@ui-kit';
import BuyButton from '../../shared/CreatorContent/Product/BuyButton';

const Wrapper = styled('div')`
  float: right;
  width: 268px;
  height: 162px;
  padding: 20px;
  background-color: #202020;
  border-radius: 16px;
  margin-right: 20px;
  &.small {
    height: 96px;
  }
`;

export const BuyWidget = ({ userId, username, productId, price, limit, accessibility }) => {
  const { user } = useLoggedInUser();

  return (
    <Wrapper className={user.isCreator ? 'small' : ''}>
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
              <Text level={2}>{limit >= 0 ? limit : 'Unlimited'}</Text>
            </Col>
          </Row>
        </Col>
        {!user.isCreator && (
          <Col span={24} padding_top={6}>
            <BuyButton
              block
              userId={userId}
              username={username}
              productId={productId}
              price={price}
              limit={limit}
              accessibility={accessibility}
            />
          </Col>
        )}
      </Row>
    </Wrapper>
  );
};

export default memo(BuyWidget);
