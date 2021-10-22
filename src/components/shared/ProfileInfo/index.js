import { memo } from 'react';
import { Col, Row } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as CreatorIcon } from '@svgs/creator.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import profile from '@images/profile.png';
import './styles.less';

const ProfileInfo = ({ name, username, email, src, isCreator }) => (
  <Row align='middle' gutter={30} className='profile-info'>
    <Col>
      <img alt='profile' src={src || profile} />
      {isCreator && <CreatorIcon className='creator-icon' />}
    </Col>
    <Col>
      <Title level={10} color='white'>
        {name}
      </Title>
      {username && <Title level={30} color='white'>
        @{username}
      </Title>}
      {email && (
        <Text level={10} color='white_75'>
          <MailIcon />
          <a href={`mailto:${email}`}>{email}</a>
        </Text>
      )}
    </Col>
  </Row>
);

export default memo(ProfileInfo);
