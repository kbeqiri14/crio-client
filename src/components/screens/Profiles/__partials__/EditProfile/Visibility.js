import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Dropdown, Row } from 'antd';

import { Title } from '@ui-kit/Text';
import { ReactComponent as ArrowBottomIcon } from '@svgs/arrow-down.svg';

const Visibility = ({ options = [], defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    if (options?.length) {
      const defaultSelected = options.find((op) => op.value === defaultValue);
      setSelectedValue(defaultSelected || options[0]);
    }
  }, [options, defaultValue]);

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
                    <Col>
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
    <Col span={8}>
      <Dropdown
        placement='bottomCenter'
        className='cr-visibility-dropdown'
        overlay={visibilityOverlay}
        trigger={['hover']}
      >
        <button className='dropdown-container'>
          <Row justify='space-between' align='middle'>
            <Col>
              {selectedValue?.icon}
              <Title inline level={30} color='white'>
                {selectedValue?.title}
              </Title>
            </Col>
            <Col>
              <ArrowBottomIcon />
            </Col>
          </Row>
        </button>
      </Dropdown>
    </Col>
  ) : null;
};

export default memo(Visibility);
