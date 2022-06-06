import { memo, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { updatePaymentMethod } from '@app/graphql/mutations/payment-method.mutation';
import ActionButtons from '@shared/ActionButtons';
import { errorToast, successToast } from '@ui-kit/Notification';

const Footer = ({ disabled, updatedData, onCancel, handleSubmit }) => {
  const [requestUpdate, { loading }] = useMutation(updatePaymentMethod, {
    onCompleted: (data) => successToast('Your payment method has been updated.'),
    onError: (data) => errorToast(data?.message),
  });

  const onSubmit = useCallback(
    () => requestUpdate({ variables: { attributes: updatedData } }),
    [updatedData, requestUpdate],
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
