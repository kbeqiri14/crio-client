import { memo } from 'react';
import { Skeleton } from 'antd';

import { Col, Row } from '@ui-kit';
import ProfileInfo from './ProfileInfo';
import ActionButton from '@root/src/components/screens/Profile/ActionButton';
import CreatorInfo from './CreatorInfo';

export const ProfileSider = ({ user, isProfile, isSubscribed }) => {
  return (
    <Row
      justify='center'
      padding_top={80}
      padding_horizontal={28}
      padding_bottom={20}
      gutter={[0, 40]}
    >
      <Col span={24} align='center'>
        <Row justify='center' direction='column'>
          <Col align='center' margin_bottom={20}>
            <Skeleton
              round
              active
              avatar={{ size: 122 }}
              title={false}
              paragraph={false}
              loading={!user?.username}
            />
            <Skeleton
              round
              active
              title={{ width: '100%' }}
              paragraph={{ rows: 5, width: '100%' }}
              loading={!user?.username}
            />
          </Col>
        </Row>
      </Col>
      {user?.username && (
        <>
          <Col>
            <ProfileInfo user={user} />
          </Col>
          <Col>
            <ActionButton
              isProfile={isProfile}
              isSubscribed={isSubscribed}
              isFollow={user.isFollowing}
            />
          </Col>
          {user?.isCreator && (
            <Col>
              <CreatorInfo user={user} />
            </Col>
          )}
        </>
      )}
    </Row>
  );
};

export default memo(ProfileSider);
