import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Footer } from '@shared/Footer';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { useRandomArtworks } from '@root/src/hooks/useRandomArtwork';
import { Button, Carousel, Col, Row, Tabs } from '@ui-kit';

import TopPoster from './TopPoster';
import Poster from './Poster';

const ExplorePageWrapper = styled('div')`
  // background: ${(props) => props.theme.colors.dark100};
  max-width: 1440px;
  margin: auto;
  margin-top: 40px;
`;

const { TabPane } = Tabs;

const tabs = {
  // Marketplace: '1',
  ARTWORK: 'Artwork',
};

export const ExplorePage = () => {
  const [offset, setOffset] = useState(0);
  const [postersList, setPostersList] = useState([]);
  const { user } = useLoggedInUser();

  const { carouselPosters, isEnd, loading, loadMore } = useRandomArtworks(
    ({ getRandomArtworks }) => {
      setPostersList([...postersList, ...getRandomArtworks]);
      setOffset(offset + 16);
    },
    offset,
  );

  const isLock = useCallback(
    (userId, accessibility, name) => {
      if (accessibility === 'everyone') {
        return true;
      }
      console.log(user.followings, userId, name, user.followings?.includes(userId));
      return user.isSubscribed ? user.followings?.includes(userId) : false;
    },
    [user.followings, user.isSubscribed],
  );

  if (loading && !offset) {
    return <GlobalSpinner />;
  }

  return (
    <>
      <Carousel autoplay>
        {carouselPosters.map((item) => (
          <TopPoster key={item.id} username={item?.name} thumbnail={item?.thumbnailUri} />
        ))}
      </Carousel>
      <ExplorePageWrapper>
        <Tabs>
          <TabPane key={tabs.ARTWORK} tab={tabs.ARTWORK}>
            <Row justify='center' gutter={[24, 24]}>
              {postersList.map((item) => (
                <Col key={item.id}>
                  <Poster
                    providerType={item?.providerType}
                    providerUserId={item?.providerUserId}
                    avatar={item?.avatar}
                    src={item?.thumbnailUri}
                    userId={item?.userId}
                    username={item?.name}
                    artworkId={item?.artworkId}
                    title={item?.title}
                    description={item?.description}
                    videoUri={item?.videoUri}
                    isLock={!isLock(item.userId, item.accessibility, item?.name)}
                  />
                </Col>
              ))}
            </Row>
            {!isEnd && offset && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
                <Button white='true' loading={loading} onClick={loadMore} width={168}>
                  LOAD MORE
                </Button>
              </div>
            )}
          </TabPane>
        </Tabs>
      </ExplorePageWrapper>
      <Footer />
    </>
  );
};

export default memo(ExplorePage);
