import { memo, useMemo } from 'react';
import { Tabs } from 'antd';

import { ReactComponent as Subscription } from '@svgs/subscription.svg';
import { Spinner } from '@ui-kit/Spinner';
import Followings from '../Followings';
import Works from '../Works';
import './styles.less';

const { TabPane } = Tabs;

const tabs = {
  WORKS: '1',
};

const Details = ({
  user,
  name,
  artworksCount,
  isProfile,
  isCreator,
  isFollow,
  isAuthenticated,
  loadingIsFollowing,
  loadingFollowings,
  followings,
}) => {
  const isSubscribed = useMemo(() => user?.subscribePeriodIsValid && user?.isSubscribed, [user]);
  const tab = useMemo(
    () =>
      isCreator || isProfile
        ? `WORKS ${(isProfile ? artworksCount : user?.artworksCount) || ''}`
        : `FOLLOWING ${followings?.length || ''}`,
    [isCreator, isProfile, user?.artworksCount, artworksCount, followings?.length],
  );

  return (
    <div className='profile-details'>
      <Tabs>
        <TabPane key={tabs.WORKS} tab={tab}>
          {isCreator || isProfile ? (
            loadingIsFollowing ? (
              <Spinner spinning={true} color='white' />
            ) : (
              <Works
                name={name}
                isProfile={isProfile}
                isLock={!(!isProfile || isCreator || isFollow)}
              />
            )
          ) : (
            <Followings
              user={user}
              followings={followings?.getFollowings}
              loadingFollowings={loadingFollowings}
            />
          )}
        </TabPane>
      </Tabs>
      {isAuthenticated && !isCreator && isProfile && !isSubscribed && (
        <Subscription className='subscription-icon' />
      )}
    </div>
  );
};

export default memo(Details);
