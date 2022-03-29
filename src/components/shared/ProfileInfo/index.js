import { memo, useCallback, useMemo } from 'react';
import { Col, Row } from 'antd';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import history from '@configs/history';
import { fields } from '@constants/visibility';
import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as CreatorIcon } from '@svgs/creator.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import './styles.less';

const ProfileInfo = ({ user, followersCount, isCreator, isProfile, isFollowing }) => {
  const { providerType, providerUserId, firstName, lastName, username, email, avatar, visibility } =
    user || {};
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);

  const myAccount = useMemo(() => !isProfile && !isFollowing, [isProfile, isFollowing]);
  const size = useMemo(() => (isFollowing ? 96 : 134), [isFollowing]);
  const name = useMemo(() => `${firstName || ''} ${lastName || ''}`, [firstName, lastName]);
  const visible = useMemo(
    () => ({
      name: myAccount || (!myAccount && visibility?.includes(fields.NAME)),
      email: myAccount || (!myAccount && visibility?.includes(fields.EMAIL)),
    }),
    [myAccount, visibility],
  );

  const visitProfile = useCallback(
    () => isFollowing && history.push(`/profile/${username}`),
    [isFollowing, username],
  );

  return (
    <Row align='middle' gutter={30} className={`profile ${isFollowing ? 'following' : ''}`}>
      <Col>
        <img alt='profile' src={avatarUrl} width={size} height={size} onClick={visitProfile} />
        {(isCreator || isProfile) && <CreatorIcon className='creator-icon' />}
      </Col>
      <Col className='info'>
        {visible.name && (
          <Title level={10} color='white' onClick={visitProfile}>
            {name}
          </Title>
        )}
        <Title level={30} color='white' onClick={visitProfile}>
          @{username}
        </Title>
        {visible.email && (
          <Text level={10} color='white_75'>
            <MailIcon />
            {isProfile || isFollowing ? <a href={`mailto:${email}`}>{email}</a> : email}
          </Text>
        )}
        {!(myAccount && !isCreator) && !isFollowing && (
          <Title level={30} color='white'>
            Followers: {followersCount}
          </Title>
        )}
      </Col>
    </Row>
  );
};

export default memo(ProfileInfo);
