import { Text } from '@ui-kit/Text';
import cc from 'classcat';

export const TabButton = ({ onClick, children, isActive, className }) => {
  return (
    <button onClick={onClick} className={cc(['cr-tab-button', { active: isActive }, className])}>
      <Text className='cr-tab-button__text' level='20' inline color='white_75'>
        {children}
      </Text>
    </button>
  );
};

export default TabButton;
