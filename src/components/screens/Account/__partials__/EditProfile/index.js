import { memo, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Col, Row, Title } from '@ui-kit';
import { BlurredModal } from '@ui-kit/Modal';
import { FormRow, FormItem } from './partials';
import Footer from './Footer';

const EditProfile = ({ user, visible, closeModal }) => {
  const { control, watch, handleSubmit } = useForm();
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const username = watch('username');

  const updatedData = useMemo(
    () => ({
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      username: username?.trim(),
    }),
    [firstName, lastName, username],
  );

  return (
    <BlurredModal width={708} visible={visible} onCancel={closeModal} className='edit-profile'>
      <Row justify='center' gutter={[0, 40]}>
        <Col span={24}>
          <Title level={1} color='white'>
            Edit Profile
          </Title>
        </Col>
        <Col span={24}>
          <Row gutter={[50, 50]}>
            <FormRow>
              <FormItem
                size={43}
                name='username'
                label='Username *'
                control={control}
                defaultValue={user.username}
              />
            </FormRow>
            <FormRow>
              <FormItem
                size={14}
                name='firstName'
                label='First name'
                control={control}
                defaultValue={user.firstName}
              />
              <FormItem
                size={14}
                name='lastName'
                label='Last name'
                control={control}
                defaultValue={user.lastName}
              />
            </FormRow>
            <FormRow>
              <FormItem
                size={49}
                name='email'
                label='Email'
                control={control}
                defaultValue={user.email}
                disabled
              />
            </FormRow>
          </Row>
        </Col>
        <Col span={24}>
          <Footer updatedData={updatedData} closeModal={closeModal} handleSubmit={handleSubmit} />
        </Col>
      </Row>
    </BlurredModal>
  );
};

export default memo(EditProfile);
