import { memo, useCallback } from 'react';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import { successToast } from '@ui-kit/Notification';
import { SecondaryButton } from '@ui-kit/Button';

const Footer = ({ user, disabled, closeModal, handleSubmit }) => {
  const [updateUserInfo, { loading }] = useMutation(updateUser, {
    onCompleted: (data) => {
      dispatchUser({ ...user, ...data.updateUser });
      closeModal();
      successToast('Your profile has been updated.')
    },
  });
  const { dispatchUser } = useLoggedInUser();

  const onSubmit = useCallback(
    (attributes) => updateUserInfo({ variables: { attributes } }),
    [updateUserInfo],
  );

  return <Col>
    <Row gutter={30}>
      <Col>
        <SecondaryButton textColor='white_75' borderColor='white_75' size='large' onClick={closeModal}>
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
  </Col>
};

export default memo(Footer);
