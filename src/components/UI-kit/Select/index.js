import cc from 'classcat';
import './styles.less';

export const Option = ({ value, children, className, ...props }) => {
  const OptionTag = 'option';
  return (
    <OptionTag value={value} className={cc([className])} {...props}>
      <div className='crio-option'>{children}</div>
    </OptionTag>
  );
};

export const Select = ({ className, ...props }) => {
  const SelectTag = 'select';
  return (
    <SelectTag className={cc(['crio-select', className])} {...props} />
  );
};
