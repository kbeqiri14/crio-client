import { memo, useCallback, useState } from 'react';

import ActionButtons from '@shared/ActionButtons';
import { Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import { SecondaryButton } from '@ui-kit/Button';

export const CancelSubscription = memo(({ user }) => {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

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
          <ActionButtons cancelText='NO' saveText='YES, CANCEL' onCancel={hide} onSave={hide} />
        </BlurredModal>
      )}
    </div>
  );
});

export default CancelSubscription;
