import profile from '@images/profile.png';

export const useAvatarUrl = (providerType, providerUserId) => {
  if (!providerUserId) {
    return profile;
  }
  if (providerType === 'Google') {
    return profile;
  }
  if (providerType === 'Facebook') {
    return `https://graph.facebook.com/${providerUserId}/picture?height=350&width=350`;
  }
  return profile;
};

export default useAvatarUrl;
