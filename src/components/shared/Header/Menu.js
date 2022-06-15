import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import history from '@configs/history';
import { Button, Col, Row } from '@ui-kit';
import logo from '@images/logo.png';
import name from '@images/name.png';

const getTabItems = (showPricing, isSubscribed) => {
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
      title: isSubscribed ? 'Pro account' : 'Pricing',
      path: '/pricing',
    });
  }
  return items;
};
const goTo = (path) => () => history.push(path);

const Menu = ({ user }) => {
  const { pathname } = useLocation();
  const menuItems = useMemo(
    () => getTabItems(!user.isCreator, user.isSubscribed),
    [user.isCreator, user.isSubscribed],
  );
  const activeItem = useMemo(() => {
    const tab = pathname.split('/').slice(-1)[0];
    return tab === '' || tab === 'artworks' ? 'explore' : tab;
  }, [pathname]);

  return (
    <Row justify='center' gutter={12} className='items-center'>
      <Col>
        <Link to='/'>
          <img alt='crio app logo' src={logo} />
        </Link>
      </Col>
      <Col>
        <Link to='/'>
          <img alt='crio app logo' src={name} />
        </Link>
      </Col>
      {menuItems.map((menu) => (
        <Col key={menu.id} margin_left={8}>
          <Button type='tab' active={`${activeItem === menu.id}`} onClick={goTo(menu.path)}>
            {menu.title}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default memo(Menu);
