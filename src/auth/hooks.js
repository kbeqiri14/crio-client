import { useEffect, useState } from 'react';
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
