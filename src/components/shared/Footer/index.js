import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Text, Title } from '@ui-kit/Text';
import crioLogo from '@images/crio-logo.svg';
import './styles.less';

export const Footer = memo(() => (
  <footer className='cr-landing__footer'>
    <Row justify='stretch' align='top' className='cr-landing__footer-wrapper'>
      <Col span={8} className='cr-landing__footer-logo'>
        <Link to='/'>
          <img alt='Crio logo' src={crioLogo} />
        </Link>
      </Col>
      <Col span={8}>
        <Text level='20'>Crio ©2021. All right reserved</Text>
      </Col>
      <Col className='cr-landing__footer--links' span={8}>
        <div className='cr-legal-docs'>
          <Title level='30'>
            <a href={`mailto:info@criointeractive.com`}>Contact Us</a>
          </Title>
          <Text level='20'>
            <Link to='/terms-of-use'>Terms of Usage</Link>
          </Text>
          <Text level='20'>
            <Link to='/terms-and-conditions'>Terms and Conditions</Link>
          </Text>
          <Text level='20'>
            <Link to='/privacy-policy'>Privacy Policy</Link>
          </Text>
        </div>
      </Col>
    </Row>
  </footer>
));
