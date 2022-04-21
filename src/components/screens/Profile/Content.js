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
  artworksCount,
  followingsCount,
  isCreator,
  isProfile,
  isSubscribed,
  isLock,
}) => {
  const tab = useMemo(
    () => (isCreator ? `Artwork ${artworksCount || ''}` : `Following ${followingsCount || ''}`),
    [isCreator, artworksCount, followingsCount],
  );

  return (
    <Tabs>
      <TabPane key={tabs.WORKS} tab={tab}>
        {isCreator ? (
          <Works isProfile={isProfile} isLock={isLock} />
        ) : (
          <Followings
            showEmptyState={username && !followingsCount}
            isProfile={isProfile}
            isSubscribed={isSubscribed}
          />
        )}
      </TabPane>
    </Tabs>
  );
};

export default memo(ProfileContent);
