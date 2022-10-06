import { memo, useEffect, useMemo, useState } from 'react';
import { useReactiveVar } from '@apollo/client';

import { Meta } from '@shared/Meta';
import useRandomInfo from '@root/src/hooks/useRandomInfo';
import { searchKeywordVar, refetchArtworkVar, refetchMarketplaceVar } from '@configs/client-cache';
import { Carousel, GlobalSpinner } from '@ui-kit';
import TopProducts from './TopProducts';
import Content from '../../shared/CreatorContent';
import useCategories from '@app/hooks/useCategories';

const PRODUCTS_LIMIT = 15;
const ARTWORKS_LIMIT = 24;

export const ExplorePage = () => {
  const [productsOffset, setProductsOffset] = useState(0);
  const [artworksOffset, setArtworksOffset] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [artworksList, setArtworksList] = useState([]);

  useCategories();

  const keyword = useReactiveVar(searchKeywordVar);
  const refetchArtwork = useReactiveVar(refetchArtworkVar);
  const refetchMarketplace = useReactiveVar(refetchMarketplaceVar);

  const showLoader = useMemo(
    () => refetchArtwork || refetchMarketplace,
    [refetchArtwork, refetchMarketplace],
  );

  const { topProducts, isProductsEnd, isArtworksEnd, loading, loadMoreArtworks, loadMoreProducts } =
    useRandomInfo({
      keyword,
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
      if (keyword) {
        refetchArtworkVar(true);
        refetchMarketplaceVar(true);
      }
      searchKeywordVar('');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (showLoader || (loadMoreProducts && !productsOffset)) {
    return <GlobalSpinner />;
  }

  return (
    <>
      <Meta title='Explore' description='Crio - Explore' />
      <Carousel autoplay effect='fade'>
        {topProducts.map((item) => (
          <TopProducts key={item.productId} {...item} />
        ))}
      </Carousel>
      <Content
        visibleLoadMoreProducts={!isProductsEnd && productsOffset}
        visibleLoadMoreArtworks={!isArtworksEnd && artworksOffset}
        productsList={productsList}
        artworksList={artworksList}
        loading={loading}
        loadMoreProducts={loadMoreProducts}
        loadMoreArtworks={loadMoreArtworks}
      />
    </>
  );
};

export default memo(ExplorePage);
