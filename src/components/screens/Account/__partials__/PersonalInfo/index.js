import { memo, useMemo } from 'react';
import { Col, Row } from 'antd';

import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as PencilIcon } from '@svgs/pencil.svg';
import { ReactComponent as UnFollowIcon } from '@svgs/unfollow.svg';
import { ReactComponent as FollowIcon } from '@svgs/follow.svg';
import ProfileInfo from '@shared/ProfileInfo';
import './styles.less';

const PersonalInfo = ({
  user,
  isCreator,
  isProfile,
  isFollow,
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
  const buttonLabel = useMemo(() => isProfile ? `${isFollow ? 'UN' : ''}FOLLOW` : 'EDIT PROFILE', [isProfile, isFollow]);
  const buttonIcon = useMemo(() => {
    if (isProfile) {
      return isFollow ? <UnFollowIcon /> : <FollowIcon />;
    }
    return <PencilIcon />;
  }, [isProfile, isFollow]);

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
          isCreator={isCreator || (isProfile && !isFollow)}
        />
      </Col>
      <Col span={3}>
        <SecondaryButton
          size='large'
          textColor={isProfile ? undefined : 'white'}
          borderColor={isProfile ? undefined : 'white'}
          icon={buttonIcon}
          loading={loading}
          onClick={onClick}
        >
          {buttonLabel}
        </SecondaryButton>
      </Col>
    </Row>
  );
};

export default memo(PersonalInfo);
