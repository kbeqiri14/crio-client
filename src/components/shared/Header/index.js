import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import GetStarted from '@shared/GetStarted';
import { Button, Col, Row } from '@ui-kit';
import logo from '@images/crio-logo.svg';
import { ProfileMenu } from './__partials__/ProfileMenu';

const getTabItems = (showPricing) => {
  const items = [
    {
      id: 'explore',
      title: 'Explore',
      path: '/',
    },
  ];
  if (showPricing) {
    items.push({
      id: 'pricing',
      title: 'Pricing',
      path: '/pricing',
    });
  }
  return items;
};
const goTo = (path) => () => history.push(path);

export const Header = ({ isAuthenticated }) => {
  const { pathname } = useLocation();
  const { user } = useLoggedInUser();

  const menuItems = useMemo(() => getTabItems(!user.id || user?.isFan), [user?.id, user?.isFan]);
  const activeItem = useMemo(() => {
    const tab = pathname.split('/').slice(-1)[0];
    return tab === '' || tab === 'artworks' ? 'explore' : tab;
  }, [pathname]);

  return (
    <Row justify='space-between' align='middle'>
      <Col>
        <Row gutter={20}>
          <Col>
            <Link to='/'>
              <img alt='crio app logo' src={logo} width={68} height={40} />
            </Link>
          </Col>
          {menuItems.map((menu) => (
            <Col key={menu.id}>
              <Button type='tab' active={activeItem === menu.id} onClick={goTo(menu.path)}>
                {menu.title}
              </Button>
            </Col>
          ))}
        </Row>
      </Col>
      <Col>
        {isAuthenticated && user ? <ProfileMenu user={user} /> : <GetStarted />}
        {user?.isCreator && (
          <Button type='primary' onClick={goTo('/Upload')} className='vertical-middle'>
            UPLOAD
          </Button>
        )}
        {user?.isCreator && <UploadOutlined className='upload-icon' onClick={goTo('/Upload')} />}
      </Col>
    </Row>
  );
};

export default memo(Header);
