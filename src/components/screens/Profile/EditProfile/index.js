import { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Space, Badge } from 'antd';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import Confirmation from '@shared/Confirmation';
import { Col, Input, Modal, notification, Row, Switch, Text, Title, Upload } from '@ui-kit';
import { ReactComponent as PlusIcon } from '@svgs/plus.svg';
import { ReactComponent as EditIcon } from '@svgs/edit.svg';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import { ReactComponent as RemoveIcon } from '@svgs/remove.svg';
import defaultAvatar from '@svgs/avatar.svg';
import Footer from './Footer';

const EditProfile = ({ user, visible, closeModal }) => {
  const avatarUrl = useAvatarUrl(user.id, user.image);
  const [image, setImage] = useState({ src: avatarUrl });
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationVisible, setConfirmationVisible] = useState();

  const { control, watch, handleSubmit } = useForm();
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const username = watch('username');
  const about = watch('about');
  const showRevenue = watch('showRevenue');
  const emailVisible = watch('emailVisible');

  const updatedData = useMemo(
    () => ({
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      username: username?.trim(),
      about: about?.trim(),
      showRevenue,
      emailVisible,
      image: image.file ? image.file : user.image && image.src === defaultAvatar ? null : undefined,
    }),
    [
      firstName,
      lastName,
      username,
      about,
      showRevenue,
      emailVisible,
      image.file,
      image.src,
      user.image,
    ],
  );
  const disabled = useMemo(() => {
    const { firstName, lastName, username, about, showRevenue, emailVisible } = updatedData;
    return !(
      username !== '' &&
      ((firstName && user?.firstName !== firstName) ||
        (firstName === '' && !!user?.firstName) ||
        (lastName && user?.lastName !== lastName) ||
        (lastName === '' && !!user?.lastName) ||
        (username && user?.username !== username) ||
        (about && user?.about !== about) ||
        (about === '' && !!user?.about) ||
        (showRevenue !== undefined && showRevenue !== user?.showRevenue) ||
        (emailVisible !== undefined && emailVisible !== user?.emailVisible) ||
        image.file ||
        (user.image && image.src === defaultAvatar))
    );
  }, [
    updatedData,
    user?.firstName,
    user?.lastName,
    user?.username,
    user?.about,
    user?.showRevenue,
    user?.emailVisible,
    image.file,
    image.src,
    user.image,
  ]);

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
      width={688}
      open={visible}
      onCancel={onCancel}
    >
      <Row justify='center' gutter={[0, 8]}>
        <Col span={24} padding_bottom={32}>
          <Title level={1}>Edit Profile</Title>
        </Col>
        <Col span={24} align='center'>
          <Badge
            offset={[-20, 105]}
            count={
              <Row gutter={5}>
                <Col>
                  <Upload
                    accept='image/*'
                    beforeUpload={() => false}
                    showUploadList={false}
                    onChange={({ file }) => {
                      if (file instanceof Blob) {
                        if (file.type.split('/')?.[0] !== 'image') {
                          notification.warningToast('Please select an image file');
                          return;
                        }
                        setImage({ file, src: URL.createObjectURL(file) });
                      }
                    }}
                  >
                    {image.src === defaultAvatar ? (
                      <PlusIcon className='pointer' />
                    ) : (
                      <EditIcon className='pointer' />
                    )}
                  </Upload>
                </Col>
                {image.src !== defaultAvatar && (
                  <Col>
                    <RemoveIcon
                      onClick={() => setImage({ src: defaultAvatar })}
                      className='pointer'
                    />
                  </Col>
                )}
              </Row>
            }
          >
            <img
              alt='profile'
              width={122}
              height={122}
              src={image.src}
              className='fit-cover border-radius-100'
            />
          </Badge>
        </Col>
        <Col span={24}>
          <Text level={3}>Username *</Text>
        </Col>
        <Col span={24} padding_bottom={errorMessage ? 0 : 16}>
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
        </Col>
        {errorMessage && (
          <Col span={24} padding_left={14} margin_bottom={-8} margin_top={-6}>
            <Text level={1} color='error100'>
              {errorMessage}
            </Text>
          </Col>
        )}
        <Col span={11}>
          <Text level={3}>First Name</Text>
        </Col>
        <Col offset={2} span={11}>
          <Text level={3}>Last Name</Text>
        </Col>
        <Col span={11} padding_bottom={16}>
          <Controller
            name='firstName'
            control={control}
            defaultValue={user.firstName}
            render={({ field }) => <Input {...field} />}
          />
        </Col>
        <Col offset={2} span={11} padding_bottom={16}>
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
        <Col span={24} padding_bottom={16}>
          <Controller
            name='email'
            control={control}
            defaultValue={user.email}
            render={({ field }) => <Input {...field} disabled />}
          />
        </Col>
        <Col span={24} padding_bottom={16}>
          <Space size='middle'>
            <Text level={3} disabled>
              Show email publicly
            </Text>
            <Controller
              name='emailVisible'
              control={control}
              render={({ field }) => <Switch defaultChecked={user.emailVisible} {...field} />}
            />
          </Space>
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
        {user.isCreator && (
          <Col span={24} padding_bottom={16}>
            <Space size='middle'>
              <Text level={3} disabled>
                Show subscription revenue publicly
              </Text>
              <Controller
                name='showRevenue'
                control={control}
                render={({ field }) => <Switch defaultChecked={user.showRevenue} {...field} />}
              />
            </Space>
          </Col>
        )}
        <Col span={24}>
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
