import { useCallback, useMemo } from 'react';
import { Row, Col } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { SecondaryButton } from '@ui-kit/Button';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import crio_logo from '@images/crio-logo.svg';
import { ConnectButton } from '@shared/ConnectButton';
import { TabMenu } from './__partials__/TabMenu';
import { ProfileMenu } from './__partials__/ProfileMenu';
import './styles.less';

const getTabItems = () => {
  return [
    {
      id: 'home',
      title: 'Home',
      onClick: () => history.push('/'),
    },
    {
      id: 'pricing',
      title: 'Pricing',
      onClick: () => history.push('/pricing'),
    },
  ];
};

export const Header = () => {
  const location = useLocation();
  const { user } = useLoggedInUser();
  const activeItem = location.pathname?.replace('/', '') || 'home';

  const menuItems = useMemo(() => getTabItems(!!user), [user]);
  const upload = useCallback(() => history.push('/upload'), []);

  return (
    <header className='crio-app-header'>
      <Row justify='space-between' align='middle'>
        <Col className='header-start-group'>
          <div className='header-logo'>
            <Link to='/'>
              <img alt='crio app logo' src={crio_logo} />
            </Link>
          </div>
          <div className='header-tab-menu'>
            <TabMenu defaultActiveItem={activeItem} menuItems={menuItems} />
          </div>
        </Col>
        <Col className='header-end-group'>
          {user ? <ProfileMenu user={user} /> : <ConnectButton size='regular' />}
          {user?.isCreator && (
            <SecondaryButton filled textColor='white' onClick={upload}>
              UPLOAD
            </SecondaryButton>
          )}
        </Col>
      </Row>
    </header>
  );
};

export default Header;
