import { memo } from 'react';
import { Tabs } from 'antd';

import { Spinner } from '@ui-kit/Spinner';
import Followings from '../../Profile/Followings';
import Works from '../../Profile/Works';
import Perks from '../../Profile/Perks';
import './styles.less';

const { TabPane } = Tabs;

const Details = ({
  isProfile,
  isCreator,
  isFollow,
  loadingIsFollowing,
  loadingFollowings,
  followings,
}) => (
  <Tabs defaultActiveKey='1' className='profile-details'>
    <TabPane
      key='1'
      tab={isProfile || isCreator ? 'WORKS 126' : `FOLLOWING: ${followings?.length || ''}`}
    >
      {isProfile || isCreator ? (
        loadingIsFollowing ? (
          <Spinner spinning={true} color='white' />
        ) : (
          <Works isLock={isProfile && !isFollow} />
        )
      ) : (
        <Followings followings={followings} loadingFollowings={loadingFollowings} />
      )}
    </TabPane>
    {(isProfile || isCreator) && (
      <TabPane key='2' tab='PERKS'>
        <Perks isProfile={isProfile} />
      </TabPane>
    )}
  </Tabs>
);

export default memo(Details);
