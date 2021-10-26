import { memo, useMemo } from 'react';
import { Col, Row } from 'antd';

import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as PencilIcon } from '@svgs/pencil.svg';
import { ReactComponent as UnFollowIcon } from '@svgs/unfollow.svg';
import ProfileInfo from '@shared/ProfileInfo';
import './styles.less';

const PersonalInfo = ({ isProfile, user, editProfile }) => {
  const picture = useMemo(
    () =>
      user.fbUserId
        ? `https://graph.facebook.com/${user.fbUserId}/picture?height=350&width=350`
        : user.picture,
    [user.fbUserId, user.picture],
  );

  return (
    <Row justify='space-between' align='middle' className='personal-info'>
      <Col span={16}>
        <ProfileInfo
          name={`${user?.firstName || ''} ${user?.lastName || ''}`}
          username={isProfile ? user?.username : undefined}
          email={user?.email}
          picture={picture}
          isCreator={user?.isCreator}
        />
      </Col>
      <Col>
        <SecondaryButton
          size='large'
          textColor={isProfile ? undefined : 'white'}
          borderColor={isProfile ? undefined : 'white'}
          icon={isProfile ? <UnFollowIcon /> : <PencilIcon />}
          onClick={editProfile}
        >
          {isProfile ? 'UNFOLLOW' : 'EDIT PROFILE'}
        </SecondaryButton>
      </Col>
    </Row>
  );
};

export default memo(PersonalInfo);
