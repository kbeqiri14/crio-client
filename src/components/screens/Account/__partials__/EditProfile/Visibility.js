import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Dropdown, Row } from 'antd';
import cc from 'classcat';

import { Title } from '@ui-kit/Text';
import { ReactComponent as ArrowBottomIcon } from '@svgs/arrow-down.svg';

const Visibility = ({ options = [], defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState();
  const [dropdownVisible, setDropDownVisible] = useState(false);

  useEffect(() => {
    if (options?.length) {
      const defaultSelected = options.find((op) => op.value === defaultValue);
      setSelectedValue(defaultSelected || options[0]);
    }
  }, [options, defaultValue]);

  const handleVisibilityChange = useCallback((visible) => {
    setDropDownVisible(visible);
  }, []);

  const handleSelectNameVisible = useCallback(
    (option) => () => {
      setSelectedValue(option);
      onChange?.(option.value);
    },
    [onChange],
  );

  const visibilityOverlay = useMemo(
    () =>
      options ? (
        <div>
          {options
            .filter((itm) => itm?.value !== selectedValue?.value)
            .map((item) => (
              <div key={item.value}>
                <button onClick={handleSelectNameVisible(item)} className='dropdown-container'>
                  <Row justify='space-between' align='middle'>
                    <Col className='option-icon'>
                      {item.icon}
                      <Title inline level={30} color='white'>
                        {item.title}
                      </Title>
                    </Col>
                  </Row>
                </button>
              </div>
            ))}
        </div>
      ) : null,
    [handleSelectNameVisible, options, selectedValue?.value],
  );

  return options ? (
    <Col span={7}>
      <Dropdown
        onVisibleChange={handleVisibilityChange}
        placement='bottomCenter'
        className='cr-visibility-dropdown'
        overlay={visibilityOverlay}
        trigger={['click']}
      >
        <button className='dropdown-container'>
          <Row justify='space-between' align='middle'>
            <Col className='option-icon'>
              {selectedValue?.icon}
              <Title inline level={30} color='white'>
                {selectedValue?.title}
              </Title>
            </Col>
            <Col className={cc(['dropdown-arrow', { rotate: dropdownVisible }])}>
              <ArrowBottomIcon />
            </Col>
          </Row>
        </button>
      </Dropdown>
    </Col>
  ) : null;
};

export default memo(Visibility);
