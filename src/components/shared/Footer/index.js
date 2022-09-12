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
  @media (max-width: 1200px) {
    margin-right: 45px;
    .flex-direction {
      flex-direction: column;
    }
  }
  @media (max-width: 810px) {
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
      <Col xl={10} xxl={8}>
        <Row justify='center' align='center' className='items-center'>
          <Col padding_right={9}>
            <img alt='Crio logo' src={logo} width={48} height={28} />
          </Col>
          <Col padding_right={32}>
            <Text level={3}> Crio</Text>
          </Col>
          <Col>
            <Text level={3}> ©2021. All right reserved</Text>
          </Col>
        </Row>
      </Col>
      <Col xl={13} xxl={10}>
        <Row justify='center' gutter={[35, 20]}>
          <Col xl={0}>
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
          <Col xl={24}>
            <Row className='flex-direction' gutter={[20, 20]}>
              <Col xxl={2} xl={2} lg={0} md={0} sm={0} xs={0} key={'FAQ'}>
                <Link to={'/faq'}>
                  <Text level={3}>FAQ</Text>
                </Link>
              </Col>
              <Col xxl={4} xl={4} lg={0} md={0} sm={0} xs={0}>
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
