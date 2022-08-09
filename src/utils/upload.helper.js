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

export const formItemContent = async ({ userId, image, file, type }) => {
  const content = {};

  if (image) {
    const prefix = type === PRODUCTS ? 'thumbnail-' : 'main-';
    const newImage = await uploadContent(userId, image, type, prefix);
    if (newImage) {
      content.image = newImage?.split('/')?.slice(-1)?.[0]?.slice(prefix.length);
    }
  }

  if (file) {
    const newFile = await uploadContent(userId, file, type, 'file');
    if (newFile) {
      content.file = newFile?.split('/')?.slice(-1)?.[0]?.slice('file-'.length);
    }
  }

  return content;
};
