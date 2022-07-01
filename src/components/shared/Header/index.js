import { memo } from 'react';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Col, Row } from '@ui-kit';
import Menu from './Menu';
import GetStarted from './GetStarted';
import ProfileMenu from './ProfileMenu';
import UploadButton from './UploadButton';
import BurgerMenu from './BurgerMenu';

export const Header = ({ isAuthenticated, keyword, setKeyword }) => {
  const { user } = useLoggedInUser();

  return (
    <>
      <Row justify='space-between' align='middle' gutter={[0, 20]}>
        <Col md={0} className='full-width'>
          <BurgerMenu user={user} keyword={keyword} setKeyword={setKeyword} />
        </Col>
        <Col xs={0} md={18}>
          <Menu user={user} keyword={keyword} setKeyword={setKeyword} />
        </Col>
        <Col xs={0} md={6}>
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
    </>
  );
};

export default memo(Header);
