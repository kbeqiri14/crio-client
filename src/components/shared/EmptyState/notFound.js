import { memo, useCallback } from 'react';
import styled from 'styled-components';
import history from '@configs/history';

import { Button, Col, Row, Title, Text } from '@ui-kit';
import notFound from '@images/404.png';
import ellipse1 from '@images/ellipse-1.png';
import ellipse2 from '@images/ellipse-2.png';

const Wrapper = styled('div')`
  position: relative;
  max-width: 600px;
  margin: auto;
  padding: 0 15px;
  .half-bubble-1 {
    position: absolute;
    top: 220px;
    right: -235px;
  }
  .half-bubble-2 {
    position: absolute;
    top: 570px;
    right: 590px;
  }

  @media (max-width: 1084px) {
    .half-bubble-1,
    .half-bubble-2 {
      display: none;
    }
  }
`;
export const NotFound = () => {
  const onClick = useCallback(() => history.push('/'), []);
  return (
    <>
      <Wrapper>
        <Row
          className='text-center'
          padding_top={230}
          justify='center'
          align='middle'
          gutter={[0, 20]}
        >
          <Col span={24}>
            <img src={notFound} alt='404' />
          </Col>
          <Col padding_top={60} span={24}>
            <Title level={8}>Something went wrong</Title>
          </Col>
          <Col span={24}>
            <Text level={4} color='dark25'>
              This page is missing or you assembled the link incorectly
            </Text>
          </Col>
          <Col padding_top={20} span={24}>
            <Button type='primary' onClick={onClick}>
              GO BACK
            </Button>
          </Col>
        </Row>
        <img src={ellipse1} alt='ellipse1' className='half-bubble-1' />
        <img src={ellipse2} alt='ellipse2' className='half-bubble-2' />
      </Wrapper>
    </>
  );
};

export default memo(NotFound);
