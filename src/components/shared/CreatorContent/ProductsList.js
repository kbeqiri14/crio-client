import { memo, useMemo } from 'react';

import { Col, Row } from '@ui-kit';
import Product from './Product';

const Item = ({ item, large }) => (
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
    large={large}
  />
);

export const ProductsList = ({ productsList = [] }) => {
  const blocks = useMemo(
    () => new Array(3).fill('').map((_, i) => productsList.slice(i * 5, (i + 1) * 5)),
    [productsList],
  );

  return blocks.map((block, index) => {
    return block.length > 4 ? (
      index === 1 ? (
        <Row gutter={[22, 20]} padding_top={20}>
          <Col span={12}>
            <Row gutter={[22, 20]}>
              {block.slice(1).map((item) => (
                <Col key={item.id}>
                  <Item item={item} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={12}>
            <Item item={block[0]} large={true} />
          </Col>
        </Row>
      ) : (
        <Row gutter={[22, 20]} padding_top={20}>
          <Col span={12}>
            <Item item={block[0]} large={true} />
          </Col>
          <Col span={12}>
            <Row gutter={[22, 20]}>
              {block.slice(1).map((item) => (
                <Col key={item.id}>
                  <Item item={item} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )
    ) : (
      <Row gutter={[22, 20]} padding_top={20}>
        {block.map((item) => (
          <Col key={item.id}>
            <Item item={item} />
          </Col>
        ))}
      </Row>
    );
  });
};

export default memo(ProductsList);
