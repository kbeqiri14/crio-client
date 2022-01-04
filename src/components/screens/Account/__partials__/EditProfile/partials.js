import { memo } from 'react';
import { Col, Row } from 'antd';
import { Controller } from 'react-hook-form';

import { keys } from '@constants/visibility';
import { CustomTooltip } from '@ui-kit/Tooltip';
import { Title } from '@ui-kit/Text';
import { Input } from '@ui-kit/Input';
import { ReactComponent as PublicIcon } from '@svgs/public.svg';
import { ReactComponent as PrivateIcon } from '@svgs/private.svg';
import Visibility from './Visibility';

const options = [
  {
    label: 'Public',
    value: keys.PUBLIC,
    icon: <PublicIcon />,
  },
  {
    label: 'Only me',
    value: keys.PRIVATE,
    icon: <PrivateIcon />,
  },
];

export const FormItem = memo(({ size, name, label, control, disabled, defaultValue }) => (
  <Col>
    <Row gutter={[0, 10]}>
      <Col span={24}>
        <Title inline level={30} color={disabled ? 'white_50' : 'white'}>
          {label}
        </Title>
      </Col>
      <Col span={24}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => <Input {...field} size={size} disabled={disabled} />}
        />
      </Col>
    </Row>
  </Col>
));

export const FormRow = memo(
  ({ children, name, control, defaultValue, tooltipVisible, setTooltipVisible }) => (
    <Col span={24}>
      <Row align='bottom' gutter={[10, 20]}>
        {children}
        <Col>
          <CustomTooltip
            visible={tooltipVisible}
            placement='right'
            className='default-overlay'
            title='Warning'
            description='You can’t hide all information from profile.'
          >
            <Visibility
              options={options}
              name={name}
              control={control}
              defaultValue={defaultValue}
              setTooltipVisible={setTooltipVisible}
            />
          </CustomTooltip>
        </Col>
      </Row>
    </Col>
  ),
);
