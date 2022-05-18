import { memo, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { getUserArtworks } from '@app/graphql/queries/artworks.query';
import { getUserProducts } from '@app/graphql/queries/products.query';
import { Tabs } from '@ui-kit';
import Followings from './Followings';
import Content from '@root/src/components/shared/CreatorContent';

const { TabPane } = Tabs;

const tabs = {
  MARKETPLACE: 'Marketplace',
  ARTWORK: 'Artwork',
  FOLLOWING: 'Following',
};

const ProfileContent = ({ username, followingsCount, isCreator, isProfile, isSubscribed }) => {
  const tab = useMemo(() => {
    const count = (isProfile ? followingsCount : isSubscribed && followingsCount) || '';
    return count ? `${tabs.FOLLOWING}: ${count}` : tabs.FOLLOWING;
  }, [isProfile, isSubscribed, followingsCount]);

  const { pathname } = useLocation();
  // const [initialPolling, setInitialPolling] = useState(true);

  const [requestArtworks, { data: Artworks }] = useLazyQuery(getUserArtworks, {
    variables: { username: pathname.split('/').slice(-1)[0] || undefined },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    pollInterval: 30000,
    // onCompleted: ({ getUserArtworks }) => {
    //   setInitialPolling(false);
    //   setWorks(getUserArtworks);
    // },
  });

  const [requestProducts, { data: Products }] = useLazyQuery(getUserProducts, {
    variables: { username: pathname.split('/').slice(-1)[0] || undefined },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    pollInterval: 30000,
    // onCompleted: ({ getUserArtworks }) => {
    //   setInitialPolling(false);
    //   setWorks(getUserArtworks);
    // },
  });

  useEffect(() => {
    if (isCreator) {
      requestArtworks();
      requestProducts();
    }
  }, [isCreator, requestArtworks, requestProducts]);

  if (isCreator) {
    return (
      <Content productsList={Products?.getUserProducts} postersList={Artworks?.getUserArtworks} />
    );
  }
  return (
    <Tabs>
      <TabPane key='Following' tab={tab}>
        <Followings username={username} isProfile={isProfile} isSubscribed={isSubscribed} />
      </TabPane>
    </Tabs>
  );
};

export default memo(ProfileContent);
