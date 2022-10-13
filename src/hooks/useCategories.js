import { useEffect } from 'react';
import { useReactiveVar, useLazyQuery } from '@apollo/client';

import { DIGITAL, COMMISSIONS } from '@configs/constants';
import { categoriesVar } from '@configs/client-cache';
import { getCategories } from '@app/graphql/queries/products.query';

const useCategories = (type) => {
  const categories = useReactiveVar(categoriesVar);

  const [request] = useLazyQuery(getCategories, {
    onCompleted: ({ getCategories }) => {
      let productCategories = [],
        contentCategories = [],
        mainCategories = {};
      if (!type || type === 'product') {
        productCategories = getCategories.filter((item) => item.type === 'product');
        mainCategories = getCategories.reduce((acc, item) => {
          if (!item.mainCategoryId && item.type === 'product') {
            return { ...acc, [item.name]: item.id };
          }
          return acc;
        }, {});
      }
      if (!type || type === 'content') {
        contentCategories = getCategories.filter((item) => item.type === 'content');
      }

      categoriesVar({
        digitalId: mainCategories[DIGITAL],
        commissionId: mainCategories[COMMISSIONS],
        products: productCategories,
        contents: contentCategories,
      });
    },
  });

  useEffect(() => {
    if (!categories.products.length || !categories.contents.length) {
      request();
    }
  }, [categories.products.length, categories.contents.length, request]);

  return { categories };
};

export default useCategories;
