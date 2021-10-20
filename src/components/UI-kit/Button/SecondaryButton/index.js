import PropTypes from 'prop-types';
import cc from 'classcat';
import { Text, Title } from '@ui-kit/Text';

export const SecondaryButton = ({
  children,
  onClick,
  disabled,
  icon,
  filled = false,
  fillColor = 'primary',
  textColor = 'primary',
  borderColor = 'primary',
  size = 'regular',
  className = '',
  isBlock = false,
}) => {
  return (
    <button
      className={cc([
        'cr-button-secondary',
        {
          filled,
          [`filled-color-${fillColor}`]: filled,
          [`border-color-${borderColor}`]: !!borderColor,
          large: size === 'large',
          'is-block': isBlock,
        },
        className,
      ])}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {size === 'large' ? (
        <Title inline level='30' color={textColor} className='cr-button-secondary__text'>
          {children}
        </Title>
      ) : (
        <Text inline level='40' color={textColor} className='cr-button-secondary__text'>
          {children}
        </Text>
      )}
    </button>
  );
};

export default SecondaryButton;

SecondaryButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fillColor: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'white_25']),
  borderColor: PropTypes.oneOf(['primary', 'secondary', 'white', 'white_75']),
  size: PropTypes.oneOf(['regular', 'large']),
  filled: PropTypes.bool,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  className: PropTypes.string,
  isBlock: PropTypes.bool,
};
