import { useState, useRef, memo } from 'react';

import { Carousel } from '@ui-kit';
import ImageContainer from './_partials/ImageContainer';
import { ReactComponent as ArrowLeft } from '@svgs/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@svgs/arrow-right.svg';

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
      {/* {console.log(thumbnails, 'thubnails')} */}
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
        <ImageContainer
          thumbnails={thumbnails}
          src={sources[0]}
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
        <ImageContainer
          thumbnails={thumbnails}
          src={sources[1]}
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
        <ImageContainer
          thumbnails={thumbnails}
          src={sources[2]}
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
      </Carousel>
    </div>
  );
};

export default memo(ImagesCarousel);
