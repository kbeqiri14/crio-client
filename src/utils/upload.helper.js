import uploader from '@app/configs/uploader';

const FOLDER_NAME = 'products';

export const IMAGE_CONTENT_TYPE = 'image';

export const FILE_TYPES = [IMAGE_CONTENT_TYPE];

export const getContentNameByType = (type) => {
  switch (type) {
    case IMAGE_CONTENT_TYPE:
      return 'thumbnail';
    default:
      return 'general';
  }
};

export const uploadContent = async (userId, file, type) => {
  if (!userId || !file || !FILE_TYPES.includes(type)) {
    return null;
  }
  const contentName = getContentNameByType(type);
  const name = `${contentName}-${Date.now()}`;
  const filename = `${userId}/${FOLDER_NAME}/${name}`;

  return uploader.signAndUpload(filename, file.type, file);
};

export const uploadItemContent = async (userId, content, type) => {
  return uploadContent(userId, content, type);
};

export const formItemContent = async ({ userId, image }) => {
  const content = {
    image,
  };

  if (image) {
    const newImage = await uploadItemContent(userId, image, IMAGE_CONTENT_TYPE);
    if (newImage) {
      content.image = newImage;
    }
  }

  return content;
};
