import { memo, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { DEFAULT_PRIVATE_ROUTE } from '@configs/constants';
import { signupErrorVar } from '@configs/client-cache';
import history from '@configs/history';
import { useCurrentUser } from '@app/auth/hooks';
import { me } from '@app/graphql/queries/users.query';
import { useQueryParams } from '@app/hooks/useRouter';
import { signIn, updateUserImage } from '@app/graphql/mutations/user.mutation';
import { uploadProfileImage } from '@utils/upload.helper';
import { GlobalSpinner, notification } from '@ui-kit';

export const CognitoCallback = () => {
  const { access_token } = useQueryParams();
  const { user } = useCurrentUser();
  const [updateUserImageRequest] = useMutation(updateUserImage, {
    update: (cache, mutationResult) => {
      if (mutationResult?.data?.updateUserImage) {
        const existingData = cache.readQuery({ query: me });
        cache.writeQuery({
          query: me,
          data: { me: { ...existingData?.me, image: mutationResult?.data?.updateUserImage } },
        });
      }
    },
  });

  const [createUser] = useMutation(signIn, {
    onCompleted: (data) => {
      if (data.saveUser.error) {
        localStorage.clear();
        notification.errorToast('Sign up error', data.saveUser.error);
      } else {
        if (data.saveUser.userId) {
          const { picture } = user.attributes;
          const url = `${picture.substring(0, picture.indexOf('s96-c'))}s350`;
          fetch(url)
            .then((res) => res.blob())
            .then(async (blob) => {
              const image = await uploadProfileImage(data.saveUser.userId, blob);
              updateUserImageRequest({
                variables: { userId: data.saveUser.userId, image: `${image}` },
              });
            });
        }
        signupErrorVar(false);
      }
    },
    onError: (e) => {
      localStorage.clear();
      notification.errorToast('Something went wrong!', 'Please, try again later!');
    },
  });

  useEffect(() => {
    if (!access_token) {
      history.push('/');
    }
    if (user) {
      try {
        createUser().then();
      } catch (e) {
        console.log('error creating user ', e);
      } finally {
        history.push(DEFAULT_PRIVATE_ROUTE);
      }
    }
  }, [access_token, user, createUser]);

  return <GlobalSpinner />;
};

export default memo(CognitoCallback);
