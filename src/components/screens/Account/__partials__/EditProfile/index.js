import { memo } from 'react';
import { Col, Row } from 'antd';
import { useForm } from 'react-hook-form';

import { BlurredModal } from '@ui-kit/Modal';
import { FormRow, Header, Item } from './partials';
import Footer from './Footer';
import './styles.less';

const EditProfile = ({ user, visible, closeModal }) => {
  const { control, watch, handleSubmit } = useForm();
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const username = watch('username');

  return (
    <BlurredModal width={828} visible={visible} onCancel={closeModal}>
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
        <Col>
          <Footer updatedData={{ firstName, lastName, username }} closeModal={closeModal} handleSubmit={handleSubmit} />
        </Col>
      </Row>
    </BlurredModal>
  );
};

export default memo(EditProfile);
