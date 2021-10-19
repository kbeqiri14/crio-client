import { memo, useCallback } from 'react';
import { Col, Modal, Row, Space } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import { Title } from '@ui-kit/Text';
import { Input } from '@ui-kit/Input';
import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import { ReactComponent as PublicIcon } from '@svgs/public.svg';
import { ReactComponent as PrivateIcon } from '@svgs/private.svg';
import Visibility from './Visibility';
import './styles.less';

const Item = ({ text, span, size, control, name, disabled, defaultValue }) => (
  <Col span={span}>
    <Title inline level={30} color='white'>
      {text}
    </Title>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => <Input size={size} {...field} disabled={disabled} />}
    />
  </Col>
);

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

const FormRow = ({ children }) => {
  return (
    <Col span={24}>
      <Row justify='center' align='bottom' gutter={20}>
        {children}
        <Visibility options={menuItems} onChange={undefined} />
      </Row>
    </Col>
  );
};

const EditProfile = ({ user, visible, closeModal }) => {
  const { control, handleSubmit } = useForm();
  const [updateUserInfo] = useMutation(updateUser);
  const { dispatchUser } = useLoggedInUser();

  const onSubmit = useCallback(
    attributes => updateUserInfo({ variables: { attributes },
      update: data => {
        dispatchUser(data);
        closeModal();
      }, }),
    [closeModal, updateUserInfo, dispatchUser],
  );

  return (
    <Modal
      width={828}
      visible={visible}
      footer={null}
      closeIcon={<CloseIcon />}
      onCancel={closeModal}
    >
      <Row justify='center' gutter={[50, 32]}>
        <Col span={24}>
          <Title level={10} color='white'>
            Edit Profile
          </Title>
        </Col>
        <FormRow>
          <Item
            text='First name'
            span={8}
            size={25}
            control={control}
            name='firstName'
            defaultValue={user?.firstName}
          />
          <Item
            text='Last name'
            span={8}
            size={25}
            control={control}
            name='lastName'
            defaultValue={user?.lastName}
          />
        </FormRow>
        <FormRow>
          <Item
            text='Username*'
            span={16}
            size={56}
            control={control}
            name='username'
            defaultValue={user?.username}
          />
        </FormRow>
        <FormRow>
          <Item
            text='Email'
            span={16}
            size={56}
            control={control}
            name='email'
            defaultValue={user?.email}
            disabled
          />
        </FormRow>
        <Col>
          <Space>
            <SecondaryButton filled fillColor='transparent' size='large' onClick={closeModal}>
              CANCEL
            </SecondaryButton>
            <SecondaryButton filled fillColor='white' size='large' onClick={handleSubmit(onSubmit)}>
              SAVE
            </SecondaryButton>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(EditProfile);
