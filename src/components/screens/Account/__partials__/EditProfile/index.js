import { memo, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import { useForm } from 'react-hook-form';

import { fields, keys } from '@constants/visibility';
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

  const visibility = useMemo(() => {
    const include = [];
    const exclude = [];
    Object.entries({
      name: nameVisible,
      username: usernameVisible,
      email: emailVisible,
    }).forEach(([key, value]) => {
      if (value) {
        if (value === keys.PUBLIC) {
          include.push(key);
        } else {
          exclude.push(key);
        }
      }
    });
    return [...new Set([...user?.visibility, ...include])].filter(
      (item) => !exclude.includes(item),
    );
  }, [nameVisible, usernameVisible, emailVisible, user?.visibility]);

  const updatedData = useMemo(
    () => ({
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      username: username?.trim(),
      visibility,
    }),
    [firstName, lastName, username, visibility],
  );

  return (
    <BlurredModal width={828} visible={visible} onCancel={closeModal} className='edit-profile'>
      <Row justify='center' gutter={[0, 55]}>
        <Col span={24}>
          <Title level={10} color='white'>
            Edit Profile
          </Title>
        </Col>
        <Col span={24}>
          <Row gutter={[50, 50]}>
            <FormRow
              name='nameVisible'
              control={control}
              defaultValue={user?.visibility?.includes(fields.NAME) ? keys.PUBLIC : keys.PRIVATE}
              tooltipVisible={tooltipVisible === 'nameVisible' && !visibility?.length}
              setTooltipVisible={setTooltipVisible}
            >
              <FormItem
                size={14}
                name='firstName'
                label='First name'
                control={control}
                defaultValue={user?.firstName}
              />
              <FormItem
                size={14}
                name='lastName'
                label='Last name'
                control={control}
                defaultValue={user?.lastName}
              />
            </FormRow>
            <FormRow
              name='usernameVisible'
              control={control}
              defaultValue={
                user?.visibility?.includes(fields.USERNAME) ? keys.PUBLIC : keys.PRIVATE
              }
              tooltipVisible={tooltipVisible === 'usernameVisible' && !visibility?.length}
              setTooltipVisible={setTooltipVisible}
            >
              <FormItem
                size={43}
                name='username'
                label='Username *'
                control={control}
                defaultValue={user?.username}
              />
            </FormRow>
            <FormRow
              name='emailVisible'
              control={control}
              defaultValue={user?.visibility?.includes(fields.EMAIL) ? keys.PUBLIC : keys.PRIVATE}
              tooltipVisible={tooltipVisible === 'emailVisible' && !visibility?.length}
              setTooltipVisible={setTooltipVisible}
            >
              <FormItem
                size={49}
                name='email'
                label='Email'
                control={control}
                defaultValue={user?.email}
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
