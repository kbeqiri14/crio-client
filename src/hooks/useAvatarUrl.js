import profile from '@images/profile.png';

export const useAvatarUrl = (providerType, providerUserId, avatar) => {
  if (!providerUserId) {
    return profile;
  }
  if (providerType === 'Google') {
    return `https://lh3.googleusercontent.com/${avatar}s350`;
  }
  if (providerType === 'Facebook') {
    return `https://graph.facebook.com/${providerUserId}/picture?height=350&width=350`;
  }
  return profile;
};

export default useAvatarUrl;
