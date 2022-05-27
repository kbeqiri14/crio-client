import { memo, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useSendEmail } from '@root/src/components/shared/SendEmailModal/Context';
import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Button, Col, Divider, Row, Text } from '@ui-kit';
import Actions from '@screens/Video/Actions';
import { ReactComponent as LockIcon } from '@svgs/lock-buy.svg';
import product from '@svgs/produc.png';
import LockState from '../LockState';

const ProductWrapper = styled('div')`
  width: 332px;
  height: 332px;
  &.large {
    width: 686px;
    height: 723px;
    .width {
      max-width: 322px;
    }
  }
  border: 1px solid ${(props) => props.theme.colors.dark50};
  box-sizing: border-box;
  border-radius: 30px;
  cursor: pointer;
  img {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    object-fit: cover;
  }
  .info {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.4s linear;
  }
  &:hover {
    .info,
    .actions {
      opacity: 1;
      visibility: visible;
    }
  }
  .width {
    max-width: 140px;
  }
`;

const ImageWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 245px;
  img {
    width: 246px;
    height: 186px;
  }
  &.large {
    width: 684px;
    height: 636px;
    img {
      width: 451px;
      height: 341px;
    }
  }
`;

const Product = ({
  providerType,
  providerUserId,
  avatar,
  userId,
  username,
  productId,
  type,
  title,
  description,
  price,
  limit,
  accessibility,
  thumbnail,
  large = false,
}) => {
  const { user } = useLoggedInUser();
  const { pathname } = useLocation();
  const { setVideoInfo } = usePresentation();
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
  const { setSendEmailInfo } = useSendEmail();

  const showActions = useMemo(() => {
    const username = pathname.split('/').slice(-1)[0];
    return username === user.username;
  }, [user.username, pathname]);

  const isLocked = useMemo(() => {
    if (user.isCreator || accessibility === 'everyone') {
      return false;
    }
    return user.isSubscribed ? !user.followings?.includes(userId) : true;
  }, [user.isCreator, user.isSubscribed, user.followings, accessibility, userId]);

  const src = useMemo(
    () =>
      thumbnail
        ? `https://crio-in-staging-bucket.s3.us-west-2.amazonaws.com/${userId}/products/thumbnail-${thumbnail}`
        : product,
    [userId, thumbnail],
  );

  const classes = useMemo(() => {
    let name;
    if (isLocked) {
      name = 'is-locked';
    }
    if (large) {
      return `${name} large`;
    }
    return name;
  }, [isLocked, large]);

  const showProduct = useCallback(() => {
    if (pathname.includes('/product/')) {
      history.push(`/product/${productId}`);
      return;
    }
    window.history.replaceState('', '', `/product/${productId}`);
    setVideoInfo({
      userId,
      providerType,
      providerUserId,
      username,
      avatar,
      productId,
      type,
      title,
      description,
      price,
      limit,
      accessibility,
      thumbnail: src,
      isProduct: true,
    });
  }, [
    userId,
    providerType,
    providerUserId,
    username,
    avatar,
    type,
    title,
    description,
    price,
    limit,
    accessibility,
    src,
    pathname,
    productId,
    setVideoInfo,
  ]);

  const handleClick = useCallback(() => {
    if (price) {
      showProduct();
    } else {
      setSendEmailInfo({ productId });
    }
  }, [price, productId, setSendEmailInfo, showProduct]);

  return (
    <>
      <ProductWrapper className={classes}>
        <LockState userId={userId} accessibility={accessibility} large={large} isProduct={true} />
        {showActions && (
          <Actions
            username={username}
            productId={productId}
            title={title}
            description={description}
            price={price}
            limit={limit}
            accessibility={accessibility}
            thumbnail={src}
            isProduct={true}
          />
        )}
        <ImageWrapper className={large ? 'large' : ''}>
          <img src={src} alt='product' onClick={showProduct} />
        </ImageWrapper>
        <Row
          justify='space-between'
          align='middle'
          padding_horizontal={20}
          padding_top={12}
          onClick={showProduct}
        >
          <Col className='width'>
            <Row align='middle' gutter={[0, 8]}>
              <Col span={24}>
                <Text level={4} ellipsis={{ tooltip: title }}>
                  {title}
                </Text>
              </Col>
              <Col span={24}>
                <Text
                  level={4}
                  ellipsis={{ tooltip: price ? `$${price.toFixed(2)}` : 'Free for Subscribers' }}
                >
                  {price ? `$${price.toFixed(2)}` : 'Free for Subscribers'}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col className='info'>
            <Divider type='vertical' height={31} padding_left={20} />
            <Button
              type='primary'
              fill_color={price ? 'blue' : 'green'}
              width={large ? 301 : 126}
              icon={isLocked ? <LockIcon /> : undefined}
              onClick={handleClick}
            >
              {price ? 'Buy' : 'Email'}
            </Button>
          </Col>
        </Row>
      </ProductWrapper>
      <Link to={`/profile/${username}`}>
        <Row gutter={12} align='middle' padding_top={8}>
          <Col>
            <img
              src={avatarUrl}
              width={30}
              height={30}
              alt='avatar'
              className='border-radius-100'
            />
          </Col>
          <Col max_width={309}>
            <Text level={3} ellipsis={{ tooltip: username }}>
              {username}
            </Text>
          </Col>
        </Row>
      </Link>
    </>
  );
};

export default memo(Product);
