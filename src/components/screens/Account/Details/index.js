import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import { useLazyQuery } from '@apollo/client';

import history from '@app/configs/history';
import { isSubscriber } from '@app/graphql/queries/users.query';
import { Spinner } from '@ui-kit/Spinner';
import { ReactComponent as Subscription } from '@svgs/subscription.svg';
import Followings from '../../Profile/Followings';
import Works from '../../Profile/Works';
import Perks from '../../Profile/Perks';
import './styles.less';

const { TabPane } = Tabs;

const tabs = {
  WORKS: '1',
  PERKS: '2',
};

const Details = ({
  id,
  isProfile,
  isCreator,
  isFollow,
  loadingIsFollowing,
  loadingFollowings,
  followings,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { pathname } = useLocation();
  const activeKey = useMemo(
    () => (pathname.split('/').includes('perks') ? tabs.PERKS : tabs.WORKS),
    [pathname],
  );
  const tab = useMemo(
    () => (isCreator || isProfile ? 'WORKS 126' : `FOLLOWING: ${followings?.length || ''}`),
    [isCreator, isProfile, followings?.length],
  );
  const onTabClick = useCallback(
    (key) => {
      const followingId = id ? `/${id}` : '';
      return history.push(
        `${id ? '/profile' : '/account'}${key === tabs.PERKS ? '/perks' : ''}${followingId}`,
      );
    },
    [id],
  );
  const [requestIsSubscriber, { loading: loadingIsSubscriber }] = useLazyQuery(isSubscriber, {
    variables: { subscriberId: id },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data?.isSubscriber) {
        setIsSubscribed(true);
      }
    },
  });

  useEffect(() => {
    if (id) {
      requestIsSubscriber();
    }
  }, [id, requestIsSubscriber]);

  return (
    <div className='profile-details'>
      <Tabs defaultActiveKey={activeKey} onTabClick={onTabClick}>
        <TabPane key={tabs.WORKS} tab={tab}>
          {isCreator || isProfile ? (
            loadingIsFollowing ? (
              <Spinner spinning={true} color='white' />
            ) : (
              <Works isLock={isProfile && !isFollow} />
            )
          ) : (
            <Followings followings={followings} loadingFollowings={loadingFollowings} />
          )}
        </TabPane>
        {(isCreator || isProfile) && (
          <TabPane key={tabs.PERKS} tab='PERKS'>
            <Perks isProfile={isProfile} loadingIsSubscriber={loadingIsSubscriber} isSubscribed={isSubscribed} />
          </TabPane>
        )}
      </Tabs>
      {isProfile && !isSubscribed && !loadingIsSubscriber && <Subscription className='subscription-icon' />}
    </div>
  );
};

export default memo(Details);
