import { memo, useMemo } from 'react';
import styled from 'styled-components';

import history from '@configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Tooltip } from '@ui-kit';
import lockImage from '@images/lock.png';
import loadingVideo from '@images/loading-video.png';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  backdrop-filter: blur(8px);
`;

const LockState = ({
  userId,
  accessibility,
  status,
  size = 'normal',
  large,
  isProduct,
  isHovering,
}) => {
  const { user } = useLoggedInUser();
  const { setInfo } = usePresentation();

  const [image, wrapper] = useMemo(
    () =>
      size === 'normal'
        ? [
            { width: 102, height: 102 },
            {
              width: large ? 684 : 330,
              height: isProduct ? (large ? 636 : 245) : 330,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderBottomLeftRadius: isProduct ? 0 : 30,
              borderBottomRightRadius: isProduct ? 0 : 30,
            },
          ]
        : [
            { width: 120, height: 120 },
            {
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderBottomLeftRadius: isProduct ? 0 : 30,
              borderBottomRightRadius: isProduct ? 0 : 30,
            },
          ],
    [size, large, isProduct],
  );

  const unavailable = useMemo(() => status && status !== 'available', [status]);
  const isLocked = useMemo(() => {
    if (user.isCreator || accessibility === 'everyone') {
      return false;
    }
    return user.isSubscribed ? !user.followings?.includes(userId) : true;
  }, [user.isCreator, user.isSubscribed, user.followings, accessibility, userId]);

  const [tooltip, icon, onClick] = useMemo(() => {
    if (unavailable) {
      return ['Your video is being processed. It can take a while. Please wait.', loadingVideo];
    }
    if (user.isSubscribed) {
      return ['Follow Creator to gain access', lockImage];
    }
    return [
      'Subscribe and follow Creator to gain access',
      lockImage,
      () => {
        setInfo({});
        history.push('/pricing');
      },
    ];
  }, [unavailable, user.isSubscribed, setInfo]);

  return unavailable || isLocked ? (
    <Wrapper style={wrapper} onClick={onClick}>
      <Tooltip
        visible={isHovering}
        getPopupContainer={(triggerNode) =>
          triggerNode.parentNode.querySelector('.ant-tooltip-open')
        }
        title={tooltip}
      >
        <div className='relative'>
          <img alt='locked' src={icon} {...image} />
        </div>
      </Tooltip>
    </Wrapper>
  ) : null;
};

export default memo(LockState);
