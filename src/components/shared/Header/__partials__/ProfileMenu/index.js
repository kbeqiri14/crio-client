import { useHistory } from 'react-router-dom';
import useFacebook from '@app/hooks/useFacebook';
import './styles.less';

export const ProfileMenu = ({ user }) => {
  const history = useHistory();
  const { logout } = useFacebook();

  return (
    <div className='dropdown'>
      <div className='drop-button'>
        <img alt='profile' src={JSON.parse(user.attributes?.picture)?.data?.url} />
        <i className="arrow-down"></i>
      </div>
      <div className='dropdown-content'>
        <span onClick={() => history.push('/profile')}>My Profile</span>
        <span onClick={logout}>Log Out</span>
      </div>
    </div>
  );
};

export default ProfileMenu;
