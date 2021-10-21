import { memo } from 'react';
import { Col, Row } from 'antd';
import { Controller } from 'react-hook-form';

import { Title } from '@ui-kit/Text';
import { Input } from '@ui-kit/Input';
import { ReactComponent as PublicIcon } from '@svgs/public.svg';
import { ReactComponent as PrivateIcon } from '@svgs/private.svg';
import Visibility from './Visibility';

const menuItems = [
  {
    title: 'Public',
    value: 'public',
    icon: <PublicIcon />,
  },
  {
    title: 'Only me',
    value: 'only_me',
    icon: <PrivateIcon />,
  },
];

export const Header = memo(() => (
  <Col span={24}>
    <Title level={10} color='white'>
      Edit Profile
    </Title>
  </Col>
));

export const Item = memo(({ name, text, span, control, disabled, defaultValue }) => (
  <Col span={span}>
    <Row gutter={[0, 10]}>
      <Col span={24}>
        <Title inline level={30} color='white'>
          {text}
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

export const FormRow = memo(({ children }) => (
  <Col span={24}>
    <Row justify='center' align='bottom' gutter={20}>
      {children}
      <Visibility options={menuItems} onChange={undefined} />
    </Row>
  </Col>
));
