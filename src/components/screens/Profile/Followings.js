import { memo, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';

import history from '@app/configs/history';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { getFollowings } from '@app/graphql/queries/users.query';
import { Col, Row, Text, Title } from '@ui-kit';
import { ReactComponent as CreatorIcon } from '@svgs/verified.svg';
import EmptyState from '@shared/EmptyStateFan';

const StyledCard = styled('div')`
  width: 372px;
  margin-top: 40px;
  padding: 20px;
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

const Followings = ({ showEmptyState, isProfile, isSubscribed }) => {
  const [requestFollowings, { data: followings }] = useLazyQuery(getFollowings, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!isProfile) {
      requestFollowings();
    }
  }, [isProfile, requestFollowings]);

  return followings?.getFollowings?.length ? (
    <Row gutter={[20, 20]}>
      {followings?.getFollowings?.map((following) => (
        <Col key={following.id}>
          <FollowingCard user={following} />
        </Col>
      ))}
    </Row>
  ) : showEmptyState ? (
    <EmptyState isSubscribed={isSubscribed} />
  ) : null;
};

export default memo(Followings);
