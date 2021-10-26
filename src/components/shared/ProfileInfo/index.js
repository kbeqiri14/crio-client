import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as CreatorIcon } from '@svgs/creator.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import profile from '@images/profile.png';
import './styles.less';

const ProfileInfo = ({ id, firstName, lastName, username, email, picture, isFollowing, isCreator }) => {
  const name = useMemo(() => `${firstName || ''} ${lastName || ''}`, [firstName, lastName]);

  return (
    <Row align='middle' gutter={30} className='profile-info'>
      <Col>
        <img alt='profile' src={picture || profile} />
        {isCreator && <CreatorIcon className='creator-icon' />}
      </Col>
      <Col>
        <Title level={10} color='white'>
          {isFollowing ? <Link to={`/profile/${id}`}>{name}</Link> : name}
        </Title>
        {username && (
          <Title level={30} color='white'>
            @{isFollowing ? <Link to={`/profile/${id}`}>{username}</Link> : username}
          </Title>
        )}
        {email && (
          <Text level={10} color='white_75'>
            <MailIcon />
            {isFollowing ? <a href={`mailto:${email}`}>{email}</a> : email}
          </Text>
        )}
      </Col>
    </Row>
  );
};

export default memo(ProfileInfo);
