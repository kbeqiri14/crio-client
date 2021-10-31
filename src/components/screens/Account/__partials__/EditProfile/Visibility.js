import { memo, useCallback, useState } from 'react';
import { Select } from 'antd';
import { Controller } from 'react-hook-form';

import { Title } from '@ui-kit/Text';
import { ReactComponent as ArrowBottomIcon } from '@svgs/arrow-down.svg';

const { Option } = Select;

const Item = ({ label, icon }) => <>{icon}<Title inline level={30} color='white'>{label}</Title></>

const Visibility = ({ options, name, control, defaultValue, setTooltipVisible }) => {
  const [selectedValue, setSelectedValue] = useState(
    options.find(({ value }) => value === defaultValue) || options[0],
  );
  const handleMenuItemClick = useCallback(option => {
    setSelectedValue(options.find(({ value }) => value === option));
    setTooltipVisible(option === 'only_me' ? name : undefined);
  }, [name, options, setTooltipVisible]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          suffixIcon={<ArrowBottomIcon />}
          defaultValue={<Item label={selectedValue.label} icon={selectedValue.icon}/>}
          value={<Item label={selectedValue.label} icon={selectedValue.icon}/>}
          onSelect={handleMenuItemClick}
          className='visibility'
        >
          {
            options
              .filter(({ value }) => value !== selectedValue.value)
              .map(({ value, label, icon }) => (
                <Option key={value}>
                  <Item label={label} icon={icon} />
                </Option>
              ))
          }
        </Select>
      )}
    />
  );
};

export default memo(Visibility);
