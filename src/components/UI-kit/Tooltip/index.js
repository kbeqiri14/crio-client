import { Tooltip } from 'antd';

import { Text, Title } from '@ui-kit';
import './styles.less';

export const CustomTooltip = ({ children, title, description, className, ...props }) => (
  <Tooltip
    {...props}
    overlayClassName={className}
    color='#202020'
    title={
      <>
        {title && <Title level={2}>{title}</Title>}
        <Text level={1}>{description}</Text>
      </>
    }
  >
    {children}
  </Tooltip>
);
