import { notification } from 'antd';
import {
  LikeOutlined,
  CloseOutlined,
  WarningOutlined,
  CloseCircleFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import './styles.less';

const successToast = (title) => {
  notification.success({
    message: title,
    className: 'success-toast',
    closeIcon: <CloseCircleFilled color='white' size={19} />,
    icon: <LikeOutlined color='white' size={22} />,
    top: 86,
  });
};

const infoToast = (title, message) => {
  notification.info({
    message: title,
    description: message,
    className: 'info-toast',
    closeIcon: <CloseOutlined size={19} />,
    top: 86,
  });
};

const warningToast = (title, message) => {
  notification.warning({
    message: title,
    description: message,
    className: 'warning-toast',
    closeIcon: <CloseOutlined size={19} />,
    icon: <WarningOutlined color='white' size={27.5} />,
    top: 86,
  });
};

const errorToast = (title, message) => {
  notification.error({
    message: title,
    description: message,
    className: 'error-toast',
    closeIcon: <CloseOutlined size={19} />,
    icon: <ExclamationCircleOutlined color='white' size={27.5} />,
    top: 86,
  });
};

const notifications = {
  successToast,
  infoToast,
  warningToast,
  errorToast,
};

export default notifications;
