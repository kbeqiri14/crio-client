import { memo, useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/client';

import { me } from '@app/graphql/queries/users.query';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import ActionButtons from '@shared/ActionButtons';
import { successToast } from '@ui-kit/Notification';

const Footer = ({ updatedData, closeModal, handleSubmit }) => {
  const { user, dispatchUser } = useLoggedInUser();
  const [updateUserInfo, { loading }] = useMutation(updateUser, {
    update: (cache, mutationResult) => {
      if (mutationResult?.data?.updateUser) {
        const existingData = cache.readQuery({
          query: me,
        });
        cache.writeQuery({
          query: me,
          data: {
            me: {
              ...(existingData?.me || {}),
              ...updatedData,
            },
          },
        });
      }
    },
    onCompleted: (data) => {
      dispatchUser({ ...user, ...data.updateUser });
      closeModal();
      successToast('Your profile has been updated.');
    },
  });

  const disabled = useMemo(() => {
    const { firstName, lastName, username } = updatedData;
    return !(username !== ''
      && ((firstName && user?.firstName !== firstName)
        || (lastName && user?.lastName !== lastName)
        || (username && user?.username !== username)))
  }, [updatedData, user?.firstName, user?.lastName, user?.username]);

  const onSubmit = useCallback(
    (attributes) => updateUserInfo({ variables: { attributes } }),
    [updateUserInfo],
  );

  return (
    <ActionButtons
      loading={loading}
      disabled={disabled}
      onCancel={closeModal}
      onSave={handleSubmit(onSubmit)}/>
  );
};

export default memo(Footer);
