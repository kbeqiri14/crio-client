import { Modal as antModal } from 'antd';
import styled from 'styled-components';

const Modal = styled(antModal)`
  .ant-modal-body {
    padding: 20px 40px 40px;
  }
  .ant-modal-content {
    background: #0f0e16;
    border-radius: 27px;
  }
  .ant-modal-close {
    top: 24px;
    right: 10px;
  }
  &.confirmation {
    .ant-modal-body {
      padding: 74px 0 40px !important;
    }
  }
  &.get-started {
    .ant-modal-body {
      padding: 60px 0 !important;
    }
  }
`;

export default Modal;
