import { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Confirmation from '@shared/Confirmation';
import { Col, Input, Modal, Row, Text, Title } from '@ui-kit';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import Footer from './Footer';

const EditProfile = ({ user, visible, closeModal }) => {
  const [errorMessage, setErrorMessage] = useState('');
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
    <Modal
      centered
      footer={null}
      closeIcon={<CloseIcon />}
      width={708}
      visible={visible}
      onCancel={onCancel}
    >
      <Row justify='center' gutter={[0, 8]}>
        <Col span={24} padding_bottom={32}>
          <Title level={1}>Edit Profile</Title>
        </Col>
        <Col span={24}>
          <Text level={3}>Username *</Text>
        </Col>
        <Col span={24} padding_bottom={32}>
          <Controller
            name='username'
            control={control}
            defaultValue={user.username}
            render={({ field }) => (
              <Input
                {...field}
                className={errorMessage && 'ant-input-error'}
                onBlur={(e) =>
                  field.onBlur(
                    e.target.value === ''
                      ? setErrorMessage('Please enter your username')
                      : setErrorMessage(''),
                  )
                }
              />
            )}
          />
          <Text level={1} color='error100'>
            {errorMessage}
          </Text>
        </Col>
        <Col span={11}>
          <Text level={3}>First Name</Text>
        </Col>
        <Col offset={2} span={11}>
          <Text level={3}>Last Name</Text>
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
          <Text level={3} disabled>
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
          <Text level={3}>About me</Text>
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
    </Modal>
  );
};

export default memo(EditProfile);
