import { memo } from 'react';
import styled from 'styled-components';

import ProductsList from '@app/components/screens/ExplorePage/ProductsList';
import { Col, Row, Text } from '@ui-kit';

const Wrapper = styled('div')`
  max-width: 1394px;
  @media (max-width: 1393px) {
    max-width: 1040px;
  }
  @media (max-width: 1039px) {
    max-width: 686px;
  }
  @media (max-width: 685px) {
    max-width: 332px;
  }
  margin: auto;
  padding: 40px 0;
  > div {
    max-width: 1394px;
  }
`;

export const MarketplaceSection = ({ productsList }) => {
  return (
    <Wrapper>
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <Text level={2}>Other marketplace products</Text>
        </Col>
        <Col>
          <ProductsList productsList={productsList} />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(MarketplaceSection);
