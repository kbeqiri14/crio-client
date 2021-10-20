import { DEFAULT_PRIVATE_ROUTE } from '@configs/constants';
import { memo, useEffect } from 'react';

import history from '@app/configs/history';
import { useQueryParams } from '@app/hooks/useRouter';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';

export const CognitoCallback = () => {
  const { access_token } = useQueryParams();

  useEffect(() => {
    if (!access_token) {
      history.push('/');
    } else {
      history.push(DEFAULT_PRIVATE_ROUTE);
    }
  }, [access_token]);

  return <GlobalSpinner />;
};

export default memo(CognitoCallback);
