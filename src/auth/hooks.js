import { useCallback, useEffect, useState } from 'react';
import useAsyncFn from '@app/hooks/useAsyncFn';
import { getCurrentUser } from './index';

export const useCurrentUser = function () {
  const { call } = useAsyncFn(getCurrentUser);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUser = useCallback(async () => {
    const user = await call();
    setUser(user);
  }, [call]);

  useEffect(() => {
    updateUser().then(() => setLoading(false));
    // Hub.listen('auth', updateUser);
    // return () => {
    //   Hub.remove('auth', updateUser);
    // }
  }, [call, updateUser]);

  return { user, loading };
};
