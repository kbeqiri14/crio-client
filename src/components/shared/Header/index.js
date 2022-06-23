import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@configs/history';
import {
  newSearchArtworkVar,
  newSearchMarketplaceVar,
  searchKeywordVar,
} from '@configs/client-cache';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import GetStarted from '@shared/GetStarted';
import { Col, Input, Row } from '@ui-kit';
import { ReactComponent as SearchIcon } from '@svgs/search.svg';
import Menu from './Menu';
import ProfileMenu from './ProfileMenu';
import UploadButton from './UploadButton';

const Wrapper = styled('div')`
  .ant-input-affix-wrapper {
    padding: 6px 15px;
    border-radius: 32px;
    border: 1px solid ${(props) => props.theme.colors.dark50};
    :hover,
    :focus {
      border: 1px solid ${(props) => props.theme.colors.dark50} !important;
    }
  }
  .ant-input {
    color: white;
    font-size: 16px;
    line-height: 24px;
    background-color: transparent !important;
  }
`;
export const Header = ({ isAuthenticated }) => {
  const [keyword, setKeyword] = useState('');
  const { user } = useLoggedInUser();
  const { pathname } = useLocation();
  const isArtworks = useMemo(() => pathname.includes('/artworks'), [pathname]);

  const onSearch = useCallback(() => {
    searchKeywordVar(keyword);
    newSearchArtworkVar(true);
    newSearchMarketplaceVar(true);
    history.push(`/${isArtworks ? 'artworks' : ''}`);
  }, [keyword, isArtworks]);

  return (
    <Row justify='space-between' align='middle'>
      <Col>
        <Menu user={user} />
      </Col>
      <Col style={{ minWidth: 700 }}>
        <Wrapper>
          <Input
            prefix={<SearchIcon />}
            placeholder='Search'
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={onSearch}
          />
        </Wrapper>
      </Col>
      <Col>
        <Row justify='center' gutter={[20, 20]}>
          <Col className='self-center'>
            {isAuthenticated && user ? <ProfileMenu user={user} /> : <GetStarted />}
          </Col>
          <Col>{user?.isCreator && <UploadButton />}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(Header);
