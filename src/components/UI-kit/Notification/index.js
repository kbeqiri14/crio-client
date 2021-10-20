import { notification } from 'antd';
import {
  LikeOutlined,
  CloseOutlined,
  WarningOutlined,
  CloseCircleFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import './styles.less';

export const successToast = (title) => {
  notification.success({
    message: title,
    className: 'success-toast',
    closeIcon: <CloseCircleFilled color='white' size={19} />,
    icon: <LikeOutlined color='white' size={22} />,
    top: 86,
  });
};

export const infoToast = (title, message) => {
  notification.info({
    message: title,
    description: message,
    className: 'info-toast',
    closeIcon: <CloseOutlined size={19} />,
    top: 86,
  });
};

export const warningToast = (title, message) => {
  notification.warning({
    message: title,
    description: message,
    className: 'warning-toast',
    closeIcon: <CloseOutlined size={19} />,
    icon: <WarningOutlined color='white' size={27.5} />,
    top: 86,
  });
};

export const errorToast = (title, message) => {
  notification.error({
    message: title,
    description: message,
    className: 'error-toast',
    closeIcon: <CloseOutlined size={19} />,
    icon: <ExclamationCircleOutlined color='white' size={27.5} />,
    top: 86,
  });
};

const notifyByType = {
  error: errorToast,
  success: successToast,
  warning: warningToast,
  info: infoToast,
};

/**
 * @param {'error' | 'success' | 'warning' | 'info'} type
 * @param {string} title
 * @param {string} message
 */
export const showToast = (type, title, message) => {
  notifyByType[type](title, message);
};
