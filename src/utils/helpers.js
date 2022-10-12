import { BUCKET_NAME } from '@app/configs/environment';

/**
 * @desc Detecting URLs in a set of strings
 * @param {string} text
 */
export function urlify(text) {
  if (!text) {
    return '';
  }
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}

/**
 * @desc Get the URL of a file on AWS S3
 * @param {PRODUCTS | ARTWORKS} type
 * @param {string} userId
 * @param {string} fileName
 */
export function getThumbnail(type, userId, fileName) {
  return `https://${BUCKET_NAME}.s3.amazonaws.com/${userId}/${type}/${fileName}`;
}

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
