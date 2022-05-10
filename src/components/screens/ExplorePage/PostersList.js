import { memo, useCallback, useMemo } from 'react';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Col, Row } from '@ui-kit';
import Poster from './Poster';

export const PostersList = ({ postersList, showActions }) => {
  const { user } = useLoggedInUser();

  const tooltip = useMemo(
    () =>
      user.isSubscribed
        ? 'Follow Creator to Gain Access'
        : 'Subscribe and then Follow Creator to Gain Access',
    [user.isSubscribed],
  );
  const isLock = useCallback(
    (userId, accessibility) => {
      if (user.isCreator || accessibility === 'everyone') {
        return true;
      }
      return user.isSubscribed ? user.followings?.includes(userId) : false;
    },
    [user.isCreator, user.followings, user.isSubscribed],
  );

  return (
    <Row justify='center' gutter={[24, 24]}>
      {postersList.map((item) => (
        <Col key={item.id}>
          <Poster
            providerType={item?.providerType}
            providerUserId={item?.providerUserId}
            avatar={item?.avatar}
            src={item?.thumbnailUri}
            userId={item?.userId}
            username={item?.name}
            artworkId={item?.artworkId}
            title={item?.title}
            description={item?.description}
            status={item?.status}
            videoUri={item?.videoUri}
            isLock={!isLock(item.userId, item.accessibility)}
            showActions={showActions}
            tooltip={tooltip}
          />
        </Col>
      ))}
    </Row>
  );
};

export default memo(PostersList);
