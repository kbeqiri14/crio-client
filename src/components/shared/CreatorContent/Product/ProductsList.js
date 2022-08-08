import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';
import styled from 'styled-components';

import useClientWidth from '@app/hooks/useClientWidth';
import { Col, Row } from '@ui-kit';
import Product from './Product';

export const Wrapper = styled('div')`
  width: 332px;
  height: 332px;
  border: 1px solid ${(props) => props.theme.colors.dark50};
  border-radius: 30px;
  margin-bottom: 8px;
  .ant-skeleton {
    width: 100%;
    .ant-skeleton-image {
      width: 330px;
      height: 245px;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      border-bottom: 1px solid ${(props) => props.theme.colors.dark50};
    }
    .ant-skeleton-content {
      padding: 0 20px;
      .ant-skeleton-paragraph {
        margin: 10px 0 0;
      }
    }
  }
`;

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

const ProductsList = ({ productsList = [], loading }) => {
  const dummyArray = new Array(6).fill();
  const { pathname } = useLocation();
  const isProfile = useMemo(() => pathname.includes('/profile'), [pathname]);
  const width = useClientWidth();
  if (width < 1438) {
    return <Block block={productsList} />;
  }

  if (loading) {
    return (
      <Row gutter={22}>
        {dummyArray.map(() => (
          <Col>
            <Wrapper>
              <Skeleton.Image active />;
              <Skeleton active title={{ width: '100%' }} paragraph={{ rows: 1, width: '100%' }} />
            </Wrapper>
            <Skeleton active avatar title={{ width: '100%' }} paragraph={{ rows: 0 }} />
          </Col>
        ))}
      </Row>
    );
  }

  return isProfile || productsList.length < 5 ? (
    <Block block={productsList} />
  ) : (
    <Blocks productsList={productsList} />
  );
};

export default memo(ProductsList);
