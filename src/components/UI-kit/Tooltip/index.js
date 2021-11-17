import { Fragment } from 'react';
import { Tooltip } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import './styles.less';

export const CustomTooltip = ({ children, visible, title, description, className, ...props }) => (
  <Tooltip
    {...props}
    overlayClassName={className}
    visible={visible}
    color='rgba(112, 114, 128, 1)'
    title={
      <Fragment>
        {title && (
          <Title level={30} color='white'>
            {title}
          </Title>
        )}
        <Text level={20} color='white'>
          {description}
        </Text>
      </Fragment>
    }
  >
    {children}
  </Tooltip>
);
