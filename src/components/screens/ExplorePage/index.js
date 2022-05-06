import { memo, useState } from 'react';

import { Footer } from '@shared/Footer';
import { useRandomArtworks } from '@root/src/hooks/useRandomArtwork';
import { Button, Carousel, Col, Row, Tabs } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import TopPoster from './TopPoster';
import PostersList from './PostersList';

const { TabPane } = Tabs;

const tabs = {
  ARTWORK: 'Artwork',
};

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
      <Tabs>
        <TabPane key={tabs.ARTWORK} tab={tabs.ARTWORK}>
          <Row justify='center' gutter={[0, 40]}>
            <Col>
              <PostersList postersList={postersList} />
            </Col>
            {!isEnd && offset && (
              <Col>
                <Button white='true' loading={loading} onClick={loadMore} width={168}>
                  LOAD MORE
                </Button>
              </Col>
            )}
          </Row>
        </TabPane>
      </Tabs>
      <Footer />
    </>
  );
};

export default memo(ExplorePage);
