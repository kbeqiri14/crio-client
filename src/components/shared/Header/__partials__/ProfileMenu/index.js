import { useMemo } from 'react';

import history from '@app/configs/history';
import useFacebook from '@app/hooks/useFacebook';
import { Text } from '@ui-kit/Text';
import profile from '@images/profile.png';
import './styles.less';

export const ProfileMenu = ({ user }) => {
  const { logout } = useFacebook();
  const source = useMemo(
    () => (user.attributes?.picture ? JSON.parse(user.attributes.picture)?.data?.url : profile),
    [user?.attributes?.picture],
  );

  return (
    <div className='dropdown'>
      <div className='drop-button'>
        <img alt='profile' src={source} />
        <i className='arrow-down' />
      </div>
      <div className='dropdown-content'>
        <Text inline level='20' onClick={() => history.push('/profile')}>
          My Profile
        </Text>
        <Text inline level='20' onClick={logout}>
          Log Out
        </Text>
      </div>
    </div>
  );
};

export default ProfileMenu;
