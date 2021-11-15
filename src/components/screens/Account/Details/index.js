import { memo, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs } from 'antd';

import history from '@app/configs/history';
import { Spinner } from '@ui-kit/Spinner';
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

  return (
    <Tabs defaultActiveKey={activeKey} className='profile-details' onTabClick={onTabClick}>
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
          <Perks isProfile={isProfile} />
        </TabPane>
      )}
    </Tabs>
  );
};

export default memo(Details);
