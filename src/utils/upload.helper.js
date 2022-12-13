import uploader from '@app/configs/uploader';
import { PRODUCTS, ARTWORKS } from '@configs/constants';

export const IMAGE_TYPE = 'image';
export const VIDEO_TYPE = 'video';

export const FILE_TYPES = [IMAGE_TYPE, VIDEO_TYPE];

export const uploadContent = async (userId, file, type, prefix) => {
  const fileType = file?.type?.split('/')?.[0];
  if (
    !userId ||
    ![PRODUCTS, ARTWORKS].includes(type) ||
    (prefix !== 'file' && !FILE_TYPES.includes(fileType))
  ) {
    return null;
  }
  const filename = `${userId}/${type}/${prefix}-${Date.now()}`;

  return uploader.signAndUpload(filename, file.type, file);
};

export const sign = async ({ userId, file, type, prefix }) => {
  const fileType = file?.type?.split('/')?.[0];
  if (
    !userId ||
    ![PRODUCTS, ARTWORKS].includes(type) ||
    (prefix !== 'file' && !FILE_TYPES.includes(fileType))
  ) {
    return null;
  }
  const filename = `${userId}/${type}/${prefix}-${Date.now()}`;

  return uploader.signForUpload(filename, file.type);
};

export const formItemContent = async ({ userId, image, type }) => {
  const content = {};

  if (image) {
    const prefix = type === PRODUCTS ? 'thumbnail-' : 'main-';
    const newImage = await uploadContent(userId, image, type, prefix);
    console.log(newImage, 'newImage');
    if (newImage) {
      content.image = newImage?.split('/')?.slice(-1)?.[0]?.slice(prefix.length);
    }
  }

  return content;
};
