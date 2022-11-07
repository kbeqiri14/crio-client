import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Skeleton } from 'antd';
import styled from 'styled-components';
import { useQuery, useReactiveVar } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getProduct } from '@app/graphql/queries/products.query';
import { loggedInUserLoadingVar } from '@configs/client-cache';
import { PRODUCTS } from '@configs/constants';
import { getThumbnail } from '@utils/helpers';
import { Col, Row } from '@ui-kit';
import Broadcast from '@screens/EditProduct/_partials/Broadcast';
import defaultCover from '@images/product.png';
import Content from '../Artwork/Content';
import MoreProductsSection from './MoreProductsSection';
import EmptyState from '@shared/EmptyState';

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
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);
  const { pathname, search } = useLocation();
  const productId = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);
  const { show_banner } = queryString.parse(search);
  const [visibleBroadcast, setVisibleBroadcast] = useState(show_banner);

  const hideBroadcast = useCallback(() => setVisibleBroadcast(false), []);

  const { data, loading } = useQuery(getProduct, {
    variables: { productId },
  });

  const showBanner = useMemo(
    () => !loggedInUserLoading && !user.id && visibleBroadcast,
    [loggedInUserLoading, user.id, visibleBroadcast],
  );
  const product = useMemo(
    () =>
      data?.getProduct
        ? {
            ...data.getProduct,
            isProduct: true,
            thumbnail: data.getProduct.thumbnail
              ? getThumbnail(
                  PRODUCTS,
                  data.getProduct.userId,
                  `thumbnail-${data.getProduct.thumbnail}`,
                )
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
    return <EmptyState isNotFound={true} isMarketplace={true} />;
  }
  return (
    <>
      {showBanner && (
        <Broadcast
          message='Please check your email (including spam folder) to receive the product/service. You can also register on Crio to download products directly!'
          hideBroadcast={hideBroadcast}
        />
      )}
      <Content info={product} isLocked={isLocked} />
      <MoreProductsSection info={product} />
    </>
  );
};

export default memo(Product);
