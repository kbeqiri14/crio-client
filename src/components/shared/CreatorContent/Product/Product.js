import { useLocation } from 'react-router-dom';
import { memo, useCallback, useMemo, useState } from 'react';

import history from '@configs/history';
import { Col, Row, Text } from '@ui-kit';
import useCategories from '@app/hooks/useCategories';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import Author from '../Author';
import BuyButton from './BuyButton';
import ImageContainer from './_partials/ImageContainer';
import { ProductWrapper } from './styled';

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
  thumbnails,
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
    if (!thumbnails?.[0]) {
      name = 'no-thumbnail';
    }
    if (large) {
      return `${name} large`;
    }
    return name;
  }, [thumbnails, large]);

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
      thumbnails,
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
    thumbnails,
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
        <ImageContainer
          file={file}
          title={title}
          price={price}
          limit={limit}
          userId={userId}
          username={username}
          productId={productId}
          description={description}
          imageClasses={imageClasses}
          accessibility={accessibility}
          thumbnails={thumbnails}
          categoryId={categoryId}
          categories={categories}
          isHovering={isHovering}
          showActions={showActions}
          showProduct={showProduct}
        />
        <Row justify='space-between' align='middle' padding_horizontal={20} padding_top={12}>
          <Col>
            <Row align='middle' gutter={[0, 8]}>
              <Col span={24}>
                <Text level={4} style={style} ellipsis={{ tooltip: title }}>
                  {title}
                </Text>
              </Col>
              <Col span={24}>
                <Text level={4} style={style} ellipsis={{ tooltip: priceText }}>
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
        isProduct
        productId={productId}
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
