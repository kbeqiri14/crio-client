import { memo } from 'react';
import cc from 'classcat';
import { SecondaryButton } from '@ui-kit/Button/SecondaryButton';
import fbIcon from '@svgs/fb-button-icon.svg';
import './styles.less';

export const ConnectButton = memo(({ onClick, size = 'large' }) => (
  <div className={cc(['cr-landing__connect', { small: size === 'regular' }])}>
    <img alt='facebook connect icon' src={fbIcon} className='banner__fb-icon' />
    <SecondaryButton onClick={onClick} filled fillColor='secondary' size={size}>
      Connect with Facebook
    </SecondaryButton>
  </div>
));
