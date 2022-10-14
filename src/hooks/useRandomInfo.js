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
  const [loadingMoreProducts, setLoadingMoreProducts] = useState(false);
  const [loadingMoreArtworks, setLoadingMoreArtworks] = useState(false);

  const [requestRandomProducts, { loading: loadingProducts }] = useLazyQuery(getRandomProducts, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      getRandomProductsCompleted(result);
      setLoadingMoreProducts(false);
    },
    onError: () => setLoadingMoreProducts(false),
  });
  const [requestRandomArtworks, { loading: loadingArtworks }] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      getRandomArtworksCompleted(result);
      setLoadingMoreArtworks(false);
    },
    onError: () => setLoadingMoreArtworks(false),
  });

  const { data: productsInfo, loading } = useQuery(getRandomInfo, {
    variables: { params: { keyword, productCategoryId, artworkCategoryId } },
    onCompleted: () => {
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
    setLoadingMoreProducts(true);
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
    setLoadingMoreArtworks(true);
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
    isProductsEnd,
    isArtworksEnd,
    loadingProducts: loading || loadingProducts,
    loadingArtworks: loading || loadingArtworks,
    loadingMoreProducts,
    loadingMoreArtworks,
    loadMoreProducts,
    loadMoreArtworks,
  };
};

export default useRandomInfo;
