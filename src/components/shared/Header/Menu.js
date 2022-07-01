import { memo, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { searchKeywordVar, refetchArtworkVar, refetchMarketplaceVar } from '@configs/client-cache';
import history from '@configs/history';
import { Button, Col, Row } from '@ui-kit';
import logo from '@images/logo.png';
import SearchBar from './SearchBar';

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

const Menu = ({ user, keyword, setKeyword }) => {
  const { pathname } = useLocation();

  const menuItems = useMemo(
    () => getTabItems(!user.isCreator, user.isSubscribed),
    [user.isCreator, user.isSubscribed],
  );
  const activeItem = useMemo(() => {
    const tab = pathname.split('/').slice(-1)[0];
    return tab === '' || tab === 'artworks' ? 'explore' : tab;
  }, [pathname]);

  const goTo = useCallback(
    (path) => () => {
      if (path === '/' && keyword) {
        setKeyword('');
        searchKeywordVar('');
        refetchArtworkVar(true);
        refetchMarketplaceVar(true);
      }
      history.push(path);
    },
    [keyword, setKeyword],
  );

  return (
    <Row gutter={[12, 12]} className='items-center'>
      <Col onClick={goTo('/')} className='pointer'>
        <img alt='crio app logo' src={logo} />
      </Col>
      <Col onClick={goTo('/')} className='logo-name'>
        Crio
      </Col>
      {menuItems.map((menu) => (
        <Col key={menu.id} margin_left={28}>
          <Button type='tab' active={`${activeItem === menu.id}`} onClick={goTo(menu.path)}>
            {menu.title}
          </Button>
        </Col>
      ))}
      <Col margin_left={28}>
        <SearchBar width={244} keyword={keyword} setKeyword={setKeyword} />
      </Col>
    </Row>
  );
};

export default memo(Menu);
