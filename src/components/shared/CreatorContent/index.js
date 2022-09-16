import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@configs/history';
import { Col, Row, Tabs, Text } from '@ui-kit';
import EmptyState from '@shared/EmptyState';
import LoadMoreButton from './LoadMoreButton';
import ArtworksList from './Artwork/ArtworksList';
import ProductsList from './Product/ProductsList';
import TagButton from '@ui-kit/Custom/TagButton';

const Wrapper = styled('div')`
  max-width: 1438px;
  margin: auto;
  padding: 40px 22px;

  @media (max-width: 1437px) {
    max-width: 1084px;
  }
  @media (max-width: 1083px) {
    max-width: 730px;
  }
  @media (max-width: 729px) {
    max-width: 376px;
  }
`;

const { TabPane } = Tabs;

const tabs = {
  MARKETPLACE: 'Marketplace',
  ARTWORK: 'Content',
};

const productTabs = [
  { name: 'eBook', color: '#00A0FF', width: '75' },
  { name: 'Comics', color: '#CF04A3', width: '78' },
  { name: 'Artwork', color: '#A304CB', width: '78' },
  { name: 'Art Tools % Assets', color: '#4C9A08', width: '150' },
  { name: 'Game Assets', color: '#00A0FF', width: '118' },
  { name: 'Software', color: '#CF04A3', width: '87' },
  { name: 'Photos', color: '#A304CB', width: '72' },
  { name: 'Video', color: '#4C9A08', width: '65' },
  { name: 'Guids/ Documents', color: '#00A0FF', width: '157' },
  { name: 'Tamplates', color: '#CF04A3', width: '100' },
];

const contentTabs = ['All', 'Animation', 'Illustration', 'Branding', 'Product Design'];

export const Content = ({
  isProfile,
  visibleLoadMoreProducts,
  visibleLoadMoreArtworks,
  productsCount,
  artworksCount,
  productsList,
  artworksList,
  loading,
  loadMoreProducts,
  loadMoreArtworks,
  initialPolling,
}) => {
  const { pathname } = useLocation(tabs.MARKETPLACE);
  const [activeKey, setActiveKey] = useState(
    pathname.includes('/artworks') ? tabs.ARTWORK : tabs.MARKETPLACE,
  );
  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);
  const isProfilePage = useMemo(() => pathname.includes('/profile'), [pathname]);

  const onTabClick = useCallback(
    (key) => {
      setActiveKey(key);
      if (key === tabs.MARKETPLACE) {
        history.push(isProfilePage ? `/profile/${username}` : '/');
      } else {
        history.push(isProfilePage ? `/profile/artworks/${username}` : `/artworks`);
      }
    },
    [isProfilePage, username],
  );

  const props = isProfilePage
    ? {
        username,
        isProfile,
        isCreator: true,
      }
    : { isNoResult: true };

  return (
    <Wrapper>
      <Tabs activeKey={activeKey} onTabClick={onTabClick}>
        <TabPane key={tabs.MARKETPLACE} tab={tabs.MARKETPLACE}>
          {!isProfilePage && (
            <Row gutter={[12, 12]} padding_bottom={20} padding_left={40}>
              {productTabs.map((item) => (
                <Col>
                  <TagButton b_color={item.color} width={item.width}>
                    {item.name}
                  </TagButton>
                </Col>
              ))}
            </Row>
          )}
          {!loading && !productsCount && !productsList?.length && (
            <EmptyState {...props} isMarketplace={true} />
          )}
          <ProductsList productsList={productsList} loading={initialPolling && loading} />
          <LoadMoreButton
            visible={visibleLoadMoreProducts}
            loading={loading}
            onClick={loadMoreProducts}
          />
        </TabPane>
        <TabPane key={tabs.ARTWORK} tab={tabs.ARTWORK}>
          {!isProfilePage && (
            <Row gutter={[36]} padding_bottom={30} padding_left={40}>
              {contentTabs.map((item) => (
                <Col>
                  <Text level={3} color='dark25'>
                    {item}
                  </Text>
                </Col>
              ))}
            </Row>
          )}
          {!loading && !artworksCount && !artworksList?.length && <EmptyState {...props} />}
          <ArtworksList artworksList={artworksList} loading={initialPolling && loading} />
          <LoadMoreButton
            visible={visibleLoadMoreArtworks}
            loading={loading}
            onClick={loadMoreArtworks}
          />
        </TabPane>
      </Tabs>
    </Wrapper>
  );
};

export default memo(Content);
