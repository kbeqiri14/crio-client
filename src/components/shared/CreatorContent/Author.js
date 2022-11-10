import { memo } from 'react';
import { Link } from 'react-router-dom';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { Col, Row, Text } from '@ui-kit';
import { ReactComponent as LikeIcon } from '@svgs/like-gray.svg';

const Author = ({ providerType, providerUserId, avatar, username, likes = 0, hide = () => {} }) => {
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);

  return (
    <Link to={`/profile/${username}`} onClick={hide}>
      <Row justify='space-between' align='middle' padding_top={8}>
        <Col>
          <Row gutter={12}>
            <Col>
              <img
                src={avatarUrl}
                width={30}
                height={30}
                alt='avatar'
                className='border-radius-100'
              />
            </Col>
            <Col max_width={309}>
              <Text level={3} ellipsis={{ tooltip: username }}>
                {username}
              </Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={5}>
            <Col>
              <LikeIcon />
            </Col>
            <Col>
              <Text level={3}>{likes}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Link>
  );
};

export default memo(Author);
