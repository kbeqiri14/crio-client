import { memo } from 'react';
import { Tabs } from 'antd';

import Followings from '../../Profile/Fan/Followings';

import Works from '../../Profile/Creator/Works';
import Perks from '../../Profile/Creator/Perks';
import './styles.less';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const Details = ({ isCreator }) => (
  <Tabs defaultActiveKey='1' onChange={callback} className='profile-details'>
    <TabPane tab={isCreator ? 'WORKS 126' : 'FOLLOWING: 2'} key='1'>
      {isCreator ? <Works /> : <Followings />}
    </TabPane>
    {isCreator && <TabPane tab='PERKS' key='2'>
      <Perks />
    </TabPane>}
  </Tabs>
);

export default memo(Details);
