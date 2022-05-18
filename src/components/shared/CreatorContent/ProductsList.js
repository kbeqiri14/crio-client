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
          userId={item?.userId}
          username={item?.name}
          productId={item?.productId}
          type={item?.type}
          title={item?.title}
          description={item?.description}
          price={item?.price}
          limit={item?.limit}
          accessibility={item?.accessibility}
          thumbnail={item?.thumbnail}
        />
      </Col>
    ))}
  </Row>
);

export default memo(ProductsList);
