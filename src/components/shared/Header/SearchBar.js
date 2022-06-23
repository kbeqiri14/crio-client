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
  width: 244px;
`;

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const { pathname } = useLocation();
  const isArtworks = useMemo(() => pathname.includes('/artworks'), [pathname]);

  const onSearch = useCallback(() => {
    searchKeywordVar(keyword);
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
