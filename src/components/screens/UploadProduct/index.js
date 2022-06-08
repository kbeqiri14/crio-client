import { memo, useEffect } from 'react';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import ProductDetails from '@root/src/components/screens/EditProduct/ProductForm';

const UploadProduct = () => {
  const { user } = useLoggedInUser();

  useEffect(() => {
    if (user.id) {
      if (!user.isCreator) {
        history.push('/');
        return;
      }
    }
  }, [user.id, user.isCreator]);

  return <ProductDetails />;
};

export default memo(UploadProduct);
