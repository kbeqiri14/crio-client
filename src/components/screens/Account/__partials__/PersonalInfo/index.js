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
  followersCount,
  isCreator,
  isProfile,
  isFollow,
  loading,
  onClick,
}) => {
  const buttonLabel = useMemo(
    () => (isProfile ? `${isFollow ? 'UN' : ''}FOLLOW` : 'EDIT PROFILE'),
    [isProfile, isFollow],
  );
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
          user={user}
          followersCount={followersCount}
          isProfile={isProfile}
          isCreator={isCreator || isProfile}
        />
      </Col>
      {!(isCreator && isProfile) && (
        <Col span={8} className='right'>
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
      )}
    </Row>
  );
};

export default memo(PersonalInfo);
