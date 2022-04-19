import { memo, useMemo } from 'react';
import { ReactComponent as CreatorIcon } from '@svgs/verified.svg';
import { ReactComponent as MailIcon } from '@svgs/mail-ic.svg';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { Col, Row, Text, Title } from '@ui-kit';

const ProfileInfo = ({ user }) => {
  const { providerType, providerUserId, firstName, lastName, username, email, avatar } = user || {};
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
  const name = useMemo(() => `${firstName || ''} ${lastName || ''}`, [firstName, lastName]);
  console.log(user, 'useruser', avatarUrl);

  return (
    <Row justify='center' direction='column'>
      <Col align='center' margin_bottom={20} className='profile-info'>
        <img alt='profile' width={122} height={122} src={avatarUrl} />
        <CreatorIcon className='creator-icon' />
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
      <Col align='center'>
        <Text level={3} color='dark25'>
          <MailIcon /> <a href={`mailto:${email}`}>{email}</a>
        </Text>
      </Col>
      <Col margin_bottom={40}></Col>
    </Row>
  );
};

export default memo(ProfileInfo);
