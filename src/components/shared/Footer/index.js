import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Text } from '@ui-kit/Text';
import crioLogo from '@images/crio-logo.svg';
import { ReactComponent as FacebookIcon } from '@svgs/facebook.svg';
import { ReactComponent as InstaIcon } from '@svgs/instagram.svg';
import { ReactComponent as TwitterIcon } from '@svgs/twitter.svg';
import './styles.less';

export const Footer = memo(() => (
  <footer className='cr-landing__footer'>
    <Row justify='space-between' align='middle' className='cr-landing__footer-wrapper'>
      <Col className='cr-landing__footer-logo'>
        <Link to='/'>
          <img alt='Crio logo' src={crioLogo} />
        </Link>
      </Col>
      <Col>
        <Text level='20'>Crio ©2021. All right reserved</Text>
      </Col>
      <Col>
        <a
          href='https://facebook.com'
          rel='noopener noreferrer nofollow'
          target='_blank'
          className='cr-social-link'
        >
          <FacebookIcon />
        </a>
        <a
          href='https://twitter.com'
          rel='noopener noreferrer nofollow'
          target='_blank'
          className='cr-social-link'
        >
          <TwitterIcon />
        </a>
        <a
          href='https://instagram.com'
          rel='noopener noreferrer nofollow'
          target='_blank'
          className='cr-social-link'
        >
          <InstaIcon />
        </a>
      </Col>
    </Row>
  </footer>
));
