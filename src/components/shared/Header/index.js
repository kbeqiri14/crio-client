import { memo } from 'react';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import GetStarted from '@shared/GetStarted';
import { Col, Row } from '@ui-kit';
import Menu from './Menu';
import ProfileMenu from './ProfileMenu';
import UploadButton from './UploadButton';

export const Header = ({ isAuthenticated }) => {
  const { user } = useLoggedInUser();

  return (
    <Row justify='space-between' align='middle'>
      <Col>
        <Menu user={user} />
      </Col>
      <Col>
        <Row justify='center' gutter={[20, 20]}>
          <Col className='self-center'>
            {isAuthenticated && user ? <ProfileMenu user={user} /> : <GetStarted />}
          </Col>
          <Col>{user?.isCreator && <UploadButton />}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(Header);
