import { memo, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { me } from '@app/graphql/queries/users.query';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import ActionButtons from '@shared/ActionButtons';
import { notification } from '@ui-kit';

const Footer = ({ disabled, updatedData, onCancel, closeModal, handleSubmit }) => {
  const { user, dispatchUser } = useLoggedInUser();

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
      notification.successToast('Your profile has been updated.');
      dispatchUser({ ...user, ...data.updateUser });
      closeModal();
      setTimeout(() => (window.location.href = `/profile/${updatedData.username}`), 1300);
    },
    onError: (data) => {
      let message = data?.message;
      if (message === 'Validation error') {
        message = 'The username has already been taken';
      }
      notification.errorToast(message);
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
      onCancel={onCancel}
      onSave={handleSubmit(onSubmit)}
    />
  );
};

export default memo(Footer);
