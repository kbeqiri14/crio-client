import { memo, useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import history from '@configs/history';
import { PRODUCTS } from '@configs/constants';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { getThumbnail } from '@utils/helpers';
import { Col, Row, Text } from '@ui-kit';
import Actions from '@screens/Video/Actions';
import product from '@images/product.png';
import { ProductWrapper, ImageWrapper } from './styled';
import BuyButton from './BuyButton';

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
  const [isHovering, setIsHovering] = useState(false);
  const { user } = useLoggedInUser();
  const { pathname } = useLocation();
  const { setInfo } = usePresentation();
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);

  const handleMouseOver = useCallback(() => setIsHovering(true), []);
  const handleMouseOut = useCallback(() => setIsHovering(false), []);

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

  const showBuyButton = useMemo(() => {
    if (user.isCreator) {
      return false;
    }
    if (price) {
      return true;
    }
    return user.isSubscribed ? user.followings?.includes(userId) : false;
  }, [user.isCreator, user.isSubscribed, user.followings, price, userId]);

  const src = useMemo(
    () => (thumbnail ? getThumbnail(PRODUCTS, userId, `thumbnail-${thumbnail}`) : product),
    [userId, thumbnail],
  );

  const priceText = useMemo(
    () => (price ? `$${price.toFixed(2)}` : 'Free for Subscribers'),
    [price],
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

  const hide = useCallback(() => setInfo({}), [setInfo]);

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
    setInfo,
  ]);

  return (
    <>
      <ProductWrapper
        className={classes}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        <ImageWrapper className={imageClasses}>
          <img src={src} alt='product' onClick={showProduct} />
          <div
            className={`actions ${isHovering ? 'hover' : ''}`}
            onClick={() => !showActions && showProduct()}
          >
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
          <Col>
            <Row align='middle' gutter={[0, 8]}>
              <Col span={24}>
                <Text
                  level={4}
                  style={{ width: showBuyButton && isHovering ? 140 : 332 }}
                  ellipsis={{ rows: 1, tooltip: title }}
                >
                  {title}
                </Text>
              </Col>
              <Col span={24}>
                <Text
                  level={4}
                  style={{ width: showBuyButton && isHovering ? 140 : 332 }}
                  ellipsis={{ rows: 1, tooltip: priceText }}
                >
                  {priceText}
                </Text>
              </Col>
            </Row>
          </Col>
          {showBuyButton && (
            <Col className='info'>
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
