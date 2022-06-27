import { memo } from 'react';
import styled from 'styled-components';

import { Button } from '@ui-kit';

const Wrapper = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);
    height: 370px;
    width: 100%;
    background-image: linear-gradient(180deg, rgba(43, 43, 43, 0) 0%, #2b2b2b 78.12%);
  }
`;

export const LoadMoreButton = ({ visible, loading, onClick }) => {
  if (!visible) {
    return null;
  }

  return (
    <Wrapper>
      <Button white='true' loading={loading} onClick={onClick} width={168}>
        LOAD MORE
      </Button>
    </Wrapper>
  );
};

export default memo(LoadMoreButton);
