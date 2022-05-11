import { memo, useCallback, useEffect, useRef, useState } from 'react';
import history from '@app/configs/history';
import { signOut } from '@app/auth';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { Text } from '@ui-kit';
import './styles.less';

export const ProfileMenu = ({ user }) => {
  const ref = useRef();
  const avatarUrl = useAvatarUrl(user?.providerType, user?.providerUserId, user?.avatar);
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  const goAccount = useCallback(() => {
    hide();
    history.push(`/profile/${user?.username}`);
  }, [user?.username, hide]);

  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      hide(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [hide]);

  return (
    <div ref={ref} className={`dropdown ${visible ? 'show' : ''}`}>
      <div className='drop-button' onClick={show}>
        <img alt='profile' src={avatarUrl} />
        <i className='arrow-down' />
      </div>
      <div className='dropdown-content'>
        <Text level={3} onClick={goAccount}>
          My Profile
        </Text>
        <Text level={3} onClick={signOut}>
          Log Out
        </Text>
      </div>
    </div>
  );
};

export default memo(ProfileMenu);
