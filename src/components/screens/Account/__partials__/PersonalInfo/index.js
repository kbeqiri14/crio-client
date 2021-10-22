import { memo, useMemo } from 'react';
import { Col, Row } from 'antd';

import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as PencilIcon } from '@svgs/pencil.svg';
import ProfileInfo from '@shared/ProfileInfo';
import './styles.less';

const PersonalInfo = ({ user, editProfile }) => {
  const source = useMemo(() => {
    const fbUserId = user?.identities ? JSON.parse(user.identities)?.[0]?.userId : '';
    return fbUserId ? `https://graph.facebook.com/${fbUserId}/picture?height=350&width=350` : '';
  }, [user?.identities]);

  return (
    <Row justify='space-between' align='middle' className='personal-info'>
      <Col span={16}>
        <ProfileInfo
          name={`${user?.firstName || user?.given_name} ${user?.lastName || user?.family_name}`}
          email={user?.email}
          src={source}
          isCreator={user?.isCreator} />
      </Col>
      <Col>
        <SecondaryButton
          size='large'
          textColor='white'
          borderColor='white'
          icon={<PencilIcon />}
          onClick={editProfile}
        >
          EDIT PROFILE
        </SecondaryButton>
      </Col>
    </Row>
  );
};

export default memo(PersonalInfo);
