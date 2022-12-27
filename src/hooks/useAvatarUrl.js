import { BUCKET_NAME } from '@app/configs/environment';
import defaultAvatar from '@svgs/avatar.svg';

const useAvatarUrl = (userId, image) =>
  image
    ? `https://${BUCKET_NAME}.s3.us-west-2.amazonaws.com/${userId}/profile/${image}`
    : defaultAvatar;

export default useAvatarUrl;
