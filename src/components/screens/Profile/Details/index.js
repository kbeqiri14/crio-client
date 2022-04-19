import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { isFuture } from 'date-fns';
import { Tabs } from 'antd';

import { SendEmailModal } from '@root/src/components/screens/Profile/SendEmailModal';
import { me } from '@app/graphql/queries/users.query';
import { contactCreator } from '@app/graphql/mutations/user.mutation';
import { ReactComponent as Subscription } from '@svgs/subscription.svg';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import history from '@app/configs/history';
import { Spinner } from '@ui-kit/Spinner';
import { errorToast, successToast } from '@ui-kit/Notification';
import Followings from '../Followings';
import Works from '../Works';
import Perks from '../Perks';
import './styles.less';

const { TabPane } = Tabs;

const tabs = {
  WORKS: '1',
  PERKS: '2',
};

const Details = ({
  user,
  name,
  artworksCount,
  isProfile,
  isCreator,
  isFollow,
  isAuthenticated,
  loadingIsFollowing,
  loadingFollowings,
  followings,
}) => {
  const [selectedTier, setSelectedTier] = useState(undefined);
  const { dispatchUser } = useLoggedInUser();
  const { pathname } = useLocation();

  const [getLoggedInUser] = useLazyQuery(me, {
    onCompleted: (data) => {
      let userInfo;
      if (data?.me) {
        userInfo = { ...data.me };
        userInfo.isFan = !userInfo.isCreator;
        userInfo.isSubscribed = userInfo.payment?.subscriptionStatus === 'active';
        const periodEnd = userInfo.payment?.periodEnd;
        userInfo.subscribePeriodIsValid = periodEnd ? isFuture(new Date(periodEnd)) : false;
      }
      dispatchUser(userInfo);
    },
    onError: (data) => console.log(data, 'error'),
    fetchPolicy: 'network-only',
  });

  const [sendEmail, { loading }] = useMutation(contactCreator, {
    onCompleted: () => {
      successToast('The message is successfully sent!');
      setSelectedTier(undefined);
      getLoggedInUser();
    },
    onError: () => errorToast('Something went wrong!', 'Please, try again later!'),
  });

  const handleContactCreator = useCallback(
    async (message) => {
      await sendEmail({
        variables: {
          mailInfo: {
            tier: selectedTier.toString(),
            creatorUsername: name,
            message,
          },
        },
      });
    },
    [name, selectedTier, sendEmail],
  );

  const isSubscribed = useMemo(() => user?.subscribePeriodIsValid && user?.isSubscribed, [user]);
  const activeKey = useMemo(
    () => (pathname.split('/').includes('perks') ? tabs.PERKS : tabs.WORKS),
    [pathname],
  );
  const tab = useMemo(
    () =>
      isCreator || isProfile
        ? `WORKS ${(isProfile ? artworksCount : user?.artworksCount) || ''}`
        : `FOLLOWING ${followings?.length || ''}`,
    [isCreator, isProfile, user?.artworksCount, artworksCount, followings?.length],
  );
  const onTabClick = useCallback(
    (key) => {
      const followingUsername = name ? `/${name}` : '';
      return history.push(`/profile${key === tabs.PERKS ? '/perks' : ''}${followingUsername}`);
    },
    [name],
  );

  return (
    <div className='profile-details'>
      <Tabs defaultActiveKey={activeKey} onTabClick={onTabClick}>
        <TabPane key={tabs.WORKS} tab={tab}>
          {isCreator || isProfile ? (
            loadingIsFollowing ? (
              <Spinner spinning={true} color='white' />
            ) : (
              <Works
                name={name}
                isProfile={isProfile}
                isLock={!(!isProfile || isCreator || isFollow)}
              />
            )
          ) : (
            <Followings
              user={user}
              followings={followings?.getFollowings}
              loadingFollowings={loadingFollowings}
            />
          )}
        </TabPane>
        {isAuthenticated && (isCreator || isProfile) && user && (
          <TabPane key={tabs.PERKS} tab='PERKS'>
            <Perks
              vouchers={user.vouchers}
              onButtonClick={setSelectedTier}
              isCreator={isCreator}
              isProfile={isProfile}
              isSubscribed={isSubscribed}
            />
          </TabPane>
        )}
      </Tabs>
      {isAuthenticated && !isCreator && isProfile && !isSubscribed && (
        <Subscription className='subscription-icon' />
      )}
      {!!selectedTier && (
        <SendEmailModal
          onCancel={() => setSelectedTier(undefined)}
          loading={loading}
          handleSendEmail={handleContactCreator}
        />
      )}
    </div>
  );
};

export default memo(Details);
