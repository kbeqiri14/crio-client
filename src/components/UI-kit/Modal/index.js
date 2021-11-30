import { Modal } from 'antd';

import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import './styles.less';

export const BlurredModal = ({ children, blurred, className, visible, ...props }) => (
  <Modal
    centered
    footer={null}
    closeIcon={<CloseIcon />}
    className={`blurred ${className}`}
    transitionName='none'
    maskTransitionName='none'
    visible={visible}
    {...props}
  >
    {children}
  </Modal>
);
