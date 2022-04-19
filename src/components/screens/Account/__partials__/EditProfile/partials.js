import { memo } from 'react';
import { Col, Row } from 'antd';
import { Controller } from 'react-hook-form';

import { Title } from '@ui-kit/Text';
import { Input } from '@ui-kit/Input';

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

export const FormRow = memo(({ children }) => (
  <Col span={24}>
    <Row align='bottom' gutter={[10, 20]}>
      {children}
    </Row>
  </Col>
));
