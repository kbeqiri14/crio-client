import { memo, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { signIn } from '@app/auth';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { PRODUCTS } from '@configs/constants';
import history from '@configs/history';
import { getThumbnail } from '@utils/helpers';
import { Button, Col, Row, Text, Title } from '@ui-kit';
import product from '@images/product.png';
import { ReactComponent as GoogleIcon } from '@svgs/google.svg';
import { usePresentation } from '@shared/PresentationView/PresentationContext';

const Wrapper = styled('div')`
  .card {
    width: 304px;
    height: 284px;
    background: #202020;
    border-radius: 14px;
    cursor: pointer;
    img {
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      object-fit: cover;
      width: 304px;
      height: 235px;
    }
    span {
      padding: 10px 16px;
    }
  }
`;

const TopProducts = ({
  userId,
  username,
  image,
  productId,
  categoryId,
  title,
  description,
  price,
  limit,
  accessibility,
  thumbnails,
  file,
}) => {
  const { user } = useLoggedInUser();
  const googleSignIn = useCallback(() => signIn('Google'), []);
  const { pathname } = useLocation();
  const { setInfo } = usePresentation();
  const avatarUrl = useAvatarUrl(userId, image);
  const src = useMemo(
    () =>
      thumbnails.length ? getThumbnail(PRODUCTS, userId, `thumbnail-${thumbnails[0]}`) : product,
    [userId, thumbnails],
  );

  const showProduct = useCallback(() => {
    if (pathname.includes('/product/')) {
      history.push(`/product/${productId}`);
      return;
    }
    window.history.replaceState('', '', `/product/${productId}`);
    setInfo({
      userId,
      username,
      image,
      productId,
      categoryId,
      title,
      description,
      price,
      limit,
      accessibility,
      thumbnails,
      file,
      isProduct: true,
    });
  }, [
    userId,
    username,
    image,
    categoryId,
    title,
    description,
    price,
    limit,
    accessibility,
    thumbnails,
    file,
    pathname,
    productId,
    setInfo,
  ]);

  return (
    <Wrapper>
      <Row justify='space-between' align='middle' gutter={[0, 60]} padding_bottom={40}>
        <Col max_width={733}>
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Title level={3}>Crio: The Creative Marketplace</Title>
            </Col>
            <Col span={24} padding_bottom={20} max_width={586}>
              <Text level={4}>
                Discover thousands of products, watch exclusive content and support your favorite
                creators on Crio
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
        <Col>
          <div className='card' onClick={showProduct} style={{ background: '#2B2B2B' }}>
            <img alt='product' src={src} />
            <Text color='dark25' level={1} ellipsis={{ tooltip: title }}>
              {title}
            </Text>
          </div>
          <Row justify='space-between' align='middle' padding_top={8} style={{ width: 304 }}>
            <Col>
              <Link to={`/profile/${username}`}>
                <Row gutter={8}>
                  <Col>
                    <img
                      src={avatarUrl}
                      width={28}
                      height={28}
                      alt='avatar'
                      className='fit-cover border-radius-100'
                    />
                  </Col>
                  <Col max_width={210}>
                    <Text level={1} color='dark50' ellipsis={{ tooltip: username }}>
                      {username}
                    </Text>
                  </Col>
                </Row>
              </Link>
            </Col>
            <Col>
              <Text color='white'>{price ? `$${price.toFixed(2)}` : 'Free'}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(TopProducts);
