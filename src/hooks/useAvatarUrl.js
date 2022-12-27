import { BUCKET_NAME, COGNITO_REGION } from '@app/configs/environment';
import defaultAvatar from '@svgs/avatar.svg';

const useAvatarUrl = (userId, image) =>
  image
    ? `https://${BUCKET_NAME}.s3.${COGNITO_REGION}.amazonaws.com/${userId}/profile/${image}`
    : defaultAvatar;

export default useAvatarUrl;
