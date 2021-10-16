import React, { memo, useCallback } from 'react';
import { Col, Modal, Row, Space } from 'antd';
import { useForm } from 'react-hook-form';

import { Title } from '@ui-kit/Text';
import { Input } from '@ui-kit/Input';
import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';

const Item = ({ text, span, size, register, defaultValue }) => (
  <Col span={span}>
    <Title level={30} color='white'>{text}</Title>
    <Input { ...register } defaultValue={defaultValue} size={size} />
  </Col>
);

const  EditProfile = ({ user, visible, closeModal }) => {
  const { register, handleSubmit } = useForm();
  const updateProfile = useCallback(() => {
    console.log('submit')
    handleSubmit((e) => console.log('submit', e));
    closeModal();
  }, [closeModal, handleSubmit]);

  return (
    <Modal width={828} visible={visible} footer={null} closeIcon={<CloseIcon />} onCancel={closeModal}>
      <Row justify='center' align='bottom' gutter={[80, 32]}>
        <Col span={24}>
          <Title level={10} color='white'>Edit Profile</Title>
        </Col>
        <Item text='First name' span={8} size={25} register={{ ...register('firstName') }} defaultValue={user?.firstName || 'Ann'} />
        <Item text='Last name' span={8} size={25} register={{ ...register('lastName') }} defaultValue={user?.lastName || 'Bee'} />
        <Item text='Username*' span={16} size={56} register={{ ...register('username', { required: true }) }} defaultValue={user?.username || '@allergic_designer'} />
        <Item text='Email' span={16} size={56} register={{ ...register('email') }} defaultValue={user?.email || 'annbee@gmail.com'} />
        <Col>
          <Space>
            <SecondaryButton
              filled
              fillColor='transparent'
              size='large'
              onClick={closeModal}
            >
              CANCEL
            </SecondaryButton>
            <SecondaryButton
              filled
              fillColor='white'
              size='large'
              onClick={updateProfile}
            >
              SAVE
            </SecondaryButton>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
}

export default memo(EditProfile);
