import { Image } from 'antd';
import { useState, useRef, memo } from 'react';

import { Carousel, Tag } from '@ui-kit';
import { ImageWrapper } from '../styled';
import Actions from '@screens/Video/Actions';
import { ReactComponent as ArrowLeft } from '@svgs/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@svgs/arrow-right.svg';

const ImagesCarousel = ({
  src,
  file,
  limit,
  price,
  title,
  userId,
  username,
  productId,
  isHovering,
  categoryId,
  categories,
  showActions,
  showProduct,
  description,
  accessibility,
  imageClasses,
}) => {
  const slider = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div style={{ position: 'relative' }}>
      {currentSlide !== 0 && (
        <ArrowLeft
          onClick={() => {
            slider.current.prev();
            setCurrentSlide((prev) => --prev);
          }}
          className='arrow-left'
        />
      )}
      {currentSlide !== 2 && (
        <ArrowRight
          onClick={() => {
            slider.current.next();
            setCurrentSlide((prev) => ++prev);
          }}
          className='arrow-right'
        />
      )}
      <Carousel ref={slider} autoplay={false} dots={false}>
        <ImageWrapper className={imageClasses}>
          <Image preview={false} src={src} alt='product' onClick={showProduct} />
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
        <ImageWrapper className={imageClasses}>
          <Image preview={false} src={src} alt='product' onClick={showProduct} />
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
        <ImageWrapper className={imageClasses}>
          <Image preview={false} src={src} alt='product' onClick={showProduct} />
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
      </Carousel>
    </div>
  );
};

export default memo(ImagesCarousel);
