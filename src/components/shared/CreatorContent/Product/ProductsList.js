import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import useClientWidth from '@app/hooks/useClientWidth';
import { Col, Row } from '@ui-kit';
import Product from './Product';

const Item = memo(({ item, large }) => (
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
));

const Block = memo(({ block, padding_top = 0 }) => (
  <Row gutter={[22, 20]} padding_top={padding_top}>
    {block.map((item) => (
      <Col key={item.productId}>
        <Item item={item} />
      </Col>
    ))}
  </Row>
));

const BlockLarge = memo(({ block, right = false }) => {
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
});

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

const Blocks = memo(({ productsList }) => {
  const blocks = useMemo(() => chunk(productsList, 5), [productsList]);

  return blocks.map((block, i) =>
    block.length > 4 ? (
      <BlockLarge key={i} block={block} right={i % 2 === 1} />
    ) : (
      <Block key={i} block={block} padding_top={20} />
    ),
  );
});

const ProductsList = ({ productsList = [] }) => {
  const { pathname } = useLocation();
  console.log(pathname);
  const isProfile = useMemo(() => pathname.includes('/profile'), [pathname]);
  const width = useClientWidth();
  if (width < 1438) {
    return <Block block={productsList} />;
  }

  return isProfile || productsList.length < 5 ? (
    <Block block={productsList} />
  ) : (
    <Blocks productsList={productsList} />
  );
};

export default memo(ProductsList);
