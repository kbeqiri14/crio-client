import { useEffect, useState } from 'react';
import useAsyncFn from '@app/hooks/useAsyncFn';
import { getCurrentUser } from './index';

export const useCurrentUser = function () {
  const { loading, call } = useAsyncFn(getCurrentUser);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = async () => {
      setUser(await call());
    };
    updateUser();
    // Hub.listen('auth', updateUser);
    // return () => {
    //   Hub.remove('auth', updateUser);
    // }
  }, [call]);

  return { user, loading };
};
