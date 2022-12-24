import defaultAvatar from '@svgs/avatar.svg';

const useAvatarUrl = (image) =>
  image
    ? `https://crio-in-staging-bucket.s3.us-west-2.amazonaws.com/43/profile/${image}`
    : defaultAvatar;

export default useAvatarUrl;
