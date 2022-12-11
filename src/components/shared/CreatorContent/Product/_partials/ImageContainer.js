import { Image } from 'antd';
import { Tag } from '@ui-kit';
import { ImageWrapper } from '../styled';
import Actions from '@screens/Video/Actions';

const ImageContainer = ({
  thumbnails,
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
  return (
    <ImageWrapper className={imageClasses}>
      <Image preview={false} src={src} alt='product' onClick={showProduct} />
      {categories?.products.length && isHovering && categoryId && (
        <Tag>{categories?.products.find(({ id }) => id === categoryId)?.name}</Tag>
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

export default ImageContainer;
