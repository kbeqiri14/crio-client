import { forwardRef } from 'react';
import cc from 'classcat';
import './styles.less';

export const Input = forwardRef(({ className, ...props }, ref) => {
  return <input className={cc(['crio-input', className])} {...props} ref={ref} />;
});
