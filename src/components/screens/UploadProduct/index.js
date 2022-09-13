import { memo, useEffect } from 'react';

import history from '@configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { GlobalSpinner } from '@ui-kit';
import ProductForm from '@screens/EditProduct/ProductForm';

const UploadProduct = () => {
  const { user } = useLoggedInUser();

  useEffect(() => {
    if (user.id && !user.isCreator) {
      history.push('/');
    }
  }, [user.id, user.isCreator]);

  return user.id ? <ProductForm /> : <GlobalSpinner />;
};

export default memo(UploadProduct);
