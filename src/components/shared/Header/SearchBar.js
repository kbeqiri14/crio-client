import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@configs/history';
import {
  newSearchArtworkVar,
  newSearchMarketplaceVar,
  searchKeywordVar,
} from '@configs/client-cache';
import { Input } from '@ui-kit';
import { ReactComponent as SearchIcon } from '@svgs/search.svg';

const Wrapper = styled('div')`
  width: 244px;
  .ant-input-affix-wrapper {
    padding: 7px 15px;
    border-radius: 32px;
    border: none !important;
    background-color: ${(props) => props.theme.colors.dark100} !important;
    box-shadow: none;
  }
  .ant-input {
    color: white;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    background-color: ${(props) => props.theme.colors.dark100} !important;
  }
  .ant-input-prefix {
    margin-right: 8px;
  }
`;

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const { pathname } = useLocation();
  const isArtworks = useMemo(() => pathname.includes('/artworks'), [pathname]);

  const onSearch = useCallback(() => {
    const text = keyword.trim();
    if (!text) {
      return;
    }
    searchKeywordVar(text);
    newSearchArtworkVar(true);
    newSearchMarketplaceVar(true);
    history.push(`/${isArtworks ? 'artworks' : ''}`);
  }, [keyword, isArtworks]);

  return (
    <Wrapper>
      <Input
        prefix={<SearchIcon />}
        placeholder='Search'
        onChange={(e) => setKeyword(e.target.value)}
        onPressEnter={onSearch}
      />
    </Wrapper>
  );
};

export default memo(SearchBar);
