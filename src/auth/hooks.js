import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Hub } from 'aws-amplify';

import { getCurrentUser } from './index';
import useAsyncFn from '../hooks/useAsyncFn';

export const useCurrentUser = function() {
  const { loading, call } = useAsyncFn(getCurrentUser);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = async () => {
      setUser(await call());
    };
    Hub.listen('auth', updateUser);
    return () => {
      Hub.remove('auth', updateUser);
    }
  }, [call]);

  return { user, loading };
};

export const useQueryParams = () => {
  const location = useLocation();
  return queryString.parse(location.hash);
};

