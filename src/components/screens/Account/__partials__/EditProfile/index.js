import { memo, useMemo } from 'react';
import { Col, Modal, Row } from 'antd';
import { useForm } from 'react-hook-form';

import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import { FormRow, Header, Item } from './partials';
import Footer from './Footer';
import './styles.less';

const EditProfile = ({ user, visible, closeModal }) => {
  const { control, watch, handleSubmit } = useForm();
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const username = watch('username');

  const disabled = useMemo(() => (
    username !== ''
    && ((firstName && user?.firstName !== firstName)
      || (lastName && user?.lastName !== lastName)
      || (username && user?.username !== username))
  ), [user?.firstName, user?.lastName, user?.username, firstName, lastName, username])

  return (
    <Modal
      width={828}
      visible={visible}
      footer={null}
      closeIcon={<CloseIcon />}
      onCancel={closeModal}
      className='edit-profile'
    >
      <Row justify='center' gutter={[0, 55]}>
        <Header />
        <Col span={24}>
          <Row gutter={[50, 32]}>
            <FormRow>
              <Item
                name='firstName'
                label='First name'
                span={9}
                control={control}
                defaultValue={user?.firstName}
              />
              <Item
                name='lastName'
                label='Last name'
                span={9}
                control={control}
                defaultValue={user?.lastName}
              />
            </FormRow>
            <FormRow>
              <Item
                name='username'
                label='Username *'
                span={18}
                control={control}
                defaultValue={user?.username}
              />
            </FormRow>
            <FormRow>
              <Item
                name='email'
                label='Email'
                span={18}
                control={control}
                defaultValue={user?.email}
                disabled
              />
            </FormRow>
          </Row>
        </Col>
        <Footer user={user} disabled={!disabled} closeModal={closeModal} handleSubmit={handleSubmit} />
      </Row>
    </Modal>
  );
};

export default memo(EditProfile);
