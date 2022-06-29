import { memo, useCallback, useMemo, useState } from 'react';
import { Badge, Skeleton } from 'antd';

import { ReactComponent as CreatorIcon } from '@svgs/verified.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import { ReactComponent as EditIcon } from '@svgs/edit.svg';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { Col, Divider, Row, Text, Title } from '@ui-kit';
import ActionButton from '@root/src/components/screens/Profile/ActionButton';
import EditProfile from '@root/src/components/screens/Profile/EditProfile';

export const ProfileSider = ({ user = {}, isProfile, isSubscribed, hideButton }) => {
  const [visible, setVisible] = useState(false);
  const { providerType, providerUserId, firstName, lastName, username, email, avatar } = user || {};
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
  const name = useMemo(() => `${firstName || ''} ${lastName || ''}`, [firstName, lastName]);
  const editProfile = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);

  if (!user.username) {
    return (
      <Row gutter={[0, 40]} padding_top={40} padding_horizontal={20} padding_bottom={20}>
        <Col span={24} align='center'>
          <Skeleton round active avatar={{ size: 122 }} title={false} paragraph={false} />
        </Col>
        <Col span={24}>
          <Skeleton round active title={{ width: '100%' }} paragraph={{ rows: 5, width: '100%' }} />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row
        gutter={[0, 30]}
        justify='center'
        padding_top={40}
        padding_horizontal={20}
        padding_bottom={20}
      >
        <Col span={24} align='center' margin_bottom={20}>
          {user.isCreator ? (
            <Badge count={<CreatorIcon />} offset={[-12, 105]}>
              <img
                alt='profile'
                width={122}
                height={122}
                src={avatarUrl}
                className='border-radius-100'
              />
            </Badge>
          ) : (
            <img
              alt='profile'
              width={122}
              height={122}
              src={avatarUrl}
              className='border-radius-100'
            />
          )}
        </Col>
        <Col span={isProfile ? 24 : 20}>
          <Row gutter={[0, 4]} style={isProfile ? {} : { marginLeft: 50 }}>
            <Col span={24} align='center'>
              <Title level={2} ellipsis={{ tooltip: username }}>
                @{username}
              </Title>
            </Col>
            <Col span={24} align='center'>
              <Text level={3} ellipsis={{ tooltip: name }} className='full-width'>
                {name}
              </Text>
            </Col>
            <Col span={24} className='mail-icon' align='center'>
              <Text level={3} color='dark25' ellipsis={{ tooltip: email }} className='full-width'>
                <MailIcon /> {isProfile ? <a href={`mailto:${email}`}>{email}</a> : email}
              </Text>
            </Col>
          </Row>
        </Col>
        {!isProfile && (
          <Col span={3} offset={1} onClick={editProfile}>
            <EditIcon className='pointer' />
          </Col>
        )}
        {!hideButton && (
          <Col span={24}>
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
                <Text level={3}>
                  Followers
                  <br />
                  {user.followersCount}
                </Text>
              </Col>
              <Col margin_left={15} margin_right={15}>
                <Divider type='vertical' top={15} />
              </Col>
              <Col align='center'>
                <Text level={3}>
                  Products
                  <br />
                  {user.productsCount}
                </Text>
              </Col>
              <Col margin_left={15} margin_right={15}>
                <Divider type='vertical' top={15} />
              </Col>
              <Col align='center'>
                <Text level={3}>
                  Artworks
                  <br />
                  {user.artworksCount}
                </Text>
              </Col>
            </Row>
          </Col>
        )}
        <Col span={24}>
          <Text level={3}>{user.about}</Text>
        </Col>
      </Row>
      {visible && <EditProfile user={user} visible={visible} closeModal={closeModal} />}
    </>
  );
};

export default memo(ProfileSider);
