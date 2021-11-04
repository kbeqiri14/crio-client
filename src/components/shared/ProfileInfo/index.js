import { memo, useCallback, useMemo } from 'react';
import { Col, Row } from 'antd';

import history from '@configs/history';
import { fields } from '@constants/visibility';
import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as CreatorIcon } from '@svgs/creator.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import profile from '@images/profile.png';
import './styles.less';

const ProfileInfo = ({ user = {}, isProfile, isFollowing, isCreator }) => {
  const {
    id,
    fbUserId,
    firstName,
    lastName,
    username,
    email,
    visibility,
  } = user;
  const size = useMemo(() => isFollowing ? 96 : 134, [isFollowing]);
  const name = useMemo(() => `${firstName || ''} ${lastName || ''}`, [firstName, lastName]);
  const source = useMemo(() => fbUserId
    ? `https://graph.facebook.com/${fbUserId}/picture?height=350&width=350`
    : profile,
    [fbUserId],
  );
  const visible = useMemo(() => {
    const main = !isProfile && !isFollowing;
    return {
      name: main || (!main && visibility?.includes(fields.NAME)),
      username: main || (!main && visibility?.includes(fields.USERNAME)),
      email: main || (!main && visibility?.includes(fields.EMAIL)),
    };
  }, [isFollowing, isProfile, visibility]);
  const visitProfile = useCallback(() => isFollowing && history.push(`/profile/${id}`), [isFollowing, id]);

  return (
    <Row align='middle' gutter={30} className={`profile ${isFollowing ? 'following' : ''}`}>
      <Col>
        <img alt='profile' src={source} width={size} height={size} onClick={visitProfile} />
        {isCreator && <CreatorIcon className='creator-icon' />}
      </Col>
      <Col className='info'>
        {visible.name && <Title level={10} color='white' onClick={visitProfile}>{name}</Title>}
        {visible.username && <Title level={30} color='white' onClick={visitProfile}>@{username}</Title>}
        {visible.email && <Text level={10} color='white_75'>
          <MailIcon />
          {isProfile || isFollowing ? <a href={`mailto:${email}`}>{email}</a> : email}
        </Text>}
      </Col>
    </Row>
  );
};

export default memo(ProfileInfo);
