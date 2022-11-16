import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import { useQuery } from '@apollo/client';

import history from '@configs/history';
import { getTopProducts } from '@app/graphql/queries/products.query';
import { Meta } from '@shared/Meta';
import useRandomInfo from '@root/src/hooks/useRandomInfo';
import {
  searchProductCategoryVar,
  searchArtworkCategoryVar,
  searchKeywordVar,
  refetchArtworkVar,
  refetchMarketplaceVar,
} from '@configs/client-cache';
import { Button, Carousel, Col, Divider, GlobalSpinner, Row, Text, Title } from '@ui-kit';
import Circle from '@ui-kit/Custom/Circle';
import TopProducts from './TopProducts';
import Content from '../../shared/CreatorContent';

const Wrapper = styled('div')`
  background: #202020;
  max-width: 1312px;
  border-radius: 8px;
  padding: 40px;
  margin: auto;
  margin-top: 20px;
`;

const PRODUCTS_LIMIT = 15;
const ARTWORKS_LIMIT = 24;

const creativeInfo = [
  <>Offer digital products and exclusive content</>,
  <>
    Get <strong>discovered</strong> and generate <strong>passive income</strong> immediately through
    subscriptions & eCommerce
  </>,
  <>
    Crio is <strong>free</strong> for creators to join!
  </>,
];

const fansInfo = [
  <>
    Support <strong>multiple creators</strong> with <strong>one easy subscription</strong>
  </>,
  <>Gain access to all their free products and exclusive content</>,
];

const Info = ({ info }) => (
  <Row gutter={[0, 30]} padding_top={20}>
    {info.map((item, index) => (
      <Col span={24}>
        <Row align='middle' gutter={20}>
          <Col>
            <Circle>{index + 1}</Circle>
          </Col>
          <Col>
            <Text level={3} color='dark25' max_width={400}>
              {item}
            </Text>
          </Col>
        </Row>
      </Col>
    ))}
  </Row>
);

export const ExplorePage = () => {
  const [productsOffset, setProductsOffset] = useState(0);
  const [artworksOffset, setArtworksOffset] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [artworksList, setArtworksList] = useState([]);

  const keyword = useReactiveVar(searchKeywordVar);
  const productCategoryId = useReactiveVar(searchProductCategoryVar);
  const artworkCategoryId = useReactiveVar(searchArtworkCategoryVar);
  const refetchArtwork = useReactiveVar(refetchArtworkVar);
  const refetchMarketplace = useReactiveVar(refetchMarketplaceVar);

  const showLoader = useMemo(
    () => refetchArtwork || refetchMarketplace,
    [refetchArtwork, refetchMarketplace],
  );

  const { data: topProducts, loading } = useQuery(getTopProducts);

  const {
    isProductsEnd,
    isArtworksEnd,
    loadingProducts,
    loadingArtworks,
    loadingMoreProducts,
    loadingMoreArtworks,
    loadMoreArtworks,
    loadMoreProducts,
  } = useRandomInfo({
    keyword,
    productCategoryId,
    artworkCategoryId,
    productsOffset: showLoader ? 0 : productsOffset,
    artworksOffset: showLoader ? 0 : artworksOffset,
    productsLimit: PRODUCTS_LIMIT,
    artworksLimit: ARTWORKS_LIMIT,
    getRandomProductsCompleted: ({ getRandomProducts }) => {
      if (refetchMarketplace) {
        refetchMarketplaceVar(false);
        setProductsList(getRandomProducts);
        setProductsOffset(0 + PRODUCTS_LIMIT);
      } else {
        setProductsList([...productsList, ...getRandomProducts]);
        setProductsOffset(productsOffset + PRODUCTS_LIMIT);
      }
    },
    getRandomArtworksCompleted: ({ getRandomArtworks }) => {
      if (refetchArtwork) {
        refetchArtworkVar(false);
        setArtworksList(getRandomArtworks);
        setArtworksOffset(0 + ARTWORKS_LIMIT);
      } else {
        setArtworksList([...artworksList, ...getRandomArtworks]);
        setArtworksOffset(artworksOffset + ARTWORKS_LIMIT);
      }
    },
  });

  useEffect(
    () => () => {
      if (keyword || productCategoryId || artworkCategoryId) {
        refetchArtworkVar(true);
        refetchMarketplaceVar(true);
      }
      searchKeywordVar('');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (loading) {
    return <GlobalSpinner />;
  }

  return (
    <>
      <Meta title='Explore' description='Crio - Explore' />
      <Wrapper>
        <Carousel autoplay effect='fade'>
          {topProducts?.getTopProducts?.map((item) => (
            <TopProducts key={item.productId} {...item} />
          ))}
        </Carousel>
        <Divider />
        <Row justify='space-between' gutter={[40, 40]} padding_top={16}>
          <Col max_width={510}>
            <Title level={6}>For Creatives</Title>
            <Info info={creativeInfo} />
          </Col>
          <Col max_width={510}>
            <Title level={6}>For Fans</Title>
            <Info info={fansInfo} />
          </Col>
        </Row>
        <Row justify='center' padding_top={40}>
          <Col>
            <Button white='true' onClick={() => history.push('/features')}>
              LEARN MORE
            </Button>
          </Col>
        </Row>
      </Wrapper>
      <Content
        visibleLoadMoreProducts={!isProductsEnd && productsOffset}
        visibleLoadMoreArtworks={!isArtworksEnd && artworksOffset}
        productsList={productsList}
        artworksList={artworksList}
        loadingProducts={loadingProducts}
        loadingArtworks={loadingArtworks}
        loadingMoreProducts={loadingMoreProducts}
        loadingMoreArtworks={loadingMoreArtworks}
        loadMoreProducts={loadMoreProducts}
        loadMoreArtworks={loadMoreArtworks}
      />
    </>
  );
};

export default memo(ExplorePage);
