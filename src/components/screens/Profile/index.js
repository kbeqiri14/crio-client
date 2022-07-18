import { memo, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Helmet } from 'react-helmet';

import { loggedInUserLoadingVar } from '@configs/client-cache';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { getUser } from '@app/graphql/queries/users.query';
import NotFound from '@shared/NotFound';
import { Layout } from '@ui-kit';
import { ReactComponent as NotFoundUserIcon } from '@svgs/not-found-user.svg';
import ProfileSider from '@root/src/components/screens/Profile/Sider';
import ProfileContent from '@root/src/components/screens/Profile/Content';

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
  const avatarUrl = useAvatarUrl(user?.providerType, user?.providerUserId, user?.avatar);

  useEffect(() => {
    if (username !== loggedInUser.username) {
      requestUser();
    }
  }, [username, loggedInUser.username, requestUser]);

  if (!loggedInUserLoading && !loading && !user) {
    return <NotFound text='No Result' icon={<NotFoundUserIcon />} />;
  }
  return (
    <>
      <Helmet>
        <meta name='description' content={'description'} />
        <meta property='og:url' content={`https://criointeractive.com/${username}`} />
        <meta property='og:image' content={avatarUrl} />
        <meta property='twitter:url' content={`https://criointeractive.com/${username}`} />
        <meta property='twitter:image' content={avatarUrl} />
      </Helmet>
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
