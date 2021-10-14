import { memo, useState } from 'react';
import { Button } from 'antd';

import Works from '../shared/Works';
import Perks from '../shared/Perks';

export const Menu = () => {
  const [worksView, setWorksView] = useState(true);
  return <div className='container'>
    <Button shape='round' onClick={() => setWorksView(true)}>
      Works
    </Button>
    <Button shape='round' onClick={() => setWorksView(false)}>
      Perks
    </Button>
    {worksView ? <Works /> : <Perks />}
  </div>;
};

export default memo(Menu);
