import { memo, useMemo, useRef, useState } from 'react';

import { PRODUCTS } from '@configs/constants';
import { getThumbnail } from '@utils/helpers';
import { Carousel, Tag } from '@ui-kit';
import product from '@images/product.png';
import { ReactComponent as ArrowLeft } from '@svgs/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@svgs/arrow-right.svg';
import Actions from '@screens/Video/Actions';
import { ImageWrapper } from '../styled';

const Image = ({
  thumbnails,
  sources,
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
  return (
    <ImageWrapper className={imageClasses}>
      <img src={sources} alt='product' onClick={showProduct} />
      {categories?.products?.length && isHovering && categoryId && (
        <Tag>{categories?.products?.find(({ id }) => id === categoryId)?.name}</Tag>
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
            thumbnails={thumbnails}
            file={file}
            isProduct={true}
          />
        )}
      </div>
    </ImageWrapper>
  );
};

const ImagesCarousel = ({
  thumbnails,
  sources,
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
    <div className='relative'>
      {currentSlide !== 0 && (
        <ArrowLeft
          onClick={() => {
            slider.current.prev();
            setCurrentSlide((prev) => --prev);
          }}
          className='arrow-left'
        />
      )}
      {currentSlide !== sources.length - 1 && (
        <ArrowRight
          onClick={() => {
            slider.current.next();
            setCurrentSlide((prev) => ++prev);
          }}
          className='arrow-right'
        />
      )}
      <Carousel ref={slider} autoplay={false} dots={false}>
        {sources.map((item, index) => (
          <Image
            key={index}
            thumbnails={thumbnails}
            sources={item}
            file={file}
            limit={limit}
            price={price}
            title={title}
            userId={userId}
            username={username}
            productId={productId}
            isHovering={isHovering}
            categoryId={categoryId}
            categories={categories}
            showActions={showActions}
            showProduct={showProduct}
            description={description}
            accessibility={accessibility}
            imageClasses={imageClasses}
          />
        ))}
      </Carousel>
    </div>
  );
};

const ImageContainer = (props = {}) => {
  const data = useMemo(
    () => ({
      ...props,
      sources:
        props?.thumbnails?.length > 1
          ? props.thumbnails?.map((item) =>
              getThumbnail(PRODUCTS, props.userId, `thumbnail-${item}`),
            )
          : props.thumbnails?.[0]
          ? getThumbnail(PRODUCTS, props.userId, `thumbnail-${props.thumbnails[0]}`)
          : product,
    }),
    [props],
  );
  return props.thumbnails?.length > 1 ? <ImagesCarousel {...data} /> : <Image {...data} />;
};

export default memo(ImageContainer);
