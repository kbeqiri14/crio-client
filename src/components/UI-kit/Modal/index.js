import { Modal } from 'antd';

import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import './styles.less';

export const BlurredModal = ({ children, blurred, className, ...props }) => (
  <Modal
    centered
    footer={null}
    closeIcon={<CloseIcon />}
    className={`blurred ${className}`}
    transitionName='none'
    maskTransitionName='none'
    {...props}
  >
    {children}
  </Modal>
);
