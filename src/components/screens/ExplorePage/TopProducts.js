import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { signIn } from '@app/auth';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Button, Col, Row, Text, Title } from '@ui-kit';
import { ReactComponent as GoogleIcon } from '@svgs/google.svg';

const Wrapper = styled('div')`
  height: 450px;
  padding-top: 85px;

  @media (max-width: 767.98px) {
    .title {
      font-size: 35px !important;
    }
  }
`;

const TopProducts = ({ username, thumbnail, title, price }) => {
  const { user } = useLoggedInUser();
  const googleSignIn = useCallback(() => signIn('Google'), []);

  return (
    <Wrapper>
      <Row justify='space-around' gutter={[0, 40]}>
        <Col
          padding_top={25}
          xxl={{ span: 12, offset: 3 }}
          xl={{ span: 12, offset: 1 }}
          lg={{ span: 18, offset: 2 }}
          md={{ span: 14, offset: 0 }}
          sm={{ span: 14, offset: 0 }}
          xs={{ span: 20, offset: 0 }}
        >
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Title level={3} className='title'>
                Crio: The Creative Marketplace
              </Title>
            </Col>
            <Col span={24} padding_bottom={10}>
              <Text level={4}>
                Shop thousands of products and see the best artwork from the <br /> entire community
                of creators on Crio
              </Text>
            </Col>
            <Col xs={user.id ? 24 : 0} lg={24}>
              <Link to={`/profile/${username}`}>
                <Button type='primary' size='large'>
                  VISIT FEATURED CREATOR
                </Button>
              </Link>
            </Col>
            {!user.id && (
              <Col lg={0}>
                <Button type='google' icon={<GoogleIcon />} onClick={googleSignIn}>
                  Sign up with Google
                </Button>
              </Col>
            )}
          </Row>
        </Col>
        <Col xl={6} xs={0}>
          <img alt='artwork' height={304} width={284} className='fit-cover' src={thumbnail} />
          <Text color='white' level={3}>
            by {username}
          </Text>{' '}
          <Text>${price}</Text>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(TopProducts);
