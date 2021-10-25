import { Fragment, memo } from 'react';
import { Tabs } from 'antd';

import Followings from '../../Profile/Fan/Followings';
import Works from '../../Profile/Creator/Works';
import Perks from '../../Profile/Creator/Perks';
import './styles.less';

const { TabPane } = Tabs;

const Details = ({ isProfile, isCreator }) => (
  <Fragment>
    <Tabs defaultActiveKey='1' className='profile-details'>
      <TabPane tab={isProfile || isCreator ? 'WORKS 126' : 'FOLLOWING: 2'} key='1'>
        {isProfile || isCreator ? <Works /> : <Followings />}
      </TabPane>
      {(isProfile || isCreator) && <TabPane tab='PERKS' key='2'>
        <Perks isProfile={isProfile} />
      </TabPane>}
    </Tabs>
  </Fragment>
);

export default memo(Details);
