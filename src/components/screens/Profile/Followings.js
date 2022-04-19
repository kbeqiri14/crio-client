import { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import history from '@app/configs/history';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { Col, Row, Text, Title } from '@ui-kit';
import { ReactComponent as CreatorIcon } from '@svgs/verified.svg';
import EmptyState from '@shared/EmptyStateFan';

const StyledRow = styled(Row)`
  width: 387px;
  padding: 20px 10px;
  background: ${(props) => props.theme.colors.dark100};
  border: 1px solid ${(props) => props.theme.colors.white};
  border-radius: 30px;
  img {
    border-radius: 100%;
    width: 45px;
    height: 45px;
  }
  svg {
    position: absolute;
    bottom: 0;
    left: 45px;
    width: 12px;
    height: 12px;
  }
  .ant-row {
    width: 247px;
  }
`;
const FollowingCard = ({ user }) => {
  const { providerType, providerUserId, firstName, lastName, username, avatar } = user || {};
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
  const name = useMemo(() => `${firstName || ''} ${lastName || ''}`, [firstName, lastName]);
  const goToProfile = useCallback(() => history.push(`/profile/${username}`), [username]);

  return (
    <StyledRow align='middle' gutter={20} onClick={goToProfile}>
      <Col>
        <img alt='profile' src={avatarUrl} />
        <CreatorIcon />
      </Col>
      <Col>
        <Row gutter={[0, 8]}>
          <Col span={24}>
            <Title level={2} color='white' ellipsis>
              @{username}
            </Title>
          </Col>
          <Col span={24}>
            <Text level={3} color='white'>
              {name}
            </Text>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
};

const Followings = ({ user, followings }) => {
  return followings?.length ? (
    <Row gutter={[20, 20]}>
      {followings?.map((following) => (
        <Col>
          <FollowingCard key={following.id} user={following} />
        </Col>
      ))}
    </Row>
  ) : user ? (
    <EmptyState isSubscribed={user.isSubscribed} />
  ) : null;
};

export default memo(Followings);
