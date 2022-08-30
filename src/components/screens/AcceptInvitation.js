import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import history from '@configs/history';
import { acceptInvitation } from '@app/graphql/mutations/user.mutation';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { errorToast, successToast } from '@ui-kit/Notification';

const AcceptInvitation = () => {
  const { pathname } = useLocation();
  const [accept] = useMutation(acceptInvitation, {
    variables: { email: pathname.split('/').slice(-1)[0] },
    onCompleted: () => {
      history.push('/');
      successToast('You successfully accepted invitation.');
    },
    onError: (e) => {
      history.push('/');
      errorToast(e?.message);
    },
  });

  useEffect(() => {
    accept();
  }, [accept]);

  return <GlobalSpinner />;
};

export default memo(AcceptInvitation);
