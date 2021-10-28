import { memo, useCallback, useMemo } from 'react';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';

import { me } from '@app/graphql/queries/users.query';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import { successToast } from '@ui-kit/Notification';
import { SecondaryButton } from '@ui-kit/Button';

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
    <Row gutter={30}>
      <Col>
        <SecondaryButton
          textColor='white_75'
          borderColor='white_75'
          size='large'
          onClick={closeModal}
        >
          CANCEL
        </SecondaryButton>
      </Col>
      <Col>
        <SecondaryButton
          filled
          textColor={disabled ? 'white_75' : 'white'}
          size='large'
          loading={loading}
          disabled={disabled}
          onClick={handleSubmit(onSubmit)}
        >
          SAVE
        </SecondaryButton>
      </Col>
    </Row>
  );
};

export default memo(Footer);
