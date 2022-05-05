import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import GetStarted from '@shared/GetStarted';
import { Button } from '@ui-kit';
import { TabButton } from '@ui-kit/Button';
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
const upload = () => history.push('/upload');
const handleClick = (item) => () => history.push(item.path);

export const Header = ({ isAuthenticated }) => {
  const location = useLocation();
  const { user } = useLoggedInUser();

  const menuItems = useMemo(() => getTabItems(!user.id || user?.isFan), [user?.id, user?.isFan]);
  const activeItem = useMemo(
    () => location.pathname?.replace('/', '') || 'explore',
    [location.pathname],
  );

  return (
    <Row justify='space-between' align='middle' gutter={5}>
      <Col>
        <Link to='/'>
          <img alt='crio app logo' src={logo} width={68} height={40} className='logo' />
        </Link>
        {menuItems.map((menu) => (
          <TabButton key={menu.id} isActive={activeItem === menu.id} onClick={handleClick(menu)}>
            {menu.title}
          </TabButton>
        ))}
      </Col>
      <Col>
        {isAuthenticated && user ? <ProfileMenu user={user} /> : <GetStarted />}
        {user?.isCreator && (
          <Button type='primary' onClick={upload} className='vertical-middle'>
            UPLOAD
          </Button>
        )}
        {user?.isCreator && <UploadOutlined className='upload-icon' onClick={upload} />}
      </Col>
    </Row>
  );
};

export default Header;
