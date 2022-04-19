import { memo, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Skeleton } from 'antd';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getFollowings, getUser } from '@app/graphql/queries/users.query';
import { Col, Layout, Row } from '@ui-kit';
import ProfileInfo from '../../shared/ProfileInfo';
import ActionButton from '@root/src/components/screens/Profile/ActionButton';
import Details from '@root/src/components/screens/Profile/Details';
import CreatorInfo from './CreatorInfo';

const { Sider, Content } = Layout;

export const CreatorProfile = () => {
  const { pathname } = useLocation();
  const { user: loggedInUser } = useLoggedInUser();
  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const [requestFollowings, { data: followings, loading: loadingFollowings }] = useLazyQuery(
    getFollowings,
    { fetchPolicy: 'cache-and-network' },
  );
  const [requestUser, { data: userData }] = useLazyQuery(getUser, { variables: { username } });
  const user = useMemo(
    () => (username === loggedInUser.username ? loggedInUser : userData?.getUser),
    [loggedInUser, userData?.getUser, username],
  );

  useEffect(() => {
    if (username !== loggedInUser.username) {
      requestUser();
    }
  }, [username, loggedInUser.username, requestUser]);

  useEffect(() => {
    if (!user?.isCreator) {
      requestFollowings();
    }
  }, [user?.isCreator, requestFollowings]);

  return (
    <Layout>
      <Sider>
        <Row
          justify='center'
          padding_top={80}
          padding_horizontal={28}
          padding_bottom={20}
          gutter={[0, 40]}
        >
          <Col span={24} align='center'>
            <Row justify='center' direction='column'>
              <Col align='center' margin_bottom={20} className='profile-info'>
                <Skeleton
                  round
                  active
                  avatar={{ size: 122 }}
                  title={false}
                  paragraph={false}
                  loading={!user?.username}
                />
                <Skeleton
                  round
                  active
                  title={{ width: '100%' }}
                  paragraph={{ rows: 5, width: '100%' }}
                  loading={!user?.username}
                />
              </Col>
            </Row>
          </Col>
          {user?.username && (
            <>
              <Col>
                <ProfileInfo user={user} />
              </Col>
              <Col>
                <ActionButton />
              </Col>
              {user?.isCreator && (
                <Col>
                  <CreatorInfo user={user} />
                </Col>
              )}
            </>
          )}
        </Row>
      </Sider>
      <Layout>
        <Content>
          <Details
            user={user}
            name={userData?.getUser?.username}
            artworksCount={userData?.getUser?.artworksCount}
            isAuthenticated={user?.id}
            isCreator={user?.isCreator}
            followings={followings}
            // isFollow={isFollow}
            // loadingIsFollowing={loadingIsFollowing}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(CreatorProfile);
