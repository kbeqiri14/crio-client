import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import history from '@configs/history';
import ProductDetails from './ProductForm';

const EditProduct = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      history.push('/');
    }
  }, [state]);

  return <ProductDetails state={state} />;
};

export default memo(EditProduct);
