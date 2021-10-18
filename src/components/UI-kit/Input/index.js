import cc from 'classcat';
import './styles.less';

export const Input = ({ className, ...props }) => {
  return <input className={cc(['crio-input', className])} {...props} />;
};
