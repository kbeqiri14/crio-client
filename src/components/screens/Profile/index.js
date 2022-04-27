import { memo, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getUser } from '@app/graphql/queries/users.query';
import { Col, Layout, Row, Text } from '@ui-kit';
import { ReactComponent as NotFoundUser } from '@svgs/fallowing-empty.svg';
import ProfileSider from '@root/src/components/screens/Profile/Sider';
import ProfileContent from '@root/src/components/screens/Profile/Content';

const { Sider, Content } = Layout;

export const Profile = () => {
  const { pathname } = useLocation();
  const { user: loggedInUser } = useLoggedInUser();
  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const [requestUser, { data: userData, loading }] = useLazyQuery(getUser, {
    variables: { username },
  });

  const user = useMemo(
    () => (username === loggedInUser.username ? loggedInUser : userData?.getUser),
    [loggedInUser, userData?.getUser, username],
  );
  const isProfile = useMemo(
    () => username !== loggedInUser.username,
    [loggedInUser.username, username],
  );
  const hideButton = useMemo(
    () => !loggedInUser.username || (isProfile && loggedInUser.isCreator),
    [isProfile, loggedInUser.isCreator, loggedInUser.username],
  );
  const isLock = useMemo(
    () => !(!isProfile || loggedInUser.isCreator || user?.isFollowing),
    [isProfile, loggedInUser.isCreator, user?.isFollowing],
  );

  useEffect(() => {
    if (username !== loggedInUser.username) {
      requestUser();
    }
  }, [username, loggedInUser.username, requestUser]);

  if (!loading && !user) {
    return (
      <Row justify='center' align='middle' className='full-height'>
        <Col>
          <Row justify='center'>
            <Col>
              <NotFoundUser />
            </Col>
            <Col span={24} align='center'>
              <Text level={3} color='white'>
                No result
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
  return (
    <Layout>
      <Sider>
        <ProfileSider
          user={user}
          isProfile={isProfile}
          isSubscribed={loggedInUser.isSubscribed}
          hideButton={hideButton}
        />
      </Sider>
      <Layout>
        <Content>
          <ProfileContent
            username={user?.username}
            artworksCount={user?.artworksCount}
            followingsCount={user?.followingsCount}
            isCreator={user?.isCreator}
            isProfile={isProfile}
            isSubscribed={loggedInUser.isSubscribed}
            isLock={isLock}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(Profile);
