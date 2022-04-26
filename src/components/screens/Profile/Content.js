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
    () =>
      isCreator
        ? `Artwork ${artworksCount || ''}`
        : `Following ${(isSubscribed && followingsCount) || ''}`,
    [isCreator, isSubscribed, artworksCount, followingsCount],
  );

  return (
    <Tabs>
      <TabPane key={tabs.WORKS} tab={tab}>
        {isCreator ? (
          <Works isProfile={isProfile} isLock={isLock} />
        ) : (
          <Followings username={username} isProfile={isProfile} isSubscribed={isSubscribed} />
        )}
      </TabPane>
    </Tabs>
  );
};

export default memo(ProfileContent);
