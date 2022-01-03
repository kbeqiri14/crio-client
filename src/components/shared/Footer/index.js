import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import logo from '@images/crio-logo.svg';

export const Footer = memo(() => (
  <footer className='crio-footer'>
    <Row justify='center' gutter={[150, 10]}>
      <Col className='pointer'>
        <Link to='/'>
          <img alt='Crio logo' src={logo} width={48} height={28} />
        </Link>
      </Col>
      <Col>
        <Text level='20' color='white_75'>
          Crio ©2021. All right reserved
        </Text>
      </Col>
      <Col className='crio-footer--links'>
        <a href={`mailto:info@criointeractive.com`}>
          <Title level='30' color='white_75'>
            Contact Us
          </Title>
        </a>
        <Link to='/terms-of-use'>
          <Text level='20' color='white_75'>
            Terms of Usage
          </Text>
        </Link>
        <Link to='/terms-and-conditions'>
          <Text level='20' color='white_75'>
            Terms and Conditions
          </Text>
        </Link>
        <Link to='/privacy-policy'>
          <Text level='20' color='white_75'>
            Privacy Policy
          </Text>
        </Link>
      </Col>
    </Row>
  </footer>
));
