import { memo, useState } from 'react';

import { Footer } from '@shared/Footer';
import { useRandomArtworks } from '@root/src/hooks/useRandomArtworks';
import { useRandomProducts } from '@root/src/hooks/useRandomProducts';
import { Carousel } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import TopPoster from './TopPoster';
import Content from '../../shared/CreatorContent';

export const ExplorePage = () => {
  const [artworksOffset, setArtworksOffset] = useState(0);
  const [productsOffset, setProductsOffset] = useState(0);
  const [postersList, setPostersList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const {
    carouselPosters,
    isEnd: isArtworkEnd,
    loading: loadingArtworks,
    loadMore: loadMoreArtworks,
  } = useRandomArtworks(({ getRandomArtworks }) => {
    setPostersList([...postersList, ...getRandomArtworks]);
    setArtworksOffset(artworksOffset + 16);
  }, artworksOffset);

  const {
    isEnd: isProductEnd,
    loading: loadingProducts,
    loadMore: loadMoreProducts,
  } = useRandomProducts(({ getRandomProducts }) => {
    setProductsList([...productsList, ...getRandomProducts]);
    setProductsOffset(productsOffset + 15);
  }, productsOffset);

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
        visibleLoadMoreArtworks={!isArtworkEnd && artworksOffset}
        loadingArtworks={loadingArtworks}
        loadMoreArtworks={loadMoreArtworks}
        postersList={postersList}
        visibleLoadMoreProducts={!isProductEnd && productsOffset}
        loadingProducts={loadingProducts}
        loadMoreProducts={loadMoreProducts}
        productsList={productsList}
      />
      <Footer />
    </>
  );
};

export default memo(ExplorePage);
