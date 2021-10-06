import { useState } from 'react';

import { fbSignIn } from '@app/auth';

const useFacebook = () => {
  const [loading, setLoading] = useState(false);

  const statusChangeCallback = async (response) => {
    if (response.status === 'connected') {
      setLoading(true);
      try {
        await fbSignIn();
      } catch (e) {
        console.log('error facebook status change: ', response);
      } finally {
        setLoading(false);
      }
    }
  };

  const checkLoginState = () => {
    window.FB.getLoginStatus(statusChangeCallback);
  };

  const login = () => {
    window.FB.login(checkLoginState, { scope: 'public_profile,email', return_scopes: true });
  };

  const logout = () => {
    window.FB.logout(() => console.log('logout'));
  };

  return { loading, login, logout };
};

export default useFacebook;
