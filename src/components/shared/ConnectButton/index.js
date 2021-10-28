import { memo } from 'react';
import cc from 'classcat';

import useFacebook from '@app/hooks/useFacebook';
import { SecondaryButton } from '@ui-kit/Button/SecondaryButton';
import fbIcon from '@svgs/fb-button-icon.svg';
import './styles.less';

export const ConnectButton = memo(({ size = 'large' }) => {
  const { loading, login } = useFacebook();

  return (
    <div className={cc(['cr-landing__connect', { small: size === 'regular' }])}>
      <img alt='facebook connect icon' src={fbIcon} className='banner__fb-icon' />
      <SecondaryButton
        onClick={login}
        disabled={loading}
        filled
        fillColor='secondary'
        textColor='white'
        size={size}
      >
        Connect with Facebook
      </SecondaryButton>
    </div>
  );
});
