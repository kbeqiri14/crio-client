import { memo } from 'react';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Col, Row, Text } from '@ui-kit';
import BuyButton from '@shared/CreatorContent/Product/BuyButton';
import HelpTooltip from './HelpTooltip';
import { categoriesVar } from '@configs/client-cache';

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  .widget {
    width: 268px;
    height: 162px;
    padding: 20px;
    background-color: #202020;
    border-radius: 16px;
    &.small {
      height: 96px;
    }
    margin-bottom: 20px;
  }
  .ant-tooltip {
    top: 0 !important;
    right: 0 !important;
    left: -243px !important;
  }
  .got-it-button {
    position: absolute;
    top: 269px;
    right: 121px;
  }
  @media (max-width: 992px) {
    .ant-tooltip-open {
      margin-bottom: 30px;
    }
  }
`;

export const BuyWidget = ({
  userId,
  productId,
  categoryId,
  file,
  price,
  limit,
  accessibility,
  onOpenChange,
}) => {
  const { user } = useLoggedInUser();
  const categories = useReactiveVar(categoriesVar);

  return (
    <Wrapper>
      <Row gutter={[0, 8]} className={`widget ${user.isCreator ? 'small' : ''}`}>
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
              <Text level={2}>{limit != null && limit >= 0 ? limit : 'Unlimited'}</Text>
            </Col>
          </Row>
        </Col>
        <Col span={24} padding_top={6}>
          <BuyButton
            block
            userId={userId}
            productId={productId}
            categoryId={categoryId}
            file={file}
            price={price}
            limit={limit}
            accessibility={accessibility}
          />
        </Col>
      </Row>
      {!user.isCreator && (!user?.id || categoryId === categories.commissionId) && (
        <HelpTooltip
          onOpenChange={onOpenChange}
          title={
            user?.id
              ? 'After purchase, please check your email to receive a service from Creator'
              : 'After purchase, please check your email to receive product/service from Creator'
          }
        />
      )}
    </Wrapper>
  );
};

export default memo(BuyWidget);
