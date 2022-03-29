import { memo } from 'react';
import { Col, Row, Skeleton } from 'antd';

import ProfileInfo from '@shared/ProfileInfo';
import ActionButton from './ActionButton.js';
import './styles.less';

const PersonalInfo = ({
  user,
  loadingUser,
  followersCount,
  isFollow,
  setIsFollow,
  isCreator,
  isProfile,
  isAuthenticated,
}) => (
  <Row justify='space-between' align='middle' className='personal-info' gutter={[0, 10]}>
    <Col>
      <Skeleton
        round
        active
        avatar={{ size: 134 }}
        title={{ width: '100%' }}
        paragraph={{ rows: 2 }}
        loading={loadingUser}
      />
      {!loadingUser && (
        <ProfileInfo
          user={user}
          followersCount={followersCount}
          isCreator={isCreator}
          isProfile={isProfile}
        />
      )}
    </Col>
    {isAuthenticated && !(isCreator && isProfile) && (
      <Col className='right'>
        <ActionButton isProfile={isProfile} isFollow={isFollow} setIsFollow={setIsFollow} />
      </Col>
    )}
  </Row>
);

export default memo(PersonalInfo);
