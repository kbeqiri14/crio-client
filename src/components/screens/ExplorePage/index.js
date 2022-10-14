import { memo, useEffect, useMemo, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useQuery } from '@apollo/client';

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
import { Carousel, GlobalSpinner } from '@ui-kit';
import TopProducts from './TopProducts';
import Content from '../../shared/CreatorContent';

const PRODUCTS_LIMIT = 15;
const ARTWORKS_LIMIT = 24;

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
      <Carousel autoplay effect='fade'>
        {topProducts?.getTopProducts?.map((item) => (
          <TopProducts key={item.productId} {...item} />
        ))}
      </Carousel>
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
