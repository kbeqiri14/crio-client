import { memo } from 'react';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Col, Row } from '@ui-kit';
import Menu from './Menu';
import GetStarted from './GetStarted';
import ProfileMenu from './ProfileMenu';
import UploadButton from './UploadButton';

export const Header = ({ isAuthenticated }) => {
  const { user } = useLoggedInUser();

  return (
    <Row justify='space-between' align='middle' gutter={[0, 20]}>
      <Col>
        <Menu user={user} />
      </Col>
      <Col>
        <Row justify='center' align='middle' gutter={[20, 20]}>
          <Col className='self-center'>
            {isAuthenticated && user ? <ProfileMenu user={user} /> : <GetStarted />}
          </Col>
          {user?.isCreator && (
            <Col>
              <UploadButton />
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default memo(Header);
