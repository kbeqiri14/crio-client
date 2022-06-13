import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import history from '@app/configs/history';
import { Button, Col, Row, Title } from '@ui-kit';
import logo from '@images/crio-logo.svg';

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

const Menu = ({ user }) => {
  const { pathname } = useLocation();
  const menuItems = useMemo(() => getTabItems(!user.id || user?.isFan), [user?.id, user?.isFan]);
  const activeItem = useMemo(() => {
    const tab = pathname.split('/').slice(-1)[0];
    return tab === '' || tab === 'artworks' ? 'explore' : tab;
  }, [pathname]);

  return (
    <Row justify='center' gutter={12} className='items-center'>
      <Col>
        <Link to='/'>
          <img alt='crio app logo' src={logo} width={68} />
        </Link>
      </Col>
      <Col>
        <Link to='/'>
          <Title level={1}>Crio</Title>
        </Link>
      </Col>
      {menuItems.map((menu) => (
        <Col key={menu.id} margin_left={8}>
          <Button type='tab' active={activeItem === menu.id} onClick={goTo(menu.path)}>
            {menu.title}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default memo(Menu);
