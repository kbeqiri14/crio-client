import { memo, useMemo } from 'react';
import { Tabs } from 'antd';

import Followings from './Followings';
import Works from './Works';

const { TabPane } = Tabs;

const tabs = {
  WORKS: '1',
};

const Details = ({ user, isProfile }) => {
  const tab = useMemo(
    () =>
      user?.isCreator
        ? `WORKS ${user?.artworksCount || ''}`
        : `FOLLOWING ${user?.followingsCount || ''}`,
    [user?.isCreator, user?.artworksCount, user?.followingsCount],
  );

  return (
    <Tabs>
      <TabPane key={tabs.WORKS} tab={tab}>
        {user?.isCreator ? (
          <Works name={user.username} isLock={!user.isCreator} />
        ) : (
          <Followings user={user} isProfile={isProfile} />
        )}
      </TabPane>
    </Tabs>
  );
};

export default memo(Details);
