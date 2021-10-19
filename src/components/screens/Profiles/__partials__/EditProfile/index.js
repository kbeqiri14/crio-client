import { memo, useCallback } from 'react';
import { Col, Modal, Row } from 'antd';
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

const Header = () => (
  <Col span={24}>
    <Title level={10} color='white'>
      Edit Profile
    </Title>
  </Col>
);

const Footer = ({ onCancel, onSave }) => (
  <Col>
    <Row gutter={30}>
      <Col>
        <SecondaryButton filled fillColor='transparent' size='large' onClick={onCancel}>
          CANCEL
        </SecondaryButton>
      </Col>
      <Col>
        <SecondaryButton filled fillColor='white' size='large' onClick={onSave}>
          SAVE
        </SecondaryButton>
      </Col>
    </Row>
  </Col>
);

const Item = ({ text, span, control, name, disabled, defaultValue }) => (
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
);

const FormRow = ({ children }) => (
  <Col span={24}>
    <Row justify='center' align='bottom' gutter={20}>
      {children}
      <Visibility options={menuItems} onChange={undefined} />
    </Row>
  </Col>
);

const EditProfile = ({ user, visible, closeModal }) => {
  const { control, handleSubmit } = useForm();
  const [updateUserInfo] = useMutation(updateUser, {
    onCompleted: (data) => {
      dispatchUser({ ...user, ...data.updateUser });
      closeModal();
    },
  });
  const { dispatchUser } = useLoggedInUser();

  const onSubmit = useCallback(
    (attributes) => updateUserInfo({ variables: { attributes } }),
    [updateUserInfo],
  );

  return (
    <Modal
      width={828}
      visible={visible}
      footer={null}
      closeIcon={<CloseIcon />}
      onCancel={closeModal}
    >
      <Row justify='center' gutter={[0, 67]}>
        <Header />
        <Col span={24}>
          <Row gutter={[50, 32]}>
            <FormRow>
              <Item
                text='First name'
                span={9}
                control={control}
                name='firstName'
                defaultValue={user?.firstName || user?.given_name}
              />
              <Item
                text='Last name'
                span={9}
                control={control}
                name='lastName'
                defaultValue={user?.lastName || user?.family_name}
              />
            </FormRow>
            <FormRow>
              <Item
                text='Username*'
                span={18}
                control={control}
                name='username'
                defaultValue={user?.username || user?.sub}
              />
            </FormRow>
            <FormRow>
              <Item
                text='Email'
                span={18}
                control={control}
                name='email'
                defaultValue={user?.email}
                disabled
              />
            </FormRow>
          </Row>
        </Col>
        <Footer onCancel={closeModal} onSave={handleSubmit(onSubmit)} />
      </Row>
    </Modal>
  );
};

export default memo(EditProfile);
