import { memo, useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/client';

import { me } from '@app/graphql/queries/users.query';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import ActionButtons from '@shared/ActionButtons';
import { errorToast, successToast } from '@ui-kit/Notification';

const Footer = ({ updatedData, closeModal, handleSubmit }) => {
  const { user, dispatchUser } = useLoggedInUser();

  const disabled = useMemo(() => {
    const { firstName, lastName, username, about } = updatedData;
    return !(
      username !== '' &&
      ((firstName && user?.firstName !== firstName) ||
        (firstName === '' && !!user?.firstName) ||
        (lastName && user?.lastName !== lastName) ||
        (lastName === '' && !!user?.lastName) ||
        (username && user?.username !== username) ||
        (about && user?.about !== about) ||
        (about === '' && !!user?.about))
    );
  }, [updatedData, user?.firstName, user?.lastName, user?.username, user?.about]);

  const [updateUserInfo, { loading }] = useMutation(updateUser, {
    update: (cache, mutationResult) => {
      if (mutationResult?.data?.updateUser) {
        const existingData = cache.readQuery({ query: me });
        cache.writeQuery({
          query: me,
          data: { me: { ...existingData?.me, ...updatedData } },
        });
      }
    },
    onCompleted: (data) => {
      dispatchUser({ ...user, ...data.updateUser });
      closeModal();
      successToast('Your profile has been updated.');
    },
    onError: (data) => {
      let message = data?.message;
      if (message === 'Validation error') {
        message = 'The username has already been taken';
      }
      errorToast(message);
    },
  });

  const onSubmit = useCallback(
    () =>
      updateUserInfo({
        variables: { attributes: updatedData },
      }),
    [updatedData, updateUserInfo],
  );

  return (
    <ActionButtons
      loading={loading}
      disabled={disabled}
      onCancel={closeModal}
      onSave={handleSubmit(onSubmit)}
    />
  );
};

export default memo(Footer);
