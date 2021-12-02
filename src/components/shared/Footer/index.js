import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Text } from '@ui-kit/Text';
import { FACEBOOK_LINK, INSTAGRAM_LINK, TWITTER_LINK } from '@configs/environment';
import crioLogo from '@images/crio-logo.svg';
import { ReactComponent as FacebookIcon } from '@svgs/facebook.svg';
import { ReactComponent as InstaIcon } from '@svgs/instagram.svg';
import { ReactComponent as TwitterIcon } from '@svgs/twitter.svg';
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
        <div>
          <a
            href={FACEBOOK_LINK}
            rel='noopener noreferrer nofollow'
            target='_blank'
            className='cr-social-link'
          >
            <FacebookIcon />
          </a>
          <a
            href={TWITTER_LINK}
            rel='noopener noreferrer nofollow'
            target='_blank'
            className='cr-social-link'
          >
            <TwitterIcon />
          </a>
          <a
            href={INSTAGRAM_LINK}
            rel='noopener noreferrer nofollow'
            target='_blank'
            className='cr-social-link'
          >
            <InstaIcon />
          </a>
        </div>
        <div className='cr-legal-docs'>
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
