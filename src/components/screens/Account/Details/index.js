import { Fragment, memo } from 'react';
import { Tabs } from 'antd';

import { Spinner } from '@ui-kit/Spinner';
import Followings from '../../Profile/Fan/Followings';
import Works from '../../Profile/Creator/Works';
import Perks from '../../Profile/Creator/Perks';
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
  <Fragment>
    <Tabs defaultActiveKey='1' className='profile-details'>
      <TabPane tab={isProfile || isCreator ? 'WORKS 126' : `FOLLOWING: ${followings?.length || ''}`} key='1'>
        {
          isProfile || isCreator
            ? (
                loadingIsFollowing
                  ? <Spinner spinning={true} color='white' />
                  : <Works isLock={isProfile && !isFollow} />
              )
            : <Followings followings={followings} loadingFollowings={loadingFollowings} />
        }
      </TabPane>
      {
        (isProfile || isCreator) && (
          <TabPane tab='PERKS' key='2'>
            <Perks isProfile={isProfile} />
          </TabPane>)
      }
    </Tabs>
  </Fragment>
);

export default memo(Details);
