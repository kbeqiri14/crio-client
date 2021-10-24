import { Fragment, memo } from 'react';
import { Tabs } from 'antd';

import { ReactComponent as GreenSunIcon } from '@svgs/follow.svg';
import Followings from '../../Profile/Fan/Followings';
import Works from '../../Profile/Creator/Works';
import Perks from '../../Profile/Creator/Perks';
import './styles.less';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const Details = ({ isProfile, isCreator }) => (
  <Fragment>
    <Tabs defaultActiveKey='1' onChange={callback} className='profile-details'>
      <TabPane tab={isProfile || isCreator ? 'WORKS 126' : 'FOLLOWING: 2'} key='1'>
        {isProfile || isCreator ? <Works /> : <Followings />}
      </TabPane>
      {(isProfile || isCreator) && <TabPane tab='PERKS' key='2'>
        <Perks isProfile={isProfile} />
      </TabPane>}
    </Tabs>
    <GreenSunIcon />
  </Fragment>
);

export default memo(Details);
