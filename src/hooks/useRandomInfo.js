import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { getRandomInfo, getRandomProducts } from '@app/graphql/queries/products.query';
import { getRandomArtworks } from '@app/graphql/queries/artworks.query';

const useRandomInfo = ({
  keyword,
  productCategoryId,
  artworkCategoryId,
  productsOffset = 0,
  artworksOffset = 0,
  productsLimit,
  artworksLimit,
  getRandomProductsCompleted,
  getRandomArtworksCompleted,
}) => {
  const [loading, setLoading] = useState(true);

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
    variables: { params: { keyword, productCategoryId, artworkCategoryId } },
    onCompleted: () => {
      setLoading(true);
      requestRandomProducts({
        variables: {
          params: {
            offset: keyword || productCategoryId ? 0 : productsOffset,
            limit: productsLimit,
            keyword,
            categoryId: productCategoryId,
          },
        },
      });
      requestRandomArtworks({
        variables: {
          params: {
            offset: keyword || artworkCategoryId ? 0 : artworksOffset,
            limit: artworksLimit,
            keyword,
            categoryId: artworkCategoryId,
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
        params: {
          offset: productsOffset,
          limit: productsLimit,
          keyword,
          categoryId: productCategoryId,
        },
      },
    });
  }, [productsOffset, productsLimit, keyword, productCategoryId, requestRandomProducts]);

  const loadMoreArtworks = useCallback(() => {
    setLoading(true);
    requestRandomArtworks({
      variables: {
        params: {
          offset: artworksOffset,
          limit: artworksLimit,
          keyword,
          categoryId: artworkCategoryId,
        },
      },
    });
  }, [artworksOffset, artworksLimit, keyword, artworkCategoryId, requestRandomArtworks]);

  return {
    topProducts: productsInfo?.getRandomInfo?.products || [],
    isProductsEnd,
    isArtworksEnd,
    loading,
    loadMoreProducts,
    loadMoreArtworks,
  };
};

export default useRandomInfo;
