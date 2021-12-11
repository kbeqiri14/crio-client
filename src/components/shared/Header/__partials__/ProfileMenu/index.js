import { useCallback } from 'react';
import { Auth } from 'aws-amplify';

import history from '@app/configs/history';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { Text } from '@ui-kit/Text';
import './styles.less';

export const ProfileMenu = ({ user }) => {
  const avatarUrl = useAvatarUrl(user?.providerType, user?.fbUserId);
  const signOut = useCallback(() => Auth.signOut(), []);

  return (
    <div className='dropdown'>
      <div className='drop-button'>
        <img alt='profile' src={avatarUrl} />
        <i className='arrow-down' />
      </div>
      <div className='dropdown-content'>
        <Text inline level='20' onClick={() => history.push('/account')}>
          My Profile
        </Text>
        <Text inline level='20' onClick={signOut}>
          Log Out
        </Text>
      </div>
    </div>
  );
};

export default ProfileMenu;
