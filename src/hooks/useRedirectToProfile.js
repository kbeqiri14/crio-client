import { useCallback } from 'react';

import history from '@app/configs/history';
import { useLoggedInUser } from './useLoggedInUser';

const useRedirectToProfile = () => {
  const { user } = useLoggedInUser();

  const redirect = useCallback(() => history.push(`/profile/${user.username}`), [user.username]);

  return { userId: user.id, username: user.username, redirect };
};

export default useRedirectToProfile;
