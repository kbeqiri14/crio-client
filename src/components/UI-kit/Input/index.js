import cc from 'classcat';
import './styles.less';

export const Input = ({ className, ...props }) => {
  const Input = 'input';
  return (
    <Input className={cc(['crio-input', className])} {...props} />
  );
};
