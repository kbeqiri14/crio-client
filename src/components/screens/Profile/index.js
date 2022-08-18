import { memo, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery, useReactiveVar } from '@apollo/client';

import { loggedInUserLoadingVar } from '@configs/client-cache';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getUser } from '@app/graphql/queries/users.query';
import { Layout } from '@ui-kit';
import ProfileSider from '@screens/Profile/Sider';
import ProfileContent from '@screens/Profile/Content';
import EmptyState from '@shared/EmptyState';

const { Sider, Content } = Layout;

export const Profile = () => {
  const { pathname } = useLocation();
  const { user: loggedInUser } = useLoggedInUser();
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);
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
    () =>
      !loggedInUser.username ||
      !isProfile ||
      (isProfile && (loggedInUser.isCreator || !user?.isCreator)),
    [isProfile, loggedInUser.username, loggedInUser.isCreator, user?.isCreator],
  );

  useEffect(() => {
    if (username !== loggedInUser.username) {
      requestUser();
    }
  }, [username, loggedInUser.username, requestUser]);

  if (!loggedInUserLoading && !loading && !user) {
    return <EmptyState isNoData />;
  }
  return (
    <>
      <Layout>
        <Sider width={355} breakpoint='lg' collapsedWidth={0}>
          <ProfileSider
            user={user}
            isProfile={isProfile}
            isSubscribed={loggedInUser.isSubscribed}
            hideButton={hideButton}
          />
        </Sider>
        <Layout style={{ overflowY: 'scroll' }}>
          <Content>
            {user?.username && (
              <ProfileContent
                username={user?.username}
                followingsCount={user?.followings?.length}
                productsCount={user?.productsCount}
                artworksCount={user?.artworksCount}
                isCreator={user?.isCreator}
                isProfile={isProfile}
                isSubscribed={loggedInUser.isSubscribed}
              />
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default memo(Profile);
