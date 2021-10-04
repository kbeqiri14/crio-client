import React, { Fragment, memo, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import Icon, { EditOutlined } from '@ant-design/icons';

import { ReactComponent as avatarIcon } from '../../../../assets/icons/avatar.svg';
import { ReactComponent as creatorIcon } from '../../../../assets/icons/creator.svg';
import { ReactComponent as mailIcon } from '../../../../assets/icons/mail.svg';

import EditProfile from './EditProfile';

const { Text } = Typography;

const personalInfo = {
  image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  name: 'Ann Bee',
  email: 'ann.bee@gmail.com',
  isCreator: true,
}

function PersonalInfo() {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <Row
        justify='space-around'
        align='middle'
        style={{ backgroundColor: 'rgba(0.9, 0.9, 0.9, 1.0)' }}>
        <Col>
          <Row align='middle'>
            <Col span={12}>
              <Icon component={avatarIcon} style={{ fontSize: 150 }} />
              {personalInfo.isCreator && <Icon
                component={creatorIcon}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 110,
                  fontSize: 40
                }} />}
            </Col>
            <Col span={12}>
              <Text
                style={{
                  fontSize: 26,
                  weight: '400',
                  color: '#FFFFFF',
                }}
              >
                {personalInfo.name}
              </Text><br />
              <Icon component={mailIcon} />
              <Text
                underline={true}
                style={{
                  fontSize: 18,
                  weight: '400',
                  color: 'rgba(255,255,255,0.75)',
                }}>
                {personalInfo.email}
              </Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <Button shape='round' icon={<EditOutlined />} onClick={() => setVisible(true)}>
            EDIT PROFILE
          </Button>
        </Col>
      </Row>
      <EditProfile personalInfo={personalInfo} visible={visible} closeModal={() => setVisible(false)} />
    </Fragment>
  );
}

export default memo(PersonalInfo);
