import { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { cancelSubscription } from '@app/graphql/mutations/user.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import { SecondaryButton } from '@ui-kit/Button';
import { errorToast, successToast } from '@ui-kit/Notification';

export const CancelSubscription = memo(() => {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  const [requestCancelSubscription, { loading }] = useMutation(cancelSubscription, {
    onCompleted: () => {
      hide();
      successToast('Your cancellation request is successfully sent.');
    },
    onError: () => errorToast('Something went wrong!', 'Please, try again later!'),
  });

  return (
    <div>
      <SecondaryButton filled textColor='white' fillColor='tertiary' onClick={show}>
        CANCEL SUBSCRIPTION
      </SecondaryButton>
      {visible && (
        <BlurredModal
          width={486}
          maskClosable={false}
          visible={visible}
          onCancel={hide}
          className='confirmation'
        >
          <Title level={10} color='white'>
            Cancel the subscription?
          </Title>
          <ActionButtons
            cancelText='NO'
            saveText='YES, CANCEL'
            loading={loading}
            onCancel={hide}
            onSave={requestCancelSubscription}
          />
        </BlurredModal>
      )}
    </div>
  );
});

export default CancelSubscription;
