import { DEFAULT_PRIVATE_ROUTE } from '@configs/constants';
import { memo, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { useCurrentUser } from '@app/auth/hooks';
import { useQueryParams } from '@app/hooks/useRouter';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { me } from '@app/graphql/queries/users.query';
import { signIn } from '@app/graphql/mutations/user.mutation';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';

export const CognitoCallback = () => {
  const { access_token } = useQueryParams();
  const { user } = useCurrentUser();
  // useQuery(me, {
  //   onCompleted: (data) => {
  //     if (access_token && user) {
  //       dispatchUser({
  //         ...user?.attributes,
  //         ...data?.me,
  //         email: user?.attributes?.email,
  //         username: `${user?.attributes?.firstName || user?.attributes?.given_name} ${user?.attributes?.lastName || user?.attributes?.family_name}`,
  //       });
  //       history.push(DEFAULT_PRIVATE_ROUTE);
  //     }
  //   },
  //   onError: (data) => console.log(data, 'error'),
  // });
  // const [createUser] = useMutation(signIn);
  const { dispatchUser } = useLoggedInUser();

  useEffect(() => {
    if (!access_token) {
      history.push('/');
    } else {
      history.push(DEFAULT_PRIVATE_ROUTE);
    }
  }, [access_token]);

  // useEffect(() => {
  //   if (access_token && user) {
  //     try {
  //       // createUser().then();
  //     } catch (e) {
  //       console.log('error creating user ', e);
  //     }
  //   }
  // }, [access_token, user]);

  return <GlobalSpinner />;
};

export default memo(CognitoCallback);
