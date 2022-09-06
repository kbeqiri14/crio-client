import { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Col, Row, Text } from '@ui-kit';
import logo from '@images/crio-logo.svg';

const links = [
  { to: '/terms-of-use', label: 'Terms of Use' },
  { to: '/terms-and-conditions', label: 'Terms and Conditions' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
];

const Wrapper = styled('div')`
  @media (max-width: 768px) {
    margin-right: 45px;
    .flex-direction {
      flex-direction: column;
    }
  }
  @media (max-width: 915px) {
    .container {
      flex-direction: column-reverse;
    }
  }
`;
const Footer = () => (
  <Wrapper>
    <Row
      justify='space-around'
      gutter={[20, 45]}
      padding_vertical={20}
      className='container items-center'
    >
      <Col lg={8}>
        <Row justify='center' align='center' gutter={[20]} className='items-center'>
          <Col>
            <img alt='Crio logo' src={logo} width={48} height={28} />
          </Col>
          <Col>
            <Text level={3}>Crio ©2021. All right reserved</Text>
          </Col>
        </Row>
      </Col>
      <Col lg={10}>
        <Row justify='center' gutter={[35, 20]}>
          <Col lg={0} md={0}>
            <Row className='flex-direction' gutter={[0, 20]}>
              <Col key={'FAQ'}>
                <Link to={'/faq'}>
                  <Text level={3}>FAQ</Text>
                </Link>
              </Col>
              <Col>
                <a href={`mailto:info@criointeractive.com`}>
                  <Text level={3}>Contact Us</Text>
                </a>
              </Col>
            </Row>
          </Col>
          <Col lg={24}>
            <Row className='flex-direction' gutter={[20, 20]}>
              <Col xxl={2} xl={3} lg={3} md={3} sm={0} xs={0} key={'FAQ'}>
                <Link to={'/faq'}>
                  <Text level={3}>FAQ</Text>
                </Link>
              </Col>
              <Col xxl={4} xl={6} lg={6} md={6} sm={0} xs={0}>
                <a href={`mailto:info@criointeractive.com`}>
                  <Text level={3}>Contact Us</Text>
                </a>
              </Col>
              {links.map(({ to, label }) => (
                <Col key={label}>
                  <Link to={to}>
                    <Text level={3}>{label}</Text>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </Wrapper>
);

export default memo(Footer);
