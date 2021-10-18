import { memo } from 'react';
import { Col, Row } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as CreatorIcon } from '@svgs/creator.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import { ReactComponent as PencilIcon } from '@svgs/pencil.svg';
import profile from '@images/profile.png';

const PersonalInfo = ({ user, editProfile }) => (
  <Row justify='space-between' align='middle' className='profile'>
    <Col span={16}>
      <Row align='middle' gutter={30}>
        <Col>
          <img alt='profile' src={user?.picture ? JSON.parse(user.picture)?.data?.url : profile} />
          {!user?.creator && <CreatorIcon className='creator-icon' />}
        </Col>
        <Col>
          <Title level={10} color='white'>
            {user?.name}
          </Title>
          {user?.email && <Text level={10} underline color='white_75'>
            <MailIcon />
            {user.email}
          </Text>}
        </Col>
      </Row>
    </Col>
    <Col>
      <SecondaryButton
        filled
        fillColor='transparent'
        size='large'
        icon={<PencilIcon />}
        onClick={editProfile}
      >
        EDIT PROFILE
      </SecondaryButton>
    </Col>
  </Row>
);

export default memo(PersonalInfo);
