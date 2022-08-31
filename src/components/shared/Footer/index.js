import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Text } from '@ui-kit';
import logo from '@images/crio-logo.svg';

const links = [
  { to: '/faq', label: 'FAQ' },
  { to: '/terms-of-use', label: 'Terms of Usage' },
  { to: '/terms-and-conditions', label: 'Terms and Conditions' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
];

const Footer = () => (
  <Row justify='space-around' gutter={[20]} padding_vertical={20} className='items-center'>
    <Col>
      <Row justify='center' align='center' gutter={[20]} className='items-center'>
        <Col>
          <img alt='Crio logo' src={logo} width={48} height={28} />
        </Col>
        <Col>
          <Text level={3}>Crio ©2021. All right reserved</Text>
        </Col>
      </Row>
    </Col>
    <Col>
      <Row justify='center' gutter={[20]}>
        <Col>
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
);

export default memo(Footer);
