import { memo, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { signIn } from '@app/auth';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { PRODUCTS } from '@configs/constants';
import { getThumbnail } from '@utils/helpers';
import history from '@configs/history';
import { Button, Col, Row, Text, Title } from '@ui-kit';
import { ReactComponent as GoogleIcon } from '@svgs/google.svg';

const Wrapper = styled('div')`
  padding-top: 85px;
  padding-bottom: 50px;
  @media (max-width: 767.98px) {
    .title {
      font-size: 35px !important;
    }
  }
`;

const ProductWrapper = styled('div')`
  height: 284px;
  width: 304px;
  background: #202020;
  border-radius: 14px;
  cursor: pointer;
  .img {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    object-fit: cover;
    width: 304px;
    height: 235px;
    border-bottom: 1px solid transparent;
  }
`;

const TopProducts = ({
  userId,
  providerType,
  providerUserId,
  username,
  avatar,
  productId,
  categoryId,
  title,
  description,
  price,
  limit,
  accessibility,
  thumbnail,
  file,
}) => {
  const { user } = useLoggedInUser();
  const googleSignIn = useCallback(() => signIn('Google'), []);
  const { pathname } = useLocation();
  const { setInfo } = usePresentation();
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
  const src = useMemo(
    () => getThumbnail(PRODUCTS, userId, `thumbnail-${thumbnail}`),
    [userId, thumbnail],
  );

  const showProduct = useCallback(() => {
    if (pathname.includes('/product/')) {
      history.push(`/product/${productId}`);
      return;
    }
    window.history.replaceState('', '', `/product/${productId}`);
    setInfo({
      userId,
      providerType,
      providerUserId,
      username,
      avatar,
      productId,
      categoryId,
      title,
      description,
      price,
      limit,
      accessibility,
      thumbnail: src,
      file,
      isProduct: true,
    });
  }, [
    userId,
    providerType,
    providerUserId,
    username,
    avatar,
    categoryId,
    title,
    description,
    price,
    limit,
    accessibility,
    src,
    file,
    pathname,
    productId,
    setInfo,
  ]);

  return (
    <Wrapper>
      <Row justify='space-around' gutter={[0, 60]}>
        <Col
          padding_top={25}
          xxl={{ span: 10, offset: 2 }}
          xl={{ span: 12, offset: 0 }}
          lg={{ span: 18, offset: 2 }}
          md={{ span: 20, offset: 2 }}
          sm={{ span: 20, offset: 1 }}
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

        <Col xl={6} sm={10} md={8} lg={8} xs={19}>
          <Row>
            <ProductWrapper onClick={showProduct}>
              <Col span={24}>
                <img alt='artwork' height={304} width={284} className='img fit-cover' src={src} />
              </Col>
              <Col span={24} padding_top={12} padding_left={15} padding_right={15}>
                <Text color='dark25' level={1} ellipsis={{ rows: 1, tooltip: title }}>
                  {title}
                </Text>
              </Col>
            </ProductWrapper>
          </Row>
          <Row padding_top={7}>
            <Col xxl={2} lg={3} md={4} sm={4} xs={3}>
              <Link to={`/profile/${username}`}>
                <img
                  src={avatarUrl}
                  height='28'
                  width='28'
                  alt='Author avatar'
                  className='border-radius-100'
                />
              </Link>
            </Col>
            <Col xxl={9} lg={10} md={13} sm={13} xs={16} className='self-center'>
              <Link to={`/profile/${username}`}>
                <Text color='dark50' level={1}>
                  {username}
                </Text>{' '}
              </Link>
            </Col>
            <Col xxl={2} offset={2} md={3} sm={4} className='self-center text-right'>
              <Text color='white'>{price ? <>${price}</> : 'Free'}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(TopProducts);
