import uploader from '@app/configs/uploader';

const FOLDER_NAME = 'crio';

export const IMAGE_CONTENT_TYPE = 'image';

export const FILE_TYPES = [IMAGE_CONTENT_TYPE];

export const getFolderNameByType = (type) => {
  switch (type) {
    case 'image':
      return 'images';
    default:
      return 'general';
  }
};

const getContentName = (type) => {
  switch (type) {
    case IMAGE_CONTENT_TYPE:
      return 'image';
    default:
      return null;
  }
};

export const uploadContent = async (file, typeId) => {
  const folder = FOLDER_NAME;
  if (!FILE_TYPES.includes(typeId) || !file) {
    return null;
  }
  const contentName = getContentName(typeId);
  const name = `${contentName}-content-${Date.now()}`;
  const filename = `${folder ? `${folder}/` : ''}${getFolderNameByType(contentName)}/${name}`;

  return uploader.signAndUpload(filename, file.type, file);
};

export const uploadItemContent = async (content, type) => {
  let newValue = content;
  // if (FILE_TYPES.includes(type) && content?.originFileObj) {
  newValue = await uploadContent(content, type);
  // }
  return newValue;
};

export const formItemContent = async ({ image }) => {
  const content = {
    image,
  };

  if (image) {
    const newImage = await uploadItemContent(image, IMAGE_CONTENT_TYPE);
    if (newImage) {
      content.image = newImage;
    }
  }

  return content;
};
