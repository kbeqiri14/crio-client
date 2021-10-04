import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Input, Modal, Row, Select, Space, Typography } from 'antd';

const { Text } = Typography;
const { Option } = Select;

const Item = ({ text, span, register }) => (
  <Col span={span}>
    <Text>{text}</Text>
    <Input { ...register } />
</Col>
);

function EditProfile({ personalInfo, visible, closeModal }) {
  const { register, handleSubmit } = useForm();

  const Visibility = () => (
    personalInfo.isCreator && <Col span={8}>
      <Select style={{ width: 140 }}>
        <Option key='public'>Public</Option>
        <Option key='only-me'>Only me</Option>
      </Select>
    </Col>
  );

  return (
    <Modal visible={visible} title='Edit Profile' footer={null}>
      <Row justify='center' align='bottom' gutter={[20, 32]}>
        <Item text='First name' span={8} register={{ ...register('firstName') }} />
        <Item text='Last name' span={8} register={{ ...register('lastName') }} />
        <Visibility key='name' />
        <Item text='Username*' span={16} register={{ ...register('username') }} />
        <Visibility key='username' />
        <Item text='Email' span={16} register={{ ...register('email') }} />
        <Visibility key='email' />
        <Col>
          <Space>
            <Button shape='round' onClick={closeModal}>
              CANCEL
            </Button>
            <Button shape='round' type='primary'  onClick={() => {
              handleSubmit(() => console.log('submit'));
              closeModal();
            }}>
              SAVE
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
   );
}

export default memo(EditProfile);
