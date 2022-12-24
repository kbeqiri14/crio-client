import defaultAvatar from '@svgs/avatar.svg';

const useAvatarUrl = (userId, image) =>
  image
    ? `https://crio-in-staging-bucket.s3.us-west-2.amazonaws.com/${userId}/profile/${image}`
    : defaultAvatar;

export default useAvatarUrl;
