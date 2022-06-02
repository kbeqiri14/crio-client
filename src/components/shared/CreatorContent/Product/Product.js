import { memo, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Col, Divider, Row, Text } from '@ui-kit';
import Actions from '@screens/Video/Actions';
import product from '@images/product.png';
import LockState from '../LockState';
import BuyButton from './BuyButton';

const ProductWrapper = styled('div')`
  width: 332px;
  height: 332px;
  &.large {
    width: 686px;
    height: 723px;
    .width {
      max-width: 500px;
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
  .info,
  .actions {
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
    width: inherit;
    height: inherit;
  }
  .actions {
    width: 330px;
    height: 145px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 103.09%);
    border-bottom: 1px solid ${(props) => props.theme.colors.dark50};
    position: absolute;
    top: 101px;
    svg {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
  &.no-thumbnail {
    img {
      width: 256px;
      height: 186px;
    }
  }
  &.large {
    width: 684px;
    height: 636px;
    img {
      width: inherit;
      height: inherit;
    }
    &.no-thumbnail {
      img {
        width: 451px;
        height: 341px;
      }
    }
    .actions {
      width: 684px;
      top: 492px;
    }
  }
  border-bottom: 1px solid ${(props) => props.theme.colors.dark50};
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

  const imageClasses = useMemo(() => {
    let name;
    if (!thumbnail) {
      name = 'no-thumbnail';
    }
    if (large) {
      return `${name} large`;
    }
    return name;
  }, [thumbnail, large]);

  const hide = useCallback(() => setVideoInfo({}), [setVideoInfo]);

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

  return (
    <>
      <ProductWrapper className={classes}>
        <LockState userId={userId} accessibility={accessibility} large={large} isProduct={true} />
        <ImageWrapper className={imageClasses}>
          <img src={src} alt='product' onClick={showProduct} />
          <div className='actions' onClick={() => !showActions && showProduct()}>
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
          </div>
        </ImageWrapper>
        <Row justify='space-between' align='middle' padding_horizontal={20} padding_top={12}>
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
          {!user.isCreator && (
            <Col className='info'>
              {!large && <Divider type='vertical' height={31} padding_left={20} />}
              <BuyButton
                userId={userId}
                username={username}
                productId={productId}
                price={price}
                limit={limit}
                accessibility={accessibility}
              />
            </Col>
          )}
        </Row>
      </ProductWrapper>
      <Link to={`/profile/${username}`} onClick={hide}>
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
