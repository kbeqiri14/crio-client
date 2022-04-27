import { memo, useMemo } from 'react';

import { Tabs } from '@ui-kit';
import Followings from './Followings';
import Works from './Works';

const { TabPane } = Tabs;

const tabs = {
  WORKS: '1',
};

const ProfileContent = ({
  username,
  followingsCount,
  isCreator,
  isProfile,
  isSubscribed,
  isLock,
}) => {
  const tab = useMemo(() => {
    if (isCreator) {
      return 'Artwork';
    }
    const count = (isProfile ? followingsCount : isSubscribed && followingsCount) || '';
    return count ? `Following: ${count}` : 'Following';
  }, [isCreator, isProfile, isSubscribed, followingsCount]);

  return (
    <Tabs>
      <TabPane key={tabs.WORKS} tab={tab}>
        {isCreator ? (
          <Works username={username} isProfile={isProfile} isLock={isLock} />
        ) : (
          <Followings username={username} isProfile={isProfile} isSubscribed={isSubscribed} />
        )}
      </TabPane>
    </Tabs>
  );
};

export default memo(ProfileContent);
