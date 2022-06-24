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
import { ReactComponent as CloseIcon } from '@svgs/close-middle.svg';

const Wrapper = styled('div')`
  width: 244px;
  .ant-input-affix-wrapper {
    padding: 7px 12px;
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

  const onSearch = useCallback(
    (clear) => {
      const text = clear ? '' : keyword.trim();
      if (clear) {
        setKeyword('');
      }
      if (!clear && !text) {
        return;
      }
      searchKeywordVar(text);
      newSearchArtworkVar(true);
      newSearchMarketplaceVar(true);
      history.push(`/${isArtworks ? 'artworks' : ''}`);
    },
    [keyword, isArtworks],
  );
  const onClear = useCallback(() => onSearch(true), [onSearch]);

  return (
    <Wrapper>
      <Input
        prefix={<SearchIcon />}
        placeholder='Search'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onPressEnter={() => onSearch()}
        suffix={keyword.trim() ? <CloseIcon onClick={onClear} className='pointer' /> : undefined}
      />
    </Wrapper>
  );
};

export default memo(SearchBar);
