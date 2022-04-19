import { memo, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getUser } from '@app/graphql/queries/users.query';
import { Layout } from '@ui-kit';
import ProfileSider from '@root/src/components/screens/Profile/Sider';
import ProfileContent from '@root/src/components/screens/Profile/Content';

const { Sider, Content } = Layout;

export const CreatorProfile = () => {
  const { pathname } = useLocation();
  const { user: loggedInUser } = useLoggedInUser();
  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

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

  return (
    <Layout>
      <Sider>
        <ProfileSider
          user={{ ...user, isSubscribed: user?.payment?.subscriptionStatus === 'active' }}
          isProfile={username !== loggedInUser.username}
        />
      </Sider>
      <Layout>
        <Content>
          <ProfileContent
            user={{ ...user, isSubscribed: user?.payment?.subscriptionStatus === 'active' }}
            isProfile={username !== loggedInUser.username}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(CreatorProfile);
