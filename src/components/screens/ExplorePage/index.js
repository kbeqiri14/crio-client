import { memo, useState } from 'react';

import { Footer } from '@shared/Footer';
import { useRandomArtworks } from '@root/src/hooks/useRandomArtworks';
import { useRandomProducts } from '@root/src/hooks/useRandomProducts';
import { Carousel } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import TopPoster from './TopPoster';
import Content from '../../shared/CreatorContent';

export const ExplorePage = () => {
  const [offset, setOffset] = useState(0);
  const [postersList, setPostersList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const {
    carouselPosters,
    isEnd: isArtworkEnd,
    loading: loadingArtworks,
    loadMore: loadMoreArtworks,
  } = useRandomArtworks(({ getRandomArtworks }) => {
    setPostersList([...postersList, ...getRandomArtworks]);
    setOffset(offset + 16);
  }, offset);

  const {
    isEnd: isProductEnd,
    loading: loadingProducts,
    loadMore: loadMoreProducts,
  } = useRandomProducts(({ getRandomProducts }) => {
    setProductsList([...productsList, ...getRandomProducts]);
    setOffset(offset + 16);
  }, offset);

  if (loadMoreProducts && !offset) {
    return <GlobalSpinner />;
  }

  return (
    <>
      <Carousel autoplay effect='fade'>
        {carouselPosters.map((item) => (
          <TopPoster key={item.id} username={item.name} thumbnail={item.thumbnailUri} />
        ))}
      </Carousel>
      <Content
        visibleLoadMoreArtworks={!isArtworkEnd && offset}
        loadingArtworks={loadingArtworks}
        loadMoreArtworks={loadMoreArtworks}
        postersList={postersList}
        visibleLoadMoreProducts={!isProductEnd && offset}
        loadingProducts={loadingProducts}
        loadMoreProducts={loadMoreProducts}
        productsList={productsList}
      />
      <Footer />
    </>
  );
};

export default memo(ExplorePage);
