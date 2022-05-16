import { memo, useState } from 'react';
import styled from 'styled-components';

import { Footer } from '@shared/Footer';
import { useRandomArtworks } from '@root/src/hooks/useRandomArtwork';
import { Button, Carousel, Col, Row, Tabs } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import TopPoster from './TopPoster';
import PostersList from './PostersList';
import ProductsList from './ProductsList';

const ShadowWrapper = styled('div')`
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);
    height: 294px;
    width: 100%;
    background-image: linear-gradient(180deg, rgba(43, 43, 43, 0) 0%, #2b2b2b 78.12%);
  }
`;

const { TabPane } = Tabs;

const tabs = {
  MARKETPLACE: 'Marketplace',
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
        <TabPane key={tabs.MARKETPLACE} tab={tabs.MARKETPLACE}>
          <Row justify='center' gutter={[0, 40]}>
            <Col span={24}>
              <ProductsList productsList={postersList} />
            </Col>
            {!isEnd && offset && (
              <Col span={24} align='center'>
                <ShadowWrapper>
                  <Button white='true' loading={loading} onClick={loadMore} width={168}>
                    LOAD MORE
                  </Button>
                </ShadowWrapper>
              </Col>
            )}
          </Row>
        </TabPane>
        <TabPane key={tabs.ARTWORK} tab={tabs.ARTWORK}>
          <Row justify='center' gutter={[0, 40]}>
            <Col span={24}>
              <PostersList postersList={postersList} />
            </Col>
            {!isEnd && offset && (
              <Col span={24} align='center'>
                <ShadowWrapper>
                  <Button white='true' loading={loading} onClick={loadMore} width={168}>
                    LOAD MORE
                  </Button>
                </ShadowWrapper>
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
