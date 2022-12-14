import { useCallback, useEffect, useState } from 'react';
import { Hub } from 'aws-amplify';
import { makeVar, useReactiveVar } from '@apollo/client';

import useAsyncFn from '@app/hooks/useAsyncFn';
import { getCurrentUser } from './index';

const currentUserVar = makeVar(null);
const currentUserLoadingVar = makeVar(false);

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

export const useAmplifyUser = function () {
  const loading = useReactiveVar(currentUserLoadingVar);
  const user = useReactiveVar(currentUserVar);

  useEffect(() => {
    const updateUser = async (e) => {
      const event = e?.payload?.event;
      if (
        [
          'signUp',
          'signUp_failure',
          'signIn_failure',
          'forgotPassword',
          'forgotPasswordSubmit',
          'forgotPasswordSubmit_failure',
        ].includes(event)
      ) {
        return;
      }
      // Prevent loading state change during update user.
      const toggleLoading = event !== 'tokenRefresh';

      if (toggleLoading) {
        currentUserLoadingVar(true);
      }

      const currentUser = await getCurrentUser();
      currentUserVar(currentUser);

      if (toggleLoading) {
        currentUserLoadingVar(false);
      }
    };

    if (!currentUserVar() && !currentUserLoadingVar()) {
      updateUser();
    }

    Hub.listen('auth', updateUser);
    return () => {
      Hub.remove('auth', updateUser);
    };
  }, []);

  return { user, loading };
};
