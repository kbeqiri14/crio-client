import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Col, Divider, Row, Text } from '@ui-kit';
import SearchBar from './SearchBar';
import logo from '@images/logo.png';
import { ReactComponent as BurgerMenuIcon } from '@svgs/burger-menu.svg';
import { ReactComponent as CloseIcon } from '@svgs/close-menu.svg';
import { ReactComponent as ArrowUpIcon } from '@svgs/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '@svgs/arrow-down.svg';

const Wrapper = styled('div')`
  .header {
    padding: 9px 24px;
    box-shadow: 0 2px 10px rgba(8, 17, 44, 0.25);
    position: relative;
    .logo {
      position: absolute;
      display: flex;
      align-items: center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      span {
        font-weight: 510;
        font-size: 22px;
        line-height: 26px;
        color: white;
        cursor: pointer;
        padding-left: 12px;
      }
    }
  }
`;

export const BurgerMenu = ({ user, keyword, setKeyword }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(false);
  const setMenu = useCallback(() => setVisibleMenu(!visibleMenu), [visibleMenu]);
  const closeMenu = useCallback(() => setVisibleMenu(false), []);
  const setOptions = useCallback(() => setVisibleOptions(!visibleOptions), [visibleOptions]);

  return (
    <Wrapper>
      <div className='header'>
        <div class='logo'>
          <img alt='crio app logo' src={logo} />
          <span>Crio</span>
        </div>
        {visibleMenu ? <CloseIcon onClick={setMenu} /> : <BurgerMenuIcon onClick={setMenu} />}
      </div>
      {visibleMenu && (
        <Row gutter={[0, 40]} padding_horizontal={24} padding_vertical={20}>
          <Col span={24}>
            <SearchBar keyword={keyword} setKeyword={setKeyword} closeMenu={closeMenu} />
          </Col>
          <Col span={24} padding_left={10} onClick={closeMenu}>
            <Link to='/'>
              <Text level={3} color='dark25'>
                Explore
              </Text>
            </Link>
          </Col>
          {/* <Col span={24} padding_left={10} onClick={closeMenu}>
          <Link to='/features'>
            <Text level={3} color='dark25'>Features</Text>
          </Link>
        </Col> */}
          <Col span={24} padding_left={10} onClick={closeMenu}>
            <Link to='/pricing'>
              <Text level={3} color='dark25'>
                Pricing
              </Text>
            </Link>
          </Col>
          <Col span={24} padding_left={10} onClick={setOptions}>
            <Text level={3} color='dark25'>
              Upload
            </Text>{' '}
            {visibleOptions ? (
              <ArrowUpIcon className='vertical-middle' />
            ) : (
              <ArrowDownIcon className='vertical-middle' />
            )}
          </Col>
          {visibleOptions && (
            <Col span={24} padding_left={10} onClick={closeMenu}>
              <Link to='/upload'>
                <Text level={1} color='dark25'>
                  Product or service
                </Text>
              </Link>
            </Col>
          )}
          {visibleOptions && (
            <Col span={24} padding_left={10} onClick={closeMenu}>
              <Link to='/upload/artwork'>
                <Text level={1} color='dark25'>
                  Artwork
                </Text>
              </Link>
            </Col>
          )}
          <Col span={24}>
            <Divider />
          </Col>
          <Col span={24} padding_left={10} onClick={closeMenu}>
            <Link to={`/profile/${user.username}`}>
              <Text level={3} color='dark25'>
                My Profile
              </Text>
            </Link>
          </Col>
          <Col span={24} padding_left={10} onClick={closeMenu}>
            <Link to='/payment'>
              <Text level={3} color='dark25'>
                Payment
              </Text>
            </Link>
          </Col>
          <Col span={24} padding_left={10} onClick={closeMenu}>
            <Text level={3} color='dark25' onClick='signOut'>
              Sign out
            </Text>
          </Col>
        </Row>
      )}
    </Wrapper>
  );
};

export default memo(BurgerMenu);
