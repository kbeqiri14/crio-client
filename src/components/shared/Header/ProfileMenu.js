import { memo, useCallback } from 'react';

import history from '@configs/history';
import { signOut } from '@app/auth';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { Dropdown, Menu } from '@ui-kit';
import { ReactComponent as ArrowIcon } from '@svgs/arrow.svg';

const ProfileMenu = ({ user = {} }) => {
  const avatarUrl = useAvatarUrl(user.providerType, user.providerUserId, user.avatar);
  const goAccount = useCallback(() => history.push(`/profile/${user.username}`), [user.username]);
  const goPayment = useCallback(() => history.push('/payment'), []);

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key='my-profile' onClick={goAccount}>
            My Profile
          </Menu.Item>
          {user.isCreator && (
            <Menu.Item key='payment' onClick={goPayment}>
              Payment
            </Menu.Item>
          )}
          <Menu.Item key='log-out' onClick={signOut}>
            Log Out
          </Menu.Item>
        </Menu>
      }
    >
      <div>
        <img alt='profile' src={avatarUrl} width={40} height={40} className='border-radius-100' />
        <ArrowIcon className='vertical-middle' />
      </div>
    </Dropdown>
  );
};

export default memo(ProfileMenu);
