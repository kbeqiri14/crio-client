import { memo, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import { useForm } from 'react-hook-form';

import { Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import { FormRow, FormItem } from './partials';
import Footer from './Footer';
import './styles.less';

const EditProfile = ({ user, visible, closeModal }) => {
  const [tooltipVisible, setTooltipVisible] = useState();
  const { control, watch, handleSubmit } = useForm();
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const username = watch('username');
  const nameVisible = watch('nameVisible');
  const usernameVisible = watch('usernameVisible');
  const emailVisible = watch('emailVisible');
  const updatedData = useMemo(() => ({
    firstName,
    lastName,
    username,
    nameVisible,
    usernameVisible,
    emailVisible,
  }), [firstName, lastName, username, nameVisible, usernameVisible, emailVisible]);

  const notHidden = useMemo(() => {
    return [
      nameVisible || user?.visibility?.name,
      usernameVisible || user?.visibility?.username,
      emailVisible || user?.visibility?.email
    ].some(item => !item || item !== 'only_me');
  }, [
      emailVisible,
      nameVisible,
      usernameVisible,
      user?.visibility?.name,
      user?.visibility?.username,
      user?.visibility?.email,
  ]);

  return (
    <BlurredModal width={828} visible={visible} onCancel={closeModal}>
      <Row justify='center' gutter={[0, 55]}>
        <Col span={24}>
          <Title level={10} color='white'>
            Edit Profile
          </Title>
        </Col>
        <Col span={24}>
          <Row gutter={[50, 32]}>
            <FormRow
              name='nameVisible'
              control={control}
              defaultValue={user?.visibility?.name}
              tooltipVisible={tooltipVisible === 'nameVisible' && !notHidden}
              setTooltipVisible={setTooltipVisible}
            >
              <FormItem
                span={9}
                name='firstName'
                label='First name'
                control={control}
                defaultValue={user?.firstName} />
              <FormItem
                span={9}
                name='lastName'
                label='Last name'
                control={control}
                defaultValue={user?.lastName} />
            </FormRow>
            <FormRow
              name='usernameVisible'
              control={control}
              defaultValue={user?.visibility?.username}
              tooltipVisible={tooltipVisible === 'usernameVisible' && !notHidden}
              setTooltipVisible={setTooltipVisible}
            >
              <FormItem
                span={18}
                name='username'
                label='Username *'
                control={control}
                defaultValue={user?.username} />
            </FormRow>
            <FormRow
              name='emailVisible'
              control={control}
              defaultValue={user?.visibility?.email}
              tooltipVisible={tooltipVisible === 'emailVisible' && !notHidden}
              setTooltipVisible={setTooltipVisible}
            >
              <FormItem
                span={18}
                name='email'
                label='Email'
                control={control}
                defaultValue={user?.email}
                disabled />
            </FormRow>
          </Row>
        </Col>
        <Col>
          <Footer
            notHidden={notHidden}
            updatedData={updatedData}
            closeModal={closeModal}
            handleSubmit={handleSubmit} />
        </Col>
      </Row>
    </BlurredModal>
  );
};

export default memo(EditProfile);
