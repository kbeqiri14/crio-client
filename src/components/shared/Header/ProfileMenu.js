import { memo, useCallback, useMemo } from 'react';

import history from '@configs/history';
import { signOut } from '@app/auth';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { Dropdown } from '@ui-kit';
import { ReactComponent as ArrowIcon } from '@svgs/arrow.svg';

const ProfileMenu = ({ user = {} }) => {
  const avatarUrl = useAvatarUrl(user.image);
  const goAccount = useCallback(() => history.push(`/profile/${user.username}`), [user.username]);
  const goPayment = useCallback(() => history.push('/payment'), []);
  const items = useMemo(
    () => [
      {
        label: 'My Profile',
        key: 'my-profile',
        onClick: goAccount,
      },
      user.isCreator && {
        label: 'Payment & Tracking',
        key: 'payment',
        onClick: goPayment,
      },
      {
        label: 'Sign Out',
        key: 'log-out',
        onClick: signOut,
      },
    ],
    [goAccount, goPayment, user.isCreator],
  );

  return (
    <Dropdown menu={{ items }}>
      <div>
        <img alt='profile' src={avatarUrl} width={40} height={40} className='border-radius-100' />
        <ArrowIcon className='vertical-middle' />
      </div>
    </Dropdown>
  );
};

export default memo(ProfileMenu);
