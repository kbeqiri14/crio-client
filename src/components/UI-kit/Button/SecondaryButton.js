import { Text } from '@ui-kit/Text';
import { AlertFilled } from '@ant-design/icons';

export const SecondaryButton = ({ children, onClick, disabled, loading, icon }) => {
  return (
    <button className='cr-button-secondary' onClick={onClick} disabled={disabled}>
      {icon && <AlertFilled />}
      <Text inline level='40' className='cr-button-secondary__text'>
        {children}
      </Text>
    </button>
  );
};

export default SecondaryButton;
