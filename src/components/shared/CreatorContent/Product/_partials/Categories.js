import { useState, useRef, memo } from 'react';
import styled from 'styled-components';

import CategoryTab from '@ui-kit/Custom/CategoryTab';
import { Row, Col } from '@ui-kit';
import { ReactComponent as ArrowRightIcon } from '@svgs/arrow-down.svg';
import { categoriesVar } from '@configs/client-cache';
import { useReactiveVar } from '@apollo/client';

const CategoryWrapper = styled('div')`
  max-width: 1347px;
  padding: 10px 32px 20px;
  margin-bottom: 20px;
  overflow-x: auto;
  white-space: nowrap;
  background: #2a2a2a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Categories = ({ isProduct }) => {
  const [scrollx, setScrollx] = useState(100);
  const categories = useReactiveVar(categoriesVar);
  const categoryRef = useRef();

  const scrollMore = () => {
    categoryRef.current.scroll({
      left: scrollx,
      behavior: 'smooth',
    });
    setScrollx((prev) => (prev += 200));
  };

  return (
    <Row>
      <Col>
        {isProduct ? (
          <CategoryWrapper ref={categoryRef}>
            <CategoryTab>All</CategoryTab>
            {categories.products
              .filter((item) => item.name !== 'Digital Product')
              .map((item) => (
                <CategoryTab>{item.name}</CategoryTab>
              ))}
          </CategoryWrapper>
        ) : (
          <CategoryWrapper ref={categoryRef}>
            <CategoryTab>All</CategoryTab>
            {categories.contents.map((item) => (
              <CategoryTab>{item.name}</CategoryTab>
            ))}
          </CategoryWrapper>
        )}
      </Col>
      <Col>
        <ArrowRightIcon onClick={scrollMore} className='arrow-right' />
      </Col>
    </Row>
  );
};

export default memo(Categories);
