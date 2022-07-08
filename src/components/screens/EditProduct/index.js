import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import history from '@configs/history';
import ProductForm from './ProductForm';

const EditProduct = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      history.push('/');
    }
  }, [state]);

  return <ProductForm state={state} />;
};

export default memo(EditProduct);
