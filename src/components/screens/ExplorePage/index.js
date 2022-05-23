import { memo, useState } from 'react';

import { Footer } from '@shared/Footer';
import useRandomInfo from '@root/src/hooks/useRandomInfo';
import { Carousel } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import TopPoster from './TopPoster';
import Content from '../../shared/CreatorContent';

const PRODUCTS_LIMIT = 15;
const ARTWORKS_LIMIT = 16;

export const ExplorePage = () => {
  const [productsOffset, setProductsOffset] = useState(0);
  const [artworksOffset, setArtworksOffset] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [artworksList, setArtworksList] = useState([]);

  const {
    carouselPosters,
    isProductsEnd,
    isArtworksEnd,
    loading,
    loadMoreArtworks,
    loadMoreProducts,
  } = useRandomInfo({
    productsOffset,
    artworksOffset,
    productsLimit: PRODUCTS_LIMIT,
    artworksLimit: ARTWORKS_LIMIT,
    getRandomProductsCompleted: ({ getRandomProducts }) => {
      setProductsList([...productsList, ...getRandomProducts]);
      setProductsOffset(productsOffset + PRODUCTS_LIMIT);
    },
    getRandomArtworksCompleted: ({ getRandomArtworks }) => {
      setArtworksList([...artworksList, ...getRandomArtworks]);
      setArtworksOffset(artworksOffset + ARTWORKS_LIMIT);
    },
  });

  if (loadMoreProducts && !productsOffset) {
    return <GlobalSpinner />;
  }

  return (
    <>
      <Carousel autoplay effect='fade'>
        {carouselPosters.map((item) => (
          <TopPoster key={item.id} username={item.username} thumbnail={item.thumbnailUri} />
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
      <Footer />
    </>
  );
};

export default memo(ExplorePage);
