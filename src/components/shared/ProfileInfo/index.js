import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as CreatorIcon } from '@svgs/creator.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import profile from '@images/profile.png';
import './styles.less';

const ProfileInfo = ({
  id,
  firstName,
  lastName,
  username,
  email,
  picture,
  visibility,
  isProfile,
  isFollowing,
  isCreator,
}) => {
  const name = useMemo(() => `${firstName || ''} ${lastName || ''}`, [firstName, lastName]);
  const size = useMemo(() => isFollowing ? 96 : 134, [isFollowing]);

  return (
    <Row align='middle' gutter={30} className='profile-info'>
      <Col>
        <img alt='profile' src={picture || profile} width={size} height={size} />
        {isCreator && <CreatorIcon className='creator-icon' />}
      </Col>
      <Col className={isFollowing ? 'info' : ''}>
        {visibility?.name === 'public' && <Title level={10} color='white'>
          {isFollowing ? <Link to={`/profile/${id}`}>{name}</Link> : name}
        </Title>}
        {visibility?.username === 'public' && <Title level={30} color='white'>
          @{isFollowing ? <Link to={`/profile/${id}`}>{username}</Link> : username}
        </Title>}
        {visibility?.email === 'public' && (
          <Text level={10} color='white_75'>
            <MailIcon />
            {isProfile || isFollowing ? <a href={`mailto:${email}`}>{email}</a> : email}
          </Text>
        )}
      </Col>
    </Row>
  );
};

export default memo(ProfileInfo);
