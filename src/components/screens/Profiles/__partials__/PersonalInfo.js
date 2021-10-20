import { memo, useMemo } from 'react';
import { Col, Row } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as CreatorIcon } from '@svgs/creator.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import { ReactComponent as PencilIcon } from '@svgs/pencil.svg';
import profile from '@images/profile.png';

const PersonalInfo = ({ user, editProfile }) => {
  const source = useMemo(() => {
    const fbUserId = user?.identities ? JSON.parse(user.identities)?.[0]?.userId : '';
    return fbUserId
      ? `https://graph.facebook.com/${fbUserId}/picture?height=350&width=350`
      : profile;
  }, [user?.identities]);

  return (
    <Row justify='space-between' align='middle' className='profile'>
      <Col span={16}>
        <Row align='middle' gutter={30}>
          <Col>
            <img alt='profile' src={source} />
            {!user?.creator && <CreatorIcon className='creator-icon' />}
          </Col>
          <Col>
            <Title level={10} color='white'>
              {user?.firstName || user?.given_name} {user?.lastName || user?.family_name}
            </Title>
            {user?.email && (
              <Text level={10} underline color='white_75'>
                <MailIcon />
                {user.email}
              </Text>
            )}
          </Col>
        </Row>
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
