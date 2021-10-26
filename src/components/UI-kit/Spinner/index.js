import { Spin } from 'antd';

import { ReactComponent as LoaderIcon } from '@svgs/loader.svg';
import './styles.less';

export const Spinner = ({ spinning, children, color = 'primary' }) => (
  <Spin spinning={spinning} indicator={<LoaderIcon color={color} className='loader' />}>
    {children}
  </Spin>
);
