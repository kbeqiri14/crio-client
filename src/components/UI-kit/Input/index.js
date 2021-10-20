import cc from 'classcat';
import './styles.less';
import { forwardRef } from 'react';

export const Input = forwardRef(({ className, ...props }, ref) => {
  return <input className={cc(['crio-input', className])} {...props} ref={ref} />;
});
