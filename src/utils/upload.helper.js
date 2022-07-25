import uploader from '@app/configs/uploader';
import { PRODUCTS, ARTWORKS } from '@configs/constants';

export const IMAGE_TYPE = 'image';
export const VIDEO_TYPE = 'video';

export const FILE_TYPES = [IMAGE_TYPE, VIDEO_TYPE];

export const uploadContent = async (userId, file, type, prefix) => {
  const fileType = file?.type?.split('/')?.[0];
  if (!userId || ![PRODUCTS, ARTWORKS].includes(type) || !FILE_TYPES.includes(fileType)) {
    return null;
  }
  const filename = `${userId}/${type}/${prefix}-${Date.now()}`;

  return uploader.signAndUpload(filename, file.type, file);
};

export const formItemContent = async ({ userId, image, type, prefix }) => {
  const content = {
    image,
  };

  if (image) {
    const newImage = await uploadContent(userId, image, type, prefix);
    if (newImage) {
      content.image = newImage;
    }
  }

  return content;
};
