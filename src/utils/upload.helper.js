import uploader from '@app/configs/uploader';
import { PRODUCTS, ARTWORKS } from '@configs/constants';

export const IMAGE_TYPE = 'image';
export const VIDEO_TYPE = 'video';

export const FILE_TYPES = [IMAGE_TYPE, VIDEO_TYPE];

export const getContentNameByType = (type) => {
  switch (type) {
    case IMAGE_TYPE:
      return 'thumbnail';
    default:
      return 'general';
  }
};

export const uploadContent = async (userId, file, type) => {
  const fileType = file?.type?.split('/')?.[0];
  if (!userId || ![PRODUCTS, ARTWORKS].includes(type) || !FILE_TYPES.includes(fileType)) {
    return null;
  }
  const contentName = getContentNameByType(fileType);
  const name = `${contentName}-${Date.now()}`;
  const filename = `${userId}/${type}/${name}`;

  return uploader.signAndUpload(filename, file.type, file);
};

export const formItemContent = async ({ userId, image, type }) => {
  const content = {
    image,
  };

  if (image) {
    const newImage = await uploadContent(userId, image, type);
    if (newImage) {
      content.image = newImage;
    }
  }

  return content;
};
