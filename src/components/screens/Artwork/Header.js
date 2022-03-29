import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { Title } from '@ui-kit/Text';

export const Header = ({ providerType, providerUserId, avatar, title, name }) => {
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);

  return (
    <Row align='middle'>
      <Col className='author-avatar'>
        {providerUserId && <img src={avatarUrl} alt='Author avatar' />}
      </Col>
      <Col>
        <Row>
          <Col span={24}>
            <Title level='10' color='white' inline>
              {title}
            </Title>
          </Col>
          <Col span={24}>
            <Title level='20' color='primary' inline>
              <Link to={`/profile/${name}`}>{name}</Link>
            </Title>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(Header);
