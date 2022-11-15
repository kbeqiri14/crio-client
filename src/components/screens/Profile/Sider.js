import { memo, useCallback, useMemo, useState } from 'react';
import { Badge as BadgeAnt, Skeleton } from 'antd';
import { useReactiveVar } from '@apollo/client';

import { loggedInUserLoadingVar } from '@configs/client-cache';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { urlify } from '@utils/helpers';
import { Badge, Col, Divider, Row, Text, Title } from '@ui-kit';
import { ReactComponent as CreatorIcon } from '@svgs/verified.svg';
import { ReactComponent as MailIcon } from '@svgs/mail.svg';
import { ReactComponent as EditIcon } from '@svgs/edit.svg';
import ActionButton from '@screens/Profile/ActionButton';
import EditProfile from '@screens/Profile/EditProfile';

export const ProfileSider = ({
  user = {},
  loggedInUserId,
  isProfile,
  isSubscribed,
  hideButton,
}) => {
  const [visible, setVisible] = useState(false);
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);
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
        <Col span={24} align='center'>
          {user.isCreator ? (
            <BadgeAnt count={<CreatorIcon />} offset={[-12, 105]}>
              <img
                alt='profile'
                width={122}
                height={122}
                src={avatarUrl}
                className='border-radius-100'
              />
            </BadgeAnt>
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
        {user.isCreator && !loggedInUserLoading && !loggedInUserId && (
          <Col span={24} className='box'>
            <Row gutter={[0, 12]}>
              <Col>
                <Text level={1}>Subscribe to Crio for $7/month</Text>
              </Col>
              <Col padding_bottom={10}>
                <Badge
                  status='default'
                  color='white'
                  level={6}
                  text={`Support as many creators as you want including ${username}`}
                />
              </Col>
              <Col>
                <Badge
                  status='default'
                  color='white'
                  level={6}
                  text='Unlock free products & exclusive content from all creators you support'
                />
              </Col>
            </Row>
          </Col>
        )}
        {!hideButton && (
          <Col span={24}>
            <ActionButton
              userId={user.id}
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
                <Divider type='vertical' top={15} margin={0} />
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
                  Content
                  <br />
                  {user.artworksCount}
                </Text>
              </Col>
            </Row>
          </Col>
        )}
        {!isProfile && user.isCreator && (
          <Col className='box'>
            <Row justify='space-between' align='middle'>
              <Col>
                <Text level={1}>
                  Subscription
                  <br />
                  revenue
                </Text>
              </Col>
              <Col>
                <Text level={1}>${user.revenue} / month</Text>
              </Col>
            </Row>
          </Col>
        )}
        <Col span={24}>
          <Text level={3}>
            <div
              dangerouslySetInnerHTML={{ __html: urlify(user.about) }}
              style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
            />
          </Text>
        </Col>
      </Row>
      {visible && <EditProfile user={user} visible={visible} closeModal={closeModal} />}
    </>
  );
};

export default memo(ProfileSider);
