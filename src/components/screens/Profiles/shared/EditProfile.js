import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Input, Modal, Row, Select, Space } from 'antd';

import { Text } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';

const { Option } = Select;

const Item = ({ text, span, register }) => (
  <Col span={span}>
    <Text>{text}</Text>
    <Input { ...register } />
</Col>
);

const  EditProfile = ({ user, visible, closeModal }) => {
  const { register, handleSubmit } = useForm();

  const Visibility = () => (
    user.creator ? <Col span={8}>
      <Select style={{ width: 140 }}>
        <Option key='public'>Public</Option>
        <Option key='only-me'>Only me</Option>
      </Select>
    </Col> : null
  );

  return (
    <Modal visible={visible} title='Edit Profile' footer={null}>
      <Row justify='center' align='bottom' gutter={[20, 32]}>
        <Item text='First name' span={8} register={{ ...register('firstName') }} />
        <Item text='Last name' span={8} register={{ ...register('lastName') }} />
        <Visibility key='name' />
        <Item text='Username*' span={16} register={{ ...register('username') }} />
        <Visibility key='username' />
        <Item text='Email' span={16} register={{ ...register('email') }} />
        <Visibility key='email' />
        <Col>
          <Space>
            <SecondaryButton shape='round' onClick={closeModal}>
              CANCEL
            </SecondaryButton>
            <SecondaryButton shape='round' type='primary'  onClick={() => {
              handleSubmit(() => console.log('submit'));
              closeModal();
            }}>
              SAVE
            </SecondaryButton>
          </Space>
        </Col>
      </Row>
    </Modal>
   );
}

export default memo(EditProfile);
