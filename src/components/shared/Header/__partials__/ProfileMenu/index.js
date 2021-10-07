import { useHistory } from 'react-router-dom';
import './styles.less';

export const ProfileMenu = ({ user, logout }) => {
  const history = useHistory();

  return (
    <div className='dropdown'>
    <p className='drop-button'>
      <img alt='profile' src={JSON.parse(user.attributes?.picture)?.data?.url} />
      <i className="arrow-down"></i>
    </p>
    <div className='dropdown-content'>
      <span onClick={() => history.push('/profile')}>My Profile</span>
      <span onClick={logout}>Log Out</span>
    </div>
  </div>
  );
};

export default ProfileMenu;
