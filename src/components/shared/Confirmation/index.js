import { memo } from 'react';

import ActionButtons from '@shared/ActionButtons';
import { Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';

const Confirmation = ({
  visible,
  title,
  loading,
  onConfirm,
  onCancel,
  cancelText = 'NO',
  confirmText = 'YES, CANCEL',
}) => (
  <BlurredModal
    width={486}
    maskClosable={false}
    visible={visible}
    onCancel={onCancel}
    className='confirmation'
  >
    <Title level={10} color='white'>
      {title}
    </Title>
    <ActionButtons
      cancelText={cancelText}
      saveText={confirmText}
      loading={loading}
      onCancel={onCancel}
      onSave={onConfirm}
    />
  </BlurredModal>
);

export default memo(Confirmation);
