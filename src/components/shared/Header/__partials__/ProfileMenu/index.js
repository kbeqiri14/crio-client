import history from '@app/configs/history';
import useFacebook from '@app/hooks/useFacebook';
import { Text } from '@ui-kit/Text';
import './styles.less';

export const ProfileMenu = ({ user }) => {
  const { logout } = useFacebook();

  return (
    <div className='dropdown'>
      <div className='drop-button'>
        <img alt='profile' src={JSON.parse(user.attributes?.picture)?.data?.url} />
        <i className="arrow-down"></i>
      </div>
      <div className='dropdown-content'>
        <Text inline level='20' onClick={() => history.push('/profile')}>My Profile</Text>
        <Text inline level='20' onClick={logout}>Log Out</Text>
      </div>
    </div>
  );
};

export default ProfileMenu;
