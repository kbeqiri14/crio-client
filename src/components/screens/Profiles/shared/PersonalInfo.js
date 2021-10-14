import React, { Fragment, memo, useState } from 'react';
import { Col, Row } from 'antd';

import { useCurrentUser } from '@app/auth/hooks';
import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as CreatorIcon } from '@svgs/creator.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import { ReactComponent as PencilIcon } from '@svgs/pencil.svg';
import profile from '@images/profile.png';
import EditProfile from './EditProfile';

function PersonalInfo() {
  const [visible, setVisible] = useState(false);
  const { user } = useCurrentUser();

  return (
    <Fragment>
      <Row justify='space-between' align='middle' className='profile'>
        <Col span={16}>
          <Row align='middle'>
            <Col>
              <img alt='profile' src={user?.attributes?.picture ? JSON.parse(user.attributes.picture)?.data?.url : profile} />
              {!user?.creator && <CreatorIcon className='creator-icon' />}
            </Col>
            <Col>
              <Title level={10} color='white'>
                {user?.attributes?.name}
              </Title>
              <MailIcon />
              <Text level={10} underline color='white_75'>
                {user?.attributes?.email || 'n_kosyan@yahoo.com'}
              </Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <SecondaryButton
            filled
            fillColor='transparent'
            size='large'
            icon={<PencilIcon />}
            onClick={() => setVisible(true)}
          >
            EDIT PROFILE
          </SecondaryButton>
        </Col>
      </Row>
      <EditProfile personalInfo={user} visible={visible} closeModal={() => setVisible(false)} />
    </Fragment>
  );
}

export default memo(PersonalInfo);
