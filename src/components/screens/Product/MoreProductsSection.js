import { memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { getMoreProducts } from '@app/graphql/queries/products.query';
import ProductsList from '@root/src/components/shared/CreatorContent/ProductsList';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Col, Row, Text } from '@ui-kit';

const UserMoreProductsWrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  background-color: #202020;
  > div {
    max-width: 1040px;
  }
`;

const MoreProductsWrapper = styled('div')`
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

export const MoreProductsSection = ({ videoInfo }) => {
  const { pathname } = useLocation();
  const { setVideoInfo } = usePresentation();

  const { data } = useQuery(getMoreProducts, {
    fetchPolicy: 'no-cache',
    variables: { params: { userId: videoInfo.userId } },
  });

  const hide = useCallback(() => {
    setVideoInfo({});
    window.history.replaceState('', '', pathname);
  }, [pathname, setVideoInfo]);

  return (
    <>
      {data?.getMoreProducts?.userProducts?.length && (
        <UserMoreProductsWrapper>
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Row justify='space-between' align='middle'>
                <Col>
                  <Text level={2}>More by {videoInfo.name}</Text>
                </Col>
                <Col>
                  <Link to={`/profile/${videoInfo.name}`} onClick={hide}>
                    <Text level={2} color='primary'>
                      View profile
                    </Text>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col>
              <ProductsList productsList={data?.getMoreProducts.userProducts} />
            </Col>
          </Row>
        </UserMoreProductsWrapper>
      )}
      {data?.getMoreProducts?.products?.length && (
        <MoreProductsWrapper>
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Text level={2}>Other marketplace products</Text>
            </Col>
            <Col>
              <ProductsList productsList={data?.getMoreProducts.products} />
            </Col>
          </Row>
        </MoreProductsWrapper>
      )}
    </>
  );
};

export default memo(MoreProductsSection);
