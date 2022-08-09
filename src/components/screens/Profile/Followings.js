import { memo, useCallback, useMemo } from 'react';
import { Badge, Skeleton } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import history from '@configs/history';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { getFollowings } from '@app/graphql/queries/users.query';
import { Col, Row, Text, Title } from '@ui-kit';
import { ReactComponent as CreatorIcon } from '@svgs/verified.svg';
import EmptyState from '@shared/EmptyState';

const StyledCard = styled('div')`
  width: 332px;
  padding: 20px;
  background: rgba(32, 32, 32, 0.5);
  border-radius: 15px;
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${(props) => props.theme.colors.dark50};
  }
  .ant-skeleton-header {
    vertical-align: middle;
  }
  .ant-skeleton-content {
    .ant-skeleton-title {
      margin: 0;
    }
    .ant-skeleton-paragraph {
      margin: 26px 0 0 !important;
    }
  }
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
        <Col max_width={245}>
          <Row gutter={[0, 8]}>
            <Col span={24}>
              <Title level={2} ellipsis={{ tooltip: username }}>
                @{username}
              </Title>
            </Col>
            <Col span={24}>
              <Text level={3} ellipsis={{ tooltip: name }}>
                {name}
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledCard>
  );
};

const Followings = ({ username, isProfile, isSubscribed, followingsCount }) => {
  const { data: followings, loading } = useQuery(getFollowings, {
    fetchPolicy: 'cache-and-network',
    ...(isProfile ? { variables: { username } } : {}),
  });
  const dummyArray = useMemo(() => new Array(followingsCount || 6).fill(), [followingsCount]);
  const isEmpty =
    username &&
    ((!isProfile && (!isSubscribed || !followings?.getFollowings?.length)) ||
      (isProfile && !followings?.getFollowings?.length));

  if (loading) {
    return (
      <Row gutter={[20, 20]}>
        {dummyArray.map((_, index) => (
          <Col key={index}>
            <StyledCard>
              <Skeleton active round avatar paragraph={{ rows: 1 }} title={{ width: '100%' }} />
            </StyledCard>
          </Col>
        ))}
      </Row>
    );
  }

  if (isEmpty && !loading) {
    return <EmptyState username={username} isProfile={isProfile} isSubscribed={isSubscribed} />;
  }

  return (
    <Row gutter={[20, 20]}>
      {followings?.getFollowings?.map((following) => (
        <Col key={following.id}>
          <FollowingCard user={following} />
        </Col>
      ))}
    </Row>
  );
};

export default memo(Followings);
