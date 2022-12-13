import { useMemo, useRef, useState } from 'react';

import { PRODUCTS } from '@configs/constants';
import { getThumbnail } from '@utils/helpers';
import { Carousel, Tag } from '@ui-kit';
import product from '@images/product.png';
import { ReactComponent as ArrowLeft } from '@svgs/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@svgs/arrow-right.svg';
import Actions from '@screens/Video/Actions';
import ImageWrapper from '@screens/Artwork/Content/styled/ImageWrapper';
import { ImageWrapper as ProductWrapper } from '../styled';

const Image = ({
  thumbnails,
  source,
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
  description,
  accessibility,
  imageClasses,
  presentationView,
  showProduct = () => {},
}) => {
  const Wrapper = presentationView ? ImageWrapper : ProductWrapper;
  return (
    <Wrapper className={imageClasses}>
      <img src={source} alt='product' onClick={showProduct} />
      {categories?.products?.length && isHovering && categoryId && (
        <Tag>{categories?.products?.find(({ id }) => id === categoryId)?.name}</Tag>
      )}
      {showActions && (
        <div
          className={`actions ${isHovering ? 'hover' : ''}`}
          onClick={() => !showActions && showProduct()}
        >
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
        </div>
      )}
    </Wrapper>
  );
};

export const ImagesCarousel = ({ sources, ...props }) => {
  const slider = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className='relative'>
      {!!currentSlide && (
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
        {sources.map((source, index) => (
          <Image key={index} {...props} source={source} />
        ))}
      </Carousel>
    </div>
  );
};

export const ImageContainer = (props = {}) => {
  const [Component, source] = useMemo(() => {
    if (props.thumbnails.length > 1) {
      return [
        ImagesCarousel,
        {
          sources: props.thumbnails.map((thumbnail) =>
            getThumbnail(PRODUCTS, props.userId, `thumbnail-${thumbnail}`),
          ),
        },
      ];
    }
    return [
      Image,
      {
        source: props.thumbnails.length
          ? getThumbnail(PRODUCTS, props.userId, `thumbnail-${props.thumbnails[0]}`)
          : product,
      },
    ];
  }, [props.thumbnails, props.userId]);

  return <Component {...props} {...source} />;
};
