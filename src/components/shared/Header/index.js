import { useMemo } from 'react';
import { Row, Col } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { SecondaryButton } from '@ui-kit/Button';
import { DEFAULT_PRIVATE_ROUTE, DEFAULT_PUBLIC_ROUTE } from '@configs/constants';

import history from '@app/configs/history';
import { useCurrentUser } from '@app/auth/hooks';
import crio_logo from '@images/crio-logo.svg';
import { ConnectButton } from '@shared/ConnectButton';
import { TabMenu } from './__partials__/TabMenu';
import { ProfileMenu } from './__partials__/ProfileMenu';
import './styles.less';

const getTabItems = (isAuthenticated) => {
  return [
    {
      id: 'home',
      title: 'Home',
      onClick: () => history.push(isAuthenticated ? DEFAULT_PRIVATE_ROUTE : DEFAULT_PUBLIC_ROUTE),
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
  const { user, loading } = useCurrentUser();
  const activeItem = location.pathname?.replace('/', '') || 'home';

  const menuItems = useMemo(() => getTabItems(!!user), [user]);

  return (
    <header className='crio-app-header'>
      <Row justify='space-between' align='middle'>
        <Col className='header-start-group'>
          <div className='header-logo'>
            <Link to={user ? DEFAULT_PRIVATE_ROUTE : DEFAULT_PUBLIC_ROUTE}>
              <img alt='crio app logo' src={crio_logo} />
            </Link>
          </div>
          <div className='header-tab-menu'>
            <TabMenu defaultActiveItem={activeItem} menuItems={menuItems} />
          </div>
        </Col>
        <Col className='header-end-group'>
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            !loading && <ConnectButton size='regular' disabled={loading} />
          )}
          {user && (
            <SecondaryButton filled fillColor='primary'>
              UPLOAD
            </SecondaryButton>
          )}
        </Col>
      </Row>
    </header>
  );
};

export default Header;
