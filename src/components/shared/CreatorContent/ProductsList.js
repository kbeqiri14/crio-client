import { memo, useMemo } from 'react';

import { Col, Row } from '@ui-kit';
import Product from './Product';

const Item = ({ item, large }) => (
  <Product
    providerType={item?.providerType}
    providerUserId={item?.providerUserId}
    avatar={item?.avatar}
    userId={item?.userId}
    username={item?.username}
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

const Block = ({ block, padding_top = 0 }) => (
  <Row gutter={[22, 20]} padding_top={padding_top}>
    {block.map((item) => (
      <Col key={item.id}>
        <Item item={item} />
      </Col>
    ))}
  </Row>
);

const BlockLarge = ({ block, right = false }) => {
  const item = block.shift();
  return (
    <Row gutter={[22, 20]} padding_top={20}>
      {right && (
        <Col span={12}>
          <Block block={block} />
        </Col>
      )}
      <Col span={12}>
        <Item item={item} large={true} />
      </Col>
      {!right && (
        <Col span={12}>
          <Block block={block} />
        </Col>
      )}
    </Row>
  );
};

const ProductsList = ({ productsList = [] }) => {
  const blocks = useMemo(
    () => new Array(3).fill('').map((_, i) => productsList.slice(i * 5, (i + 1) * 5)),
    [productsList],
  );

  return blocks.map((block, i) =>
    block.length > 4 ? (
      <BlockLarge key={i} block={block} right={i === 1} />
    ) : (
      <Block key={i} block={block} padding_top={20} />
    ),
  );
};

export default memo(ProductsList);
