import { memo } from 'react';

import { Col, Row } from '@ui-kit';
import Product from './Product';

export const ProductsList = ({ productsList = [] }) => (
  <Row gutter={[22, 20]}>
    {productsList.map((item) => (
      <Col key={item.id}>
        <Product
          providerType={item?.providerType}
          providerUserId={item?.providerUserId}
          avatar={item?.avatar}
          src={item?.thumbnailUri}
          userId={item?.userId}
          username={item?.name}
          artworkId={item?.artworkId}
          title={item?.title}
          description={item?.description}
          status={item?.status}
          accessibility={item?.accessibility}
          videoUri={item?.videoUri}
          thumbnailUri={item?.thumbnailUri}
        />
      </Col>
    ))}
  </Row>
);

export default memo(ProductsList);
