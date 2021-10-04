import history from '@app/configs/history';
import { TabMenu } from '@shared/Header/__partials__/TabMenu/TabMenu';
import { SecondaryButton } from '@ui-kit/Button';
import { Row, Col } from 'antd';
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
          <SecondaryButton>Log In</SecondaryButton>
          <button>Sign Up</button>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
