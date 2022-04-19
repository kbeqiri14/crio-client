import { memo, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Skeleton } from 'antd';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getUser } from '@app/graphql/queries/users.query';
import { Button, Col, Divider, Row, Layout, Text } from '@ui-kit';
import ProfileInfo from '../../shared/ProfileInfo';
import ActionButton from '@screens/Account/__partials__/PersonalInfo/ActionButton';
import Details from '@screens/Account/Details';

const { Sider, Content } = Layout;

export const CreatorProfile = () => {
  const { pathname } = useLocation();
  const { user: loggedInUser } = useLoggedInUser();
  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const [requestUser, { data: userData }] = useLazyQuery(getUser, { variables: { username } });
  const user = useMemo(
    () => (username === loggedInUser.username ? loggedInUser : userData?.getUser),
    [loggedInUser, userData?.getUser, username],
  );

  useEffect(() => {
    if (username !== loggedInUser.username) {
      requestUser();
    }
  }, [username, loggedInUser.username, requestUser]);

  return (
    <Layout>
      <Sider>
        <Row
          justify='center'
          padding_top={80}
          padding_horizontal={28}
          padding_bottom={20}
          gutter={[0, 40]}
        >
          <Col span={24} align='center'>
            <Row justify='center' direction='column'>
              <Col align='center' margin_bottom={20} className='profile-info'>
                <Skeleton
                  round
                  active
                  avatar={{ size: 122 }}
                  title={false}
                  paragraph={false}
                  loading={!user?.username}
                />
                <Skeleton
                  round
                  active
                  title={{ width: '100%' }}
                  paragraph={{ rows: 5, width: '100%' }}
                  loading={!user?.username}
                />
              </Col>
            </Row>
          </Col>
          {user?.username && (
            <>
              <Col>
                <ProfileInfo user={user} />
              </Col>
              <Col>
                <Button white='true'>EDIT PROFILE</Button>
                <ActionButton />
              </Col>
              <Col>
                <Row>
                  <Col align='center'>
                    <Text level={3} color='white'>
                      Subscribers
                      <br />
                      {user?.followersCount || 0}
                    </Text>
                  </Col>
                  <Col margin_left={15} margin_right={15}>
                    <Divider type='vertical' />
                  </Col>
                  <Col align='center'>
                    <Text level={3} color='white'>
                      Artworks
                      <br />
                      {user?.artworksCount || 0}
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row justify='center' direction='column'>
                  <Col align='center' margin_bottom={12}>
                    <Text level={2} color='dark25'>
                      About me
                    </Text>
                  </Col>
                  <Col align='center'>
                    <Text level={3} color='white'>
                      I am Ann. I am a 3-D Artist. Check out some of my products below!
                    </Text>
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </Sider>
      <Layout>
        <Content>
          <Details
            isProfile
            name={userData?.getUser?.username}
            artworksCount={userData?.getUser?.artworksCount}
            isAuthenticated={user?.id}
            isCreator={user?.isCreator}
            // isFollow={isFollow}
            // loadingIsFollowing={loadingIsFollowing}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(CreatorProfile);
