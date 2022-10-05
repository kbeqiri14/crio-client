import { memo } from 'react';

import ActionButtons from '@shared/ActionButtons';
import { Modal, Title } from '@ui-kit';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';

const Confirmation = ({
  visible,
  title,
  loading,
  onConfirm,
  onCancel,
  cancelText = 'NO',
  confirmText = 'YES, CANCEL',
}) => (
  <Modal
    centered
    footer={null}
    closeIcon={<CloseIcon />}
    width={486}
    maskClosable={false}
    open={visible}
    onCancel={onCancel}
    className='confirmation'
  >
    <Title level={1} margin_bottom={64} align='center'>
      {title}
    </Title>
    <ActionButtons
      fillColor='pink'
      cancelText={cancelText}
      saveText={confirmText}
      loading={loading}
      onCancel={onCancel}
      onSave={onConfirm}
    />
  </Modal>
);

export default memo(Confirmation);
