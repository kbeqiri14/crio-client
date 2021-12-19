import { memo, useCallback, useMemo } from 'react';
import { Col, Row } from 'antd';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import history from '@configs/history';
import { fields } from '@constants/visibility';
import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as CreatorIcon } from '@svgs/creator.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import './styles.less';

const ProfileInfo = ({ user, followingsCount, isProfile, isFollowing, isCreator }) => {
  const {
    userId,
    providerType,
    providerUserId,
    firstName,
    lastName,
    username,
    email,
    avatar,
    visibility,
  } = user || {};
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);

  const size = useMemo(() => (isFollowing ? 96 : 134), [isFollowing]);
  const name = useMemo(() => `${firstName || ''} ${lastName || ''}`, [firstName, lastName]);
  const visible = useMemo(() => {
    const main = !isProfile && !isFollowing;
    return {
      name: main || (!main && visibility?.includes(fields.NAME)),
      username: main || (!main && visibility?.includes(fields.USERNAME)),
      email: main || (!main && visibility?.includes(fields.EMAIL)),
    };
  }, [isFollowing, isProfile, visibility]);
  const visitProfile = useCallback(
    () => isFollowing && history.push(`/profile/${userId}`),
    [isFollowing, userId],
  );

  return (
    <Row align='middle' gutter={30} className={`profile ${isFollowing ? 'following' : ''}`}>
      <Col>
        <img alt='profile' src={avatarUrl} width={size} height={size} onClick={visitProfile} />
        {isCreator && <CreatorIcon className='creator-icon' />}
      </Col>
      <Col className='info'>
        {visible.name && (
          <Title level={10} color='white' onClick={visitProfile}>
            {name}
          </Title>
        )}
        {visible.username && (
          <Title level={30} color='white' onClick={visitProfile}>
            @{username}
          </Title>
        )}
        {visible.email && (
          <Text level={10} color='white_75'>
            <MailIcon />
            {isProfile || isFollowing ? <a href={`mailto:${email}`}>{email}</a> : email}
          </Text>
        )}
        {isCreator && !isProfile && !isFollowing && (
          <Title level={30} color='white'>
            Followers: {followingsCount}
          </Title>
        )}
      </Col>
    </Row>
  );
};

export default memo(ProfileInfo);
