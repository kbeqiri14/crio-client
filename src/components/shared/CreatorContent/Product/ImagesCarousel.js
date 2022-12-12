import { useState, useRef, memo } from 'react';

import { Carousel } from '@ui-kit';
import { ReactComponent as ArrowLeft } from '@svgs/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@svgs/arrow-right.svg';
import ImageContainer from './_partials/ImageContainer';

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
          <ImageContainer
            key={index}
            thumbnails={thumbnails}
            src={item}
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

export default memo(ImagesCarousel);
