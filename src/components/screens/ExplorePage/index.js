import { memo, useState } from 'react';

import { Footer } from '@shared/Footer';
import { useRandomArtworks } from '@root/src/hooks/useRandomArtwork';
import { Carousel } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import TopPoster from './TopPoster';
import Content from '../../shared/CreatorContent';

export const ExplorePage = () => {
  const [offset, setOffset] = useState(0);
  const [postersList, setPostersList] = useState([]);

  const { carouselPosters, isEnd, loading, loadMore } = useRandomArtworks(
    ({ getRandomArtworks }) => {
      setPostersList([...postersList, ...getRandomArtworks]);
      setOffset(offset + 16);
    },
    offset,
  );

  if (loading && !offset) {
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
        visibleLoadMore={!isEnd && offset}
        loading={loading}
        loadMore={loadMore}
        productsList={postersList}
        postersList={postersList}
      />
      <Footer />
    </>
  );
};

export default memo(ExplorePage);
