import { Col, Row } from 'antd';

import history from '@app/configs/history';
import { useCurrentUser } from '@app/auth/hooks';
import useFacebook from '@app/hooks/useFacebook';
import { TabMenu } from '@shared/Header/__partials__/TabMenu/TabMenu';
import { SecondaryButton } from '@ui-kit/Button';
import crio_logo from '@images/crio-logo.png';
import './styles.less';

const tabItems = [
  {
    id: 'home',
    title: 'Home',
    onClick: () => history.push(''),
  },
  {
    id: 'pricing',
    title: 'Pricing',
    onClick: () => history.push('/pricing'),
  },
];

export const Header = () => {
    const { user, loading } = useCurrentUser();
    const { loading: fbLoading, login } = useFacebook();

    return (
    <header className='crio-app-header'>
      <Row justify='space-between' align='middle'>
        <Col className='header-start-group'>
          <div className='header-logo'>
            <img alt='crio app logo' src={crio_logo} />
          </div>
          <div className='header-tab-menu'>
            <TabMenu defaultActiveItem='home' menuItems={tabItems} />
          </div>
        </Col>
        <Col className='header-end-group'>
          {user
            ? <img alt='profile' src={JSON.parse(user?.attributes?.picture).data.url} />
            : !loading && <SecondaryButton onClick={login} disabled={loading || fbLoading}>
                LOG IN
              </SecondaryButton>}
        </Col>
      </Row>
    </header>
  );
};

export default Header;
