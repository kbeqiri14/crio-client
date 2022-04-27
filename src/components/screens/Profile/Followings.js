import { memo, useCallback, useMemo } from 'react';
import { Badge } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import history from '@app/configs/history';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { getFollowings } from '@app/graphql/queries/users.query';
import { Col, Row, Text, Title } from '@ui-kit';
import { ReactComponent as CreatorIcon } from '@svgs/verified.svg';
import EmptyState from '@root/src/components/shared/EmptyState';

const StyledCard = styled('div')`
  width: 372px;
  margin-top: 40px;
  padding: 20px;
  background: ${(props) => props.theme.colors.dark100};
  border: 1px solid ${(props) => props.theme.colors.white};
  border-radius: 30px;
`;
const FollowingCard = ({ user }) => {
  const { providerType, providerUserId, firstName, lastName, username, avatar } = user || {};
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
  const name = useMemo(() => `${firstName || ''} ${lastName || ''}`, [firstName, lastName]);
  const goToProfile = useCallback(() => history.push(`/profile/${username}`), [username]);

  return (
    <StyledCard>
      <Row align='middle' gutter={20} onClick={goToProfile}>
        <Col>
          <Badge count={<CreatorIcon width={12} height={12} />} offset={[-5, 39]}>
            <img
              alt='profile'
              width={45}
              height={45}
              src={avatarUrl}
              className='border-radius-100'
            />
          </Badge>
        </Col>
        <Col>
          <Row gutter={[0, 8]}>
            <Col span={24}>
              <Title level={2} color='white' ellipsis>
                @{username}
              </Title>
            </Col>
            <Col span={24}>
              <Text level={3} color='white' ellipsis>
                {name}
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledCard>
  );
};

const Followings = ({ username, isProfile, isSubscribed }) => {
  const { data: followings } = useQuery(getFollowings, {
    fetchPolicy: 'cache-and-network',
    ...(isProfile ? { variables: { username } } : {}),
  });
  console.log(isProfile, followings?.getFollowings?.length, 'isProfile');

  if (
    username &&
    ((!isProfile && (!isSubscribed || !followings?.getFollowings?.length)) ||
      (isProfile && !followings?.getFollowings?.length))
  ) {
    return <EmptyState username={username} isProfile={isProfile} isSubscribed={isSubscribed} />;
  }

  return followings?.getFollowings?.length ? (
    <Row gutter={[20, 20]}>
      {followings?.getFollowings?.map((following) => (
        <Col key={following.id}>
          <FollowingCard user={following} />
        </Col>
      ))}
    </Row>
  ) : null;
};

export default memo(Followings);
