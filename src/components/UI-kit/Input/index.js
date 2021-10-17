import cc from 'classcat';
import './styles.less';

export const Input = ({ className, ...props }) => {
  const InputTag = 'input';
  return (
    <InputTag className={cc(['crio-input', className])} {...props} />
  );
};
