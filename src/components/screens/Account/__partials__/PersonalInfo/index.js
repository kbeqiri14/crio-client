import { memo, useMemo } from 'react';
import { Col, Row } from 'antd';

import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as PencilIcon } from '@svgs/pencil.svg';
import { ReactComponent as UnFollowIcon } from '@svgs/unfollow.svg';
import ProfileInfo from '@shared/ProfileInfo';
import './styles.less';

const PersonalInfo = ({
  user,
  isProfile,
  action,
  loading,
  onClick,
}) => {
  const picture = useMemo(
    () =>
      user.fbUserId
        ? `https://graph.facebook.com/${user.fbUserId}/picture?height=350&width=350`
        : user.picture,
    [user.fbUserId, user.picture],
  );
  // const button = useMemo(() => isProfile ? `${hasFollowings ? 'UN' : ''}FOLLOW` : 'EDIT PROFILE', [hasFollowings, isProfile]);

  return (
    <Row justify='space-between' align='middle' className='personal-info'>
      <Col span={16}>
        <ProfileInfo
          firstName={user?.firstName}
          lastName={user?.lastName}
          username={user?.username}
          email={user?.email}
          picture={picture}
          isProfile={isProfile}
          isCreator={user?.isCreator}
        />
      </Col>
      <Col>
        <SecondaryButton
          size='large'
          textColor={isProfile ? undefined : 'white'}
          borderColor={isProfile ? undefined : 'white'}
          icon={isProfile ? <UnFollowIcon /> : <PencilIcon />}
          loading={loading}
          onClick={onClick}
        >
          {action || 'EDIT PROFILE'}
        </SecondaryButton>
      </Col>
    </Row>
  );
};

export default memo(PersonalInfo);
