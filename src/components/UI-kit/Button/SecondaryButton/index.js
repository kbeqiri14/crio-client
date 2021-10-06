import PropTypes from 'prop-types';
import cc from 'classcat';
import { AlertFilled } from '@ant-design/icons';
import { Text, Title } from '@ui-kit/Text';

export const SecondaryButton = ({
  children,
  onClick,
  disabled,
  loading,
  icon,
  filled = false,
  fillColor = 'primary',
  size = 'regular',
}) => {
  return (
    <button
      className={cc([
        'cr-button-secondary',
        {
          filled,
          [`filled-color-${fillColor}`]: filled,
          large: size === 'large',
        },
      ])}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <AlertFilled />}
      {size === 'large' ? (
        <Title inline level='30' className='cr-button-secondary__text'>
          {children}
        </Title>
      ) : (
        <Text inline level='40' className='cr-button-secondary__text'>
          {children}
        </Text>
      )}
    </button>
  );
};

export default SecondaryButton;

SecondaryButton.propTypes = {
  children: PropTypes.element,
  disabled: PropTypes.bool,
  fillColor: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['regular', 'large']),
  filled: PropTypes.bool,
  icon: PropTypes.element,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
