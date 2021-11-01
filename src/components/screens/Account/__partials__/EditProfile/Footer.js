import { memo, useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/client';

import { me } from '@app/graphql/queries/users.query';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import ActionButtons from '@shared/ActionButtons';
import { successToast } from '@ui-kit/Notification';

const Footer = ({ notHidden, updatedData, closeModal, handleSubmit }) => {
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
              visibility: {
                name: updatedData?.nameVisible || user?.visibility?.name,
                username: updatedData?.usernameVisible || user?.visibility?.username,
                email: updatedData?.emailVisible || user?.visibility?.email,
              }
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
    const { firstName, lastName, username, nameVisible, usernameVisible, emailVisible } = updatedData;
    return !(notHidden && username !== ''
      && (((firstName && user?.firstName !== firstName) || (firstName === '' && !!user?.firstName))
        || ((lastName && user?.lastName !== lastName) || (lastName === '' && !!user?.lastName))
        || (username && user?.username !== username)
        || (nameVisible && user?.visibility?.name !== nameVisible)
        || (usernameVisible && user?.visibility?.username !== usernameVisible)
        || (emailVisible && user?.visibility?.email !== emailVisible))
    )
  }, [
    notHidden,
    updatedData,
    user?.firstName,
    user?.lastName,
    user?.username,
    user?.visibility?.name,
    user?.visibility?.username,
    user?.visibility?.email,
  ]);

  const onSubmit = useCallback(
    (attributes) => {
      const { nameVisible, usernameVisible, emailVisible, ...rest } = attributes;
      return updateUserInfo({
        variables: {
          attributes: {
            ...rest,
            visibility: {
              name: updatedData.nameVisible || user?.visibility?.name,
              username: updatedData.usernameVisible || user?.visibility?.username,
              email: updatedData.emailVisible || user?.visibility?.email,
            }
          }
        }
      });
    },
    [
      updateUserInfo,
      updatedData?.nameVisible,
      updatedData?.usernameVisible,
      updatedData?.emailVisible,
      user?.visibility?.name,
      user?.visibility?.username,
      user?.visibility?.email,
    ],
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
