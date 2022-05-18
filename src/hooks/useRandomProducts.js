import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

import { randomNumberVar } from '@configs/client-cache';
import { getRandomProducts, getRandomProductsInfo } from '@app/graphql/queries/products.query';

const LIMIT = 16;

export const useRandomProducts = (onCompleted, offset = 0, limit = LIMIT) => {
  const [loading, setLoading] = useState(true);
  const count = useReactiveVar(randomNumberVar);

  const [requestRandomProducts] = useLazyQuery(getRandomProducts, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      onCompleted(result);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  const { data: productsInfo } = useQuery(getRandomProductsInfo, {
    onCompleted: ({ getRandomProductsInfo }) => {
      const n = Math.floor(Math.random() * getRandomProductsInfo.count + 1);
      randomNumberVar(n);
      requestRandomProducts({ variables: { params: { count: n, offset, limit } } });
    },
    onError: () => setLoading(false),
  });

  const isEnd = useMemo(
    () => productsInfo?.getRandomProductsInfo?.count <= offset,
    [productsInfo?.getRandomProductsInfo?.count, offset],
  );

  const loadMore = useCallback(() => {
    setLoading(true);
    requestRandomProducts({ variables: { params: { count, offset, limit: LIMIT } } });
  }, [count, offset, requestRandomProducts]);

  return {
    carouselPosters: productsInfo?.getRandomProductsInfo?.products || [],
    isEnd,
    loading,
    loadMore,
  };
};
