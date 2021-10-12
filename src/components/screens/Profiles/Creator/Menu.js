import { Fragment, memo, useState } from 'react';
import { Button } from 'antd';

import Works from '../shared/Works';
import PerksList from '../shared/PerksList';

export const Menu = () => {
  const [worksView, setWorksView] = useState(true);
  return <Fragment>
    <Button shape='round' onClick={() => setWorksView(true)}>
      Works
    </Button>
    <Button shape='round' onClick={() => setWorksView(false)}>
      Perks
    </Button>
    {worksView ? <Works /> : <PerksList />}
  </Fragment>;
};

export default memo(Menu);
