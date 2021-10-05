import React, { useState } from 'react';
import { SecondaryButton } from '@ui-kit/Button';

import { fbSignIn } from '../../auth';

const FBLoginButton = () => {
  const [loading, setLoading] = useState(false);

  const statusChangeCallback = async response => {
    if (response.status === 'connected') {
      setLoading(true);
      try {
        await fbSignIn();
      } catch (e) {
        console.log('error facebook status change: ', response);
      }
      finally {
        setLoading(false);
      }
    }
  };

  const checkLoginState = () => {
    window.FB.getLoginStatus(statusChangeCallback);
  };

  const handleClick = () => {
    window.FB.login(checkLoginState, { scope: 'public_profile,email', return_scopes: true });
  };

  return (
    <SecondaryButton onClick={handleClick} disabled={loading}>
      LOG IN
    </SecondaryButton>
  );
}

export default FBLoginButton;
