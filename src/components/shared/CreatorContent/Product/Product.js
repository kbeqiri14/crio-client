import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import history from '@configs/history';
import { PRODUCTS } from '@configs/constants';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useCategories from '@app/hooks/useCategories';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { getThumbnail } from '@utils/helpers';
import { Col, Row, Tag, Text } from '@ui-kit';
import product from '@images/product.png';
import Actions from '@screens/Video/Actions';
import Author from '../Author';
import BuyButton from './BuyButton';
import { ProductWrapper, ImageWrapper } from './styled';

const Product = ({
  providerType,
  providerUserId,
  avatar,
  userId,
  username,
  productId,
  categoryId,
  title,
  description,
  price,
  limit,
  accessibility,
  thumbnail,
  file,
  likes,
  large = false,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { user } = useLoggedInUser();
  const { categories } = useCategories();
  const { pathname } = useLocation();
  const { setInfo } = usePresentation();

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
  const style = useMemo(() => {
    let width = large ? 686 : 332;
    if (isHovering) {
      if (!user.isCreator && isHovering) {
        width = large ? 494 : isLocked ? 120 : 140;
      }
      if (isLocked && !price && categoryId === categories.digitalId) {
        width = large ? 469 : 115;
      }
    }
    return { width };
  }, [large, isHovering, user.isCreator, isLocked, price, categoryId, categories.digitalId]);

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
    <>
      <ProductWrapper
        className={classes}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        <ImageWrapper className={imageClasses}>
          <img src={src} alt='product' onClick={showProduct} />
          {categories.products.length && isHovering && categoryId && (
            <Tag>{categories.products.find(({ id }) => id === categoryId)?.name}</Tag>
          )}
          <div
            className={`actions ${isHovering ? 'hover' : ''}`}
            onClick={() => !showActions && showProduct()}
          >
            {showActions && (
              <Actions
                userId={userId}
                username={username}
                productId={productId}
                categoryId={categoryId}
                title={title}
                description={description}
                price={price}
                limit={limit}
                accessibility={accessibility}
                thumbnail={src}
                file={file}
                isProduct={true}
              />
            )}
          </div>
        </ImageWrapper>
        <Row justify='space-between' align='middle' padding_horizontal={20} padding_top={12}>
          <Col>
            <Row align='middle' gutter={[0, 8]}>
              <Col span={24}>
                <Text level={4} style={style} ellipsis={{ rows: 1, tooltip: title }}>
                  {title}
                </Text>
              </Col>
              <Col span={24}>
                <Text level={4} style={style} ellipsis={{ rows: 1, tooltip: priceText }}>
                  {priceText}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col className='info'>
            <BuyButton
              userId={userId}
              productId={productId}
              categoryId={categoryId}
              file={file}
              price={price}
              limit={limit}
              accessibility={accessibility}
            />
          </Col>
        </Row>
      </ProductWrapper>
      <Author
        providerType={providerType}
        providerUserId={providerUserId}
        avatar={avatar}
        username={username}
        likes={likes}
        hide={hide}
      />
    </>
  );
};

export default memo(Product);
