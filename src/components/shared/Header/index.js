import { Fragment, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import GetStarted from '@shared/GetStarted';
import { SecondaryButton } from '@ui-kit/Button';
import crio_logo from '@images/crio-logo.svg';
import { TabMenu } from './__partials__/TabMenu';
import { ProfileMenu } from './__partials__/ProfileMenu';
import './styles.less';

const getTabItems = (showPricing) => {
  const items = [
    {
      id: 'home',
      title: 'Home',
      onClick: () => history.push('/'),
    },
  ];
  if (showPricing) {
    items.push({
      id: 'pricing',
      title: 'Pricing',
      onClick: () => history.push('/pricing'),
    });
  }
  return items;
};

export const Header = ({ isAuthenticated }) => {
  const location = useLocation();
  const { user } = useLoggedInUser();
  const activeItem = location.pathname?.replace('/', '') || 'home';

  const menuItems = useMemo(() => getTabItems(!user.id || user?.isFan), [user?.id, user?.isFan]);
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
          {isAuthenticated && user ? (
            <ProfileMenu user={user} />
          ) : (
            <Fragment>
              <GetStarted text='Sign in' />
              <GetStarted filled text='Sign up' />
            </Fragment>
          )}
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
