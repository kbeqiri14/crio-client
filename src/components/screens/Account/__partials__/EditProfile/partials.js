import { Fragment, memo } from 'react';
import { Col, Row, Tooltip } from 'antd';
import { Controller } from 'react-hook-form';

import { Text, Title } from '@ui-kit/Text';
import { Input } from '@ui-kit/Input';
import { ReactComponent as PublicIcon } from '@svgs/public.svg';
import { ReactComponent as PrivateIcon } from '@svgs/private.svg';
import Visibility from './Visibility';

const options = [
  {
    label: 'Public',
    value: 'public',
    icon: <PublicIcon />,
  },
  {
    label: 'Only me',
    value: 'only_me',
    icon: <PrivateIcon />,
  },
];

export const FormItem = memo(({ span, name, label, control, disabled, defaultValue }) => (
  <Col span={span}>
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
          render={({ field }) => <Input {...field} disabled={disabled} />}
        />
      </Col>
    </Row>
  </Col>
));

export const FormRow = memo(({
  children,
  name,
  control,
  defaultValue,
  tooltipVisible,
  setTooltipVisible,
}) => (
  <Col span={24}>
    <Row align='bottom' gutter={20}>
      {children}
      <Col span={6}>
        <Tooltip
          visible={tooltipVisible}
          color='rgba(112, 114, 128, 1)'
          placement='right'
          title={<Fragment>
            <Title level={30} color='white'>Warning</Title>
            <Text level={20} color='white'>You can’t hide all information from profile.</Text>
          </Fragment>}
        >
          <Visibility
            options={options}
            name={name}
            control={control}
            defaultValue={defaultValue}
            setTooltipVisible={setTooltipVisible} />
        </Tooltip>
      </Col>
    </Row>
  </Col>
));
