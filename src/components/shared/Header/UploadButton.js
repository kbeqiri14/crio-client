import { memo } from 'react';

import history from '@configs/history';
import { Button, Dropdown, Menu } from '@ui-kit';

const goTo = (path) => () => history.push(path);

const UploadButton = () => (
  <Dropdown
    overlay={
      <Menu>
        <Menu.Item key='marketplace' onClick={goTo('/upload')}>
          Marketplace
        </Menu.Item>
        <Menu.Item key='artwork' onClick={goTo('/upload/artwork')}>
          Artwork
        </Menu.Item>
      </Menu>
    }
  >
    <Button type='primary' className='vertical-middle'>
      UPLOAD
    </Button>
  </Dropdown>
);

export default memo(UploadButton);
