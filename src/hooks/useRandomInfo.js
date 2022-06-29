import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

import { randomArtworkNumberVar, randomProductNumberVar } from '@configs/client-cache';
import { getRandomProducts } from '@app/graphql/queries/products.query';
import { getRandomArtworks, getRandomInfo } from '@app/graphql/queries/artworks.query';

const useRandomInfo = ({
  keyword,
  productsOffset = 0,
  artworksOffset = 0,
  productsLimit,
  artworksLimit,
  getRandomProductsCompleted,
  getRandomArtworksCompleted,
}) => {
  const [loading, setLoading] = useState(true);
  const countArtwork = useReactiveVar(randomArtworkNumberVar);
  const countProduct = useReactiveVar(randomProductNumberVar);

  const [requestRandomProducts] = useLazyQuery(getRandomProducts, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      getRandomProductsCompleted(result);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });
  const [requestRandomArtworks] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      getRandomArtworksCompleted(result);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  const { data: productsInfo } = useQuery(getRandomInfo, {
    variables: { keyword },
    onCompleted: ({ getRandomInfo }) => {
      setLoading(true);
      const artwork = Math.floor(Math.random() * getRandomInfo.artworksCount + 1);
      const product = Math.floor(Math.random() * getRandomInfo.productsCount + 1);
      randomArtworkNumberVar(artwork);
      randomProductNumberVar(product);
      requestRandomProducts({
        variables: {
          params: {
            count: product,
            offset: keyword ? 0 : productsOffset,
            limit: productsLimit,
            keyword,
          },
        },
      });
      requestRandomArtworks({
        variables: {
          params: {
            count: artwork,
            offset: keyword ? 0 : artworksOffset,
            limit: artworksLimit,
            keyword,
          },
        },
      });
    },
    onError: () => setLoading(false),
  });

  const isProductsEnd = useMemo(
    () => productsInfo?.getRandomInfo?.productsCount <= productsOffset,
    [productsInfo?.getRandomInfo?.productsCount, productsOffset],
  );

  const isArtworksEnd = useMemo(
    () => productsInfo?.getRandomInfo?.artworksCount <= artworksOffset,
    [productsInfo?.getRandomInfo?.artworksCount, artworksOffset],
  );

  const loadMoreProducts = useCallback(() => {
    setLoading(true);
    requestRandomProducts({
      variables: {
        params: { count: countProduct, offset: productsOffset, limit: productsLimit, keyword },
      },
    });
  }, [countProduct, productsOffset, productsLimit, keyword, requestRandomProducts]);

  const loadMoreArtworks = useCallback(() => {
    setLoading(true);
    requestRandomArtworks({
      variables: {
        params: { count: countArtwork, offset: artworksOffset, limit: artworksLimit, keyword },
      },
    });
  }, [countArtwork, artworksOffset, artworksLimit, keyword, requestRandomArtworks]);

  return {
    carouselArtworks: productsInfo?.getRandomInfo?.artworks || [],
    isProductsEnd,
    isArtworksEnd,
    loading,
    loadMoreProducts,
    loadMoreArtworks,
  };
};

export default useRandomInfo;
