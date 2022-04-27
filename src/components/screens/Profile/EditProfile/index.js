import { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Confirmation from '@shared/Confirmation';
import { Col, Input, Row, Text, Title } from '@ui-kit';
import { BlurredModal } from '@ui-kit/Modal';
import Footer from './Footer';

const EditProfile = ({ user, visible, closeModal }) => {
  const [confirmationVisible, setConfirmationVisible] = useState();
  const { control, watch, handleSubmit } = useForm();
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const username = watch('username');
  const about = watch('about');

  const updatedData = useMemo(
    () => ({
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      username: username?.trim(),
      about: about?.trim(),
    }),
    [firstName, lastName, username, about],
  );
  const disabled = useMemo(() => {
    const { firstName, lastName, username, about } = updatedData;
    return !(
      username !== '' &&
      ((firstName && user?.firstName !== firstName) ||
        (firstName === '' && !!user?.firstName) ||
        (lastName && user?.lastName !== lastName) ||
        (lastName === '' && !!user?.lastName) ||
        (username && user?.username !== username) ||
        (about && user?.about !== about) ||
        (about === '' && !!user?.about))
    );
  }, [updatedData, user?.firstName, user?.lastName, user?.username, user?.about]);

  const hideModal = useCallback(() => {
    setConfirmationVisible(false);
    closeModal();
  }, [closeModal]);
  const hideConfirmation = useCallback(() => setConfirmationVisible(false), []);
  const onCancel = useCallback(
    () => (disabled ? closeModal() : setConfirmationVisible(true)),
    [closeModal, disabled],
  );

  return (
    <BlurredModal width={708} visible={visible} onCancel={onCancel}>
      <Row justify='center' gutter={[0, 8]}>
        <Col span={24} padding_bottom={32}>
          <Title level={1} color='white'>
            Edit Profile
          </Title>
        </Col>
        <Col span={24}>
          <Text level={3} color='white'>
            Username *
          </Text>
        </Col>
        <Col span={24} padding_bottom={32}>
          <Controller
            name='username'
            control={control}
            defaultValue={user.username}
            render={({ field }) => <Input {...field} />}
          />
        </Col>
        <Col span={11}>
          <Text level={3} color='white'>
            First Name
          </Text>
        </Col>
        <Col offset={2} span={11}>
          <Text level={3} color='white'>
            Last Name
          </Text>
        </Col>
        <Col span={11} padding_bottom={32}>
          <Controller
            name='firstName'
            control={control}
            defaultValue={user.firstName}
            render={({ field }) => <Input {...field} />}
          />
        </Col>
        <Col offset={2} span={11} padding_bottom={32}>
          <Controller
            name='lastName'
            control={control}
            defaultValue={user.lastName}
            render={({ field }) => <Input {...field} />}
          />
        </Col>
        <Col span={24}>
          <Text level={3} color='white' disabled>
            Email
          </Text>
        </Col>
        <Col span={24} padding_bottom={32}>
          <Controller
            name='email'
            control={control}
            defaultValue={user.email}
            render={({ field }) => <Input {...field} disabled />}
          />
        </Col>
        <Col span={24}>
          <Text level={3} color='white'>
            About me
          </Text>
        </Col>
        <Col span={24} padding_bottom={32}>
          <Controller
            name='about'
            control={control}
            defaultValue={user.about}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                level={3}
                maxLength={500}
                autoSize={{ minRows: 3, maxRows: 3 }}
              />
            )}
          />
        </Col>
        <Col span={24} padding_bottom={16}>
          <Footer
            disabled={disabled}
            updatedData={updatedData}
            onCancel={onCancel}
            closeModal={hideModal}
            handleSubmit={handleSubmit}
          />
        </Col>
      </Row>
      {confirmationVisible && (
        <Confirmation
          visible={confirmationVisible}
          title='Do you still want to close the changes?'
          onConfirm={hideModal}
          onCancel={hideConfirmation}
        />
      )}
    </BlurredModal>
  );
};

export default memo(EditProfile);
