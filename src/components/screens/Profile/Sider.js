import { memo } from 'react';
import { Skeleton } from 'antd';

import { Col, Divider, Row, Text } from '@ui-kit';
import ProfileInfo from './ProfileInfo';
import ActionButton from '@root/src/components/screens/Profile/ActionButton';

export const ProfileSider = ({ user = {}, isProfile, isSubscribed, hideButton }) => {
  return user.username ? (
    <Row
      justify='center'
      padding_top={40}
      padding_horizontal={28}
      padding_bottom={20}
      gutter={[0, 40]}
    >
      <>
        <Col>
          <ProfileInfo user={user} isProfile={isProfile} />
        </Col>
        {!hideButton && (
          <Col>
            <ActionButton
              isProfile={isProfile}
              isSubscribed={isSubscribed}
              isFollow={user.isFollowing}
            />
          </Col>
        )}
        {user.isCreator && (
          <Col>
            <Row>
              <Col align='center'>
                <Text level={3} color='white'>
                  Subscribers
                  <br />
                  {user.followersCount}
                </Text>
              </Col>
              <Col margin_left={15} margin_right={15}>
                <Divider type='vertical' />
              </Col>
              <Col align='center'>
                <Text level={3} color='white'>
                  Artworks
                  <br />
                  {user.artworksCount}
                </Text>
              </Col>
            </Row>
          </Col>
        )}
        {user.about && (
          <Col span={24}>
            <Row justify='center' direction='column'>
              <Col align='center' margin_bottom={12}>
                <Text level={2} color='dark25'>
                  About me
                </Text>
              </Col>
              <Col align='center'>
                <Text level={3} color='white'>
                  {user.about}
                </Text>
              </Col>
            </Row>
          </Col>
        )}
      </>
    </Row>
  ) : (
    <Row justify='center' padding_top={40} padding_horizontal={28} padding_bottom={20}>
      <Col span={24} align='center'>
        <Skeleton round active avatar={{ size: 122 }} title={false} paragraph={false} />
        <Skeleton round active title={{ width: '100%' }} paragraph={{ rows: 5, width: '100%' }} />
      </Col>
    </Row>
  );
};

export default memo(ProfileSider);
