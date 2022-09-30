import { useState, useRef, memo } from 'react';
import styled from 'styled-components';

import { Row, Col } from '@ui-kit';
import { ReactComponent as ArrowRightIcon } from '@svgs/arrow-down.svg';

const Wrapper = styled('div')`
  max-width: 1300px;
  margin: 0 14px 20px 32px;
  padding-bottom: 20px;
  overflow-x: auto;
  white-space: nowrap;
  background: #2a2a2a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Tag = styled('span')`
  padding: 8px 12px;
  margin-right: 4px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.text[3].size}px;
  font-weight: ${(props) => props.theme.text[3].weight};
  line-height: ${(props) => props.theme.text[3].height}px;
  font-style: ${(props) => props.theme.text[3].style || 'normal'};
  :hover {
    color: #1a1e24;
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const Categories = ({ categories }) => {
  const [scrollX, setScrollX] = useState(100);
  const ref = useRef();

  const scrollMore = () => {
    ref.current.scroll({ left: scrollX, behavior: 'smooth' });
    setScrollX((prev) => (prev += 400));
  };

  return (
    <Row>
      <Col>
        <ArrowRightIcon onClick={scrollMore} className='arrow-left' />
      </Col>
      <Col>
        <Wrapper ref={ref}>
          <Tag>All</Tag>
          {categories.map(({ id, name }) => (
            <Tag key={id}>{name}</Tag>
          ))}
        </Wrapper>
      </Col>
      {(!ref.current?.scrollLeft || ref.current?.scrollLeft < 380) && (
        <Col>
          <ArrowRightIcon onClick={scrollMore} className='arrow-right' />
        </Col>
      )}
    </Row>
  );
};

export default memo(Categories);
