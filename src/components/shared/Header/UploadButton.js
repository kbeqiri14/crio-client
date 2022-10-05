import { memo } from 'react';

import history from '@configs/history';
import { Button, Dropdown, Menu } from '@ui-kit';

const goTo = (path) => () => history.push(path);

const items = [
  {
    label: 'Marketplace',
    key: 'marketplace',
    onClick: goTo('/upload'),
  },
  {
    label: 'Content',
    key: 'artwork',
    onClick: goTo('/upload/artwork'),
  },
];

const UploadButton = () => (
  <Dropdown overlay={<Menu items={items} />}>
    <Button type='primary' className='vertical-middle'>
      UPLOAD
    </Button>
  </Dropdown>
);

export default memo(UploadButton);
