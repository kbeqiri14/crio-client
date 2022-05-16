import { memo } from 'react';
import styled from 'styled-components';

import { Tabs } from '@ui-kit';
import LoadMoreButton from './LoadMoreButton';
import PostersList from './PostersList';
import ProductsList from './ProductsList';

const Wrapper = styled('div')`
  max-width: 1394px;
  @media (max-width: 1393px) {
    max-width: 1040px;
  }
  @media (max-width: 1039px) {
    max-width: 686px;
  }
  @media (max-width: 685px) {
    max-width: 332px;
  }
  margin: auto;
  padding: 40px 0;
`;

const { TabPane } = Tabs;

const tabs = {
  MARKETPLACE: 'Marketplace',
  ARTWORK: 'Artwork',
};

export const Content = ({ visibleLoadMore, loading, loadMore, productsList, postersList }) => {
  return (
    <Wrapper>
      <Tabs>
        <TabPane key={tabs.MARKETPLACE} tab={tabs.MARKETPLACE}>
          <ProductsList productsList={productsList} />
          <LoadMoreButton visible={visibleLoadMore} loading={loading} onClick={loadMore} />
        </TabPane>
        <TabPane key={tabs.ARTWORK} tab={tabs.ARTWORK}>
          <PostersList postersList={postersList} />
          <LoadMoreButton visible={visibleLoadMore} loading={loading} onClick={loadMore} />
        </TabPane>
      </Tabs>
    </Wrapper>
  );
};

export default memo(Content);
