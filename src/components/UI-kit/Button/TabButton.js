import { Text } from '@ui-kit';
import cc from 'classcat';

export const TabButton = ({ onClick, children, isActive, className }) => {
  return (
    <button onClick={onClick} className={cc(['cr-tab-button', { active: isActive }, className])}>
      <Text level={3} inline color={isActive ? 'white' : 'dark25'}>
        {children}
      </Text>
    </button>
  );
};

export default TabButton;
