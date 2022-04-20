import { memo, useMemo } from 'react';

import { Tabs } from '@ui-kit';
import Followings from './Followings';
import Works from './Works';

const { TabPane } = Tabs;

const tabs = {
  WORKS: '1',
};

const Details = ({ user, isProfile, isSubscribed, isLock }) => {
  const tab = useMemo(
    () =>
      user?.isCreator
        ? `Portfolio ${user?.artworksCount || ''}`
        : `Following ${user?.followingsCount || ''}`,
    [user?.isCreator, user?.artworksCount, user?.followingsCount],
  );

  return (
    <Tabs>
      <TabPane key={tabs.WORKS} tab={tab}>
        {user?.isCreator ? (
          <Works isProfile={isProfile} isLock={isLock} />
        ) : (
          <Followings user={user} isProfile={isProfile} isSubscribed={isSubscribed} />
        )}
      </TabPane>
    </Tabs>
  );
};

export default memo(Details);
