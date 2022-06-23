import { memo, useState } from 'react';
import { useReactiveVar } from '@apollo/client';

import { Footer } from '@shared/Footer';
import useRandomInfo from '@root/src/hooks/useRandomInfo';
import { searchKeywordVar } from '@configs/client-cache';
import { Carousel } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import TopArtwork from './TopArtwork';
import Content from '../../shared/CreatorContent';

const PRODUCTS_LIMIT = 15;
const ARTWORKS_LIMIT = 24;

export const ExplorePage = () => {
  const [firstSearch, setFirstSearch] = useState({ marketplace: true, artwork: true });
  const [productsOffset, setProductsOffset] = useState(0);
  const [artworksOffset, setArtworksOffset] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [artworksList, setArtworksList] = useState([]);
  const keyword = useReactiveVar(searchKeywordVar);

  const {
    carouselArtworks,
    isProductsEnd,
    isArtworksEnd,
    loading,
    loadMoreArtworks,
    loadMoreProducts,
  } = useRandomInfo({
    keyword,
    productsOffset,
    artworksOffset,
    productsLimit: PRODUCTS_LIMIT,
    artworksLimit: ARTWORKS_LIMIT,
    getRandomProductsCompleted: ({ getRandomProducts }) => {
      if (keyword && firstSearch.marketplace) {
        setFirstSearch({ ...firstSearch, marketplace: false });
        setProductsList(getRandomProducts);
        setProductsOffset(0 + PRODUCTS_LIMIT);
      } else {
        setProductsList([...productsList, ...getRandomProducts]);
        setProductsOffset(productsOffset + PRODUCTS_LIMIT);
      }
    },
    getRandomArtworksCompleted: ({ getRandomArtworks }) => {
      if (keyword && firstSearch.artwork) {
        setFirstSearch({ ...firstSearch, artwork: false });
        setArtworksList(getRandomArtworks);
        setArtworksOffset(0 + ARTWORKS_LIMIT);
      } else {
        setArtworksList([...artworksList, ...getRandomArtworks]);
        setArtworksOffset(artworksOffset + ARTWORKS_LIMIT);
      }
    },
  });

  if (loadMoreProducts && !productsOffset) {
    return <GlobalSpinner />;
  }

  return (
    <>
      <Carousel autoplay effect='fade'>
        {carouselArtworks.map((item) => (
          <TopArtwork key={item.artworkId} username={item.username} thumbnail={item.thumbnailUri} />
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
