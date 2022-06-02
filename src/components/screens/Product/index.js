import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getProduct } from '@app/graphql/queries/products.query';
import NotFound from '@shared/NotFound';
import { ReactComponent as NotFoundUser } from '@svgs/not-found.svg';
import { Col, Row } from '@ui-kit';
import defaultCover from '@images/product.png';
import Content from '../Artwork/Content';
import MoreProductsSection from './MoreProductsSection';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  > div {
    min-width: 1040px;
    max-width: 1040px;
  }
`;

export const Product = () => {
  const { user } = useLoggedInUser();
  const { pathname } = useLocation();
  const productId = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const { data, loading } = useQuery(getProduct, {
    variables: { productId },
  });
  const product = useMemo(
    () =>
      data?.getProduct
        ? {
            ...data.getProduct,
            isProduct: true,
            thumbnail: data.getProduct.thumbnail
              ? `https://crio-in-staging-bucket.s3.us-west-2.amazonaws.com/${data.getProduct.userId}/products/thumbnail-${data.getProduct.thumbnail}`
              : defaultCover,
          }
        : {},
    [data?.getProduct],
  );
  const isLocked = useMemo(() => {
    if (user.isCreator || product.accessibility === 'everyone') {
      return false;
    }
    return user.isSubscribed ? !user.followings?.includes(product.userId) : true;
  }, [user.isCreator, user.isSubscribed, user.followings, product.accessibility, product.userId]);

  if (loading) {
    return (
      <Wrapper>
        <Row gutter={[0, 40]}>
          <Col span={24}>
            <Skeleton round active title={{ width: '100%' }} paragraph={null} />
            <Skeleton
              round
              active
              avatar={{ shape: 'circle', size: 33 }}
              title={{ width: '100%' }}
              paragraph={null}
            />
          </Col>
          <Col span={24} align='center'>
            <Skeleton
              active
              avatar={{ shape: 'square', size: 800 }}
              title={false}
              paragraph={false}
            />
          </Col>
        </Row>
      </Wrapper>
    );
  }
  if (!Object.keys(product).length) {
    return <NotFound text='Product is not found' icon={<NotFoundUser />} />;
  }
  return (
    <>
      <Content videoInfo={product} isLocked={isLocked} />
      <MoreProductsSection videoInfo={product} />
    </>
  );
};

export default memo(Product);
