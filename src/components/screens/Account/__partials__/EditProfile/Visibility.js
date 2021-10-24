import { memo, useCallback, useState } from 'react';
import { Col, Dropdown, Menu, Row } from 'antd';

import { Title } from '@ui-kit/Text';
import { ReactComponent as ArrowBottomIcon } from '@svgs/arrow-down.svg';

const Item = memo(({ icon, label, showIcon }) => (
  <Row align='middle' className='visibility'>
    <Col span={5}>
      {icon}
    </Col>
    <Col span={16}>
      <Title inline level={30} color='white'>
        {label}
      </Title>
    </Col>
    <Col span={3}>
      {showIcon && <ArrowBottomIcon />}
    </Col>
  </Row>
));

const Visibility = ({ options = [], defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(options.find(({ value }) => value === defaultValue) || options[0]);

  const handleMenuItemClick = useCallback(
    (option) => () => {
      setSelectedValue(option);
      onChange(option.value);
    },
    [onChange],
  );

  const menu = <Menu>
    {
      options
        .filter(({ value }) => value !== selectedValue.value)
        .map((item) => (
          <Menu.Item key={item.value} onClick={handleMenuItemClick(item)}>
            <Item icon={item.icon} label={item.title} />
          </Menu.Item>
        ))
    }
  </Menu>;

  return (
    <Col span={6}>
      <Dropdown overlay={menu} trigger={['click']}>
        <div>
          <Item icon={selectedValue.icon} label={selectedValue.title} showIcon />
        </div>
      </Dropdown>
    </Col>
  );
};

export default memo(Visibility);
