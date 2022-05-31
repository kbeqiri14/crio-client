import { memo, useEffect } from 'react';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import ProductDetails from '@root/src/components/screens/EditProduct/ProductForm';

const UploadProduct = () => {
  const { user } = useLoggedInUser();

  useEffect(() => {
    if (!user.isCreator) {
      history.push('/');
    }
  }, [user.isCreator]);

  return <ProductDetails />;
};

export default memo(UploadProduct);
