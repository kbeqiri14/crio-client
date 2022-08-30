import { memo } from 'react';
import styled from 'styled-components';
import history from '@configs/history';

import { Button, Col, Row, Title, Text } from '@ui-kit';
import notFound from '@images/404.png';
import ellipse1 from '@images/ellipse-1.png';
import ellipse2 from '@images/ellipse-2.png';

const onClick = () => history.push('/');

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 230px 15px 0;
`;

export const NotFound = () => {
  return (
    <>
      <Wrapper>
        <Col padding_top={330} xs={0} sm={0} md={0} lg={4} xl={3}>
          <img src={ellipse1} alt='ellipse1' />
        </Col>
        <Col max_width={600}>
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <img src={notFound} alt='404' />
            </Col>
            <Col padding_top={60} span={24}>
              <Title level={8}>Something went wrong</Title>
            </Col>
            <Col span={24}>
              <Text level={4} color='dark25'>
                This page is missing or you assembled the link incorrectly
              </Text>
            </Col>
            <Col padding_top={20} span={24}>
              <Button type='primary' onClick={onClick}>
                GO BACK
              </Button>
            </Col>
          </Row>
        </Col>
        <Col offset={1} xs={0} sm={0} md={0} lg={4} xl={3}>
          <img src={ellipse2} alt='ellipse2' />
        </Col>
      </Wrapper>
    </>
  );
};

export default memo(NotFound);
