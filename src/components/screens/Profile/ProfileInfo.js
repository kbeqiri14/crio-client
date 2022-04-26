import { memo, useMemo } from 'react';
import { Badge } from 'antd';
import { ReactComponent as CreatorIcon } from '@svgs/verified.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { Col, Row, Text, Title } from '@ui-kit';

const ProfileInfo = ({ user, isProfile }) => {
  const { providerType, providerUserId, firstName, lastName, username, email, avatar } = user || {};
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
  const name = useMemo(() => `${firstName || ''} ${lastName || ''}`, [firstName, lastName]);

  return (
    <Row justify='center' direction='column'>
      <Col align='center' margin_bottom={20}>
        {user.isCreator ? (
          <Badge count={<CreatorIcon />} offset={[-12, 105]}>
            <img
              alt='profile'
              width={122}
              height={122}
              src={avatarUrl}
              className='border-radius-100'
            />
          </Badge>
        ) : (
          <img
            alt='profile'
            width={122}
            height={122}
            src={avatarUrl}
            className='border-radius-100'
          />
        )}
      </Col>
      <Col align='center' margin_bottom={8}>
        <Title level={2} color='white'>
          @{username}
        </Title>
      </Col>
      <Col align='center' margin_bottom={8}>
        <Text level={3} color='white'>
          {name}
        </Text>
      </Col>
      <Col align='center' className='mail-icon'>
        <Text level={3} color='dark25' ellipsis={{ tooltip: email }}>
          <MailIcon /> {isProfile ? <a href={`mailto:${email}`}>{email}</a> : email}
        </Text>
      </Col>
    </Row>
  );
};

export default memo(ProfileInfo);
