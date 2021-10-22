import { memo } from 'react';
import { Col, Modal, Row } from 'antd';
import { useForm } from 'react-hook-form';

import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import { FormRow, Header, Item } from './partials';
import Footer from './Footer';
import './styles.less';

const EditProfile = ({ user, visible, closeModal }) => {
  const { control, handleSubmit } = useForm();

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
                defaultValue={user?.firstName || user?.given_name}
              />
              <Item
                name='lastName'
                label='Last name'
                span={9}
                control={control}
                defaultValue={user?.lastName || user?.family_name}
              />
            </FormRow>
            <FormRow>
              <Item
                name='username'
                label='Username *'
                span={18}
                control={control}
                defaultValue={user?.username || `${user?.firstName || user?.given_name} ${user?.lastName || user?.family_name}`}
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
        <Footer user={user} closeModal={closeModal} handleSubmit={handleSubmit} />
      </Row>
    </Modal>
  );
};

export default memo(EditProfile);
