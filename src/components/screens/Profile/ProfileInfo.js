import { memo, useMemo } from 'react';
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
        <div className='avatar'>
          <img alt='profile' width={122} height={122} src={avatarUrl} />
          {user.isCreator && <CreatorIcon />}
        </div>
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
        <Text level={3} color='dark25'>
          <MailIcon /> {isProfile ? <a href={`mailto:${email}`}>{email}</a> : email}
        </Text>
      </Col>
      <Col margin_bottom={40}></Col>
    </Row>
  );
};

export default memo(ProfileInfo);
