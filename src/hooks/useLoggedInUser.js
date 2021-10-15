import { useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';

import { loggedInUserVar } from '@configs/client-cache';

export function useLoggedInUser() {
  const user = useReactiveVar(loggedInUserVar);

  const dispatchUser = useCallback(userAttribute => {
    loggedInUserVar(userAttribute);
  }, []);

  return { user, dispatchUser };
}
