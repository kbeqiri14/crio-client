import { memo, useCallback } from 'react';
import { Col, Modal, Row, Space } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import { updateUser } from '@app/graphql/mutations/user.mutation';
import { Title } from '@ui-kit/Text';
import { Input } from '@ui-kit/Input';
import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';

const Item = ({ text, span, size, control, name, defaultValue }) => (
  <Col span={span}>
    <Title inline level={30} color='white'>{text}</Title>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => <Input size={size} {...field} />}
    />
  </Col>
);

const  EditProfile = ({ user, visible, closeModal }) => {
  const { control, handleSubmit } = useForm();
  const [updateUserInfo] = useMutation(updateUser);

  const onSubmit = useCallback(attributes => updateUserInfo({ variables: { attributes } }), [updateUserInfo]);

  return (
    <Modal width={828} visible={visible} footer={null} closeIcon={<CloseIcon />} onCancel={closeModal}>
      <Row justify='center' align='bottom' gutter={[80, 32]}>
        <Col span={24}>
          <Title level={10} color='white'>Edit Profile</Title>
        </Col>
        <Item text='First name' span={8} size={25} control={control} name='firstName' defaultValue={user?.given_name} />
        <Item text='Last name' span={8} size={25} control={control} name='lastName' defaultValue={user?.family_name} />
        <Item text='Username*' span={16} size={56} control={control} name='username' defaultValue={user?.sub} />
        <Item text='Email' span={16} size={56} control={control} name='email' defaultValue={user?.email} />
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
              onClick={handleSubmit(onSubmit)}
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
