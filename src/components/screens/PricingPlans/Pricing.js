import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { Space } from 'antd';
import { useReactiveVar } from '@apollo/client';

import { loggedInUserLoadingVar } from '@configs/client-cache';
import history from '@configs/history';
import { STRIPE_PAYMENT_URL } from '@configs/environment';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Button } from '@ui-kit';
import { Col, Divider, Row, Text, Title, Tooltip } from '@ui-kit';
import { warningToast } from '@ui-kit/Notification';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { ReactComponent as CheckMark } from '@svgs/check.svg';
import { ReactComponent as RecommendIcon } from '@svgs/recommend.svg';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  .card {
    max-width: 410px;
    min-height: 354px;
    background: #0f0e16;
    border-radius: 27px;
    padding: 40px;
    &.pro {
      min-height: 530px;
    }
  }
  .recommend {
    position: absolute;
    right: 10px;
  }
`;

const perksListFree = ['Buy publicly available products', 'Watch publicly available content'];
const perksListPro = [
  'Ability to follow any creator',
  'Access to all free products from creators you follow',
  'Watch any exclusive content from creators you follow',
];

const Item = ({ item }) => (
  <Space size='middle'>
    <CheckMark />
    <Text level={3} color='dark25'>
      {item}
    </Text>
  </Space>
);

const Pricing = () => {
  const { user } = useLoggedInUser();
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);

  const handleExploreMore = useCallback(() => history.push('/'), []);
  const handleGetStarted = useCallback(() => {
    if (user?.id) {
      window.open(STRIPE_PAYMENT_URL, '_blank', 'noopener,noreferrer,nofollow');
    } else {
      warningToast('Warning', 'Please sign in to get started.');
    }
  }, [user?.id]);

  if (loggedInUserLoading) {
    return <GlobalSpinner />;
  }

  return (
    <Wrapper>
      <Row justify='center' gutter={[20, 20]} className='self-center'>
        <Col className='self-center'>
          <Row gutter={[0, 16]} className='card'>
            <Col span={24}>
              <Title level={1}>Free</Title>
            </Col>
            <Col span={24} padding_bottom={10}>
              <Title level={5}>
                $0
                <Text level={3} color='dark25'>
                  {' '}
                  / month
                </Text>
              </Title>
            </Col>
            {perksListFree.map((item, index) => (
              <Col key={index} span={24} padding_top={1}>
                <Item item={item} />
              </Col>
            ))}
            <Col span={24} align='center' padding_top={46}>
              <Button type='link' onClick={handleExploreMore}>
                Explore More
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <RecommendIcon className='recommend' />
          <Row gutter={[0, 16]} className='card pro'>
            <Col span={24}>
              <Title level={1}>Pro</Title>
            </Col>
            <Col span={24} padding_bottom={10}>
              <Title level={5}>
                $7
                <Text level={3} color='dark25'>
                  {' '}
                  / month
                </Text>
              </Title>
            </Col>
            {perksListPro.map((item, index) => (
              <Col key={index} span={24} padding_top={1}>
                <Item item={item} />
              </Col>
            ))}
            <Col span={24} padding_top={8}>
              <Divider />
            </Col>
            <Col align='center' padding_top={8}>
              <Text level={1} color='dark25'>
                Crio shares a portion of your subscription fee with all creators you follow to
                support their work and efforts!
              </Text>
            </Col>
            <Col span={24} padding_top={8}>
              <Tooltip
                placement='right'
                getPopupContainer={(triggerNode) =>
                  triggerNode.parentNode.querySelector('.ant-tooltip-open')
                }
                title='Please, use the email address attached to your profile'
              >
                <div className='relative'>
                  <Button block type='primary' fill_color='green' onClick={handleGetStarted}>
                    SUBSCRIBE
                  </Button>
                </div>
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(Pricing);
