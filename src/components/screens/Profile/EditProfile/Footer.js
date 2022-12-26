import { memo, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { useMutation } from '@apollo/client';

import useAsyncFn from '@app/hooks/useAsyncFn';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import { uploadProfileImage } from '@utils/upload.helper';
import ActionButtons from '@shared/ActionButtons';
import { notification } from '@ui-kit';

const Footer = ({ userId, disabled, updatedData, onCancel, closeModal, handleSubmit }) => {
  const { user, dispatchUser } = useLoggedInUser();

  const [updateUserInfo] = useMutation(updateUser, {
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

  const { call, loading } = useAsyncFn(
    useCallback(async () => {
      let image = updatedData.image;
      if (updatedData.image) {
        const compressionFile = await imageCompression(updatedData.image, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1600,
          useWebWorker: true,
        });
        image = await uploadProfileImage(userId, compressionFile);
      }
      updateUserInfo({
        variables: { attributes: { ...updatedData, image: image ? `${image}` : image } },
      });
    }, [userId, updatedData, updateUserInfo]),
  );

  return (
    <ActionButtons
      loading={loading}
      disabled={disabled}
      onCancel={onCancel}
      onSave={handleSubmit(call)}
    />
  );
};

export default memo(Footer);
