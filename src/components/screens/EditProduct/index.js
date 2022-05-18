import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import ProductDetails from './Details';

const EditProduct = () => {
  const { state } = useLocation();

  return <ProductDetails state={state} />;
};

export default memo(EditProduct);
