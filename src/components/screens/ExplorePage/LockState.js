import { memo, useMemo } from 'react';
import styled from 'styled-components';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { CustomTooltip } from '@ui-kit/Tooltip';
import lockImage from '@images/lock.png';
import loadingVideo from '@images/loading-video.png';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  backdrop-filter: blur(8px);
  border-radius: 30px;
`;

const LockState = ({ userId, accessibility, status, size = 'normal' }) => {
  const { user } = useLoggedInUser();
  const { setVideoInfo } = usePresentation();

  const [image, wrapper] = useMemo(
    () =>
      size === 'normal'
        ? [
            { width: '102', height: '102' },
            { width: 330, height: 330 },
          ]
        : [
            { width: '206', height: '190' },
            { width: '100%', height: '100%' },
          ],
    [size],
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
      return ['Follow Creator to Gain Access', lockImage];
    }
    return [
      'Subscribe and then Follow Creator to Gain Access',
      lockImage,
      () => {
        setVideoInfo({});
        history.push('/pricing');
      },
    ];
  }, [unavailable, user.isSubscribed, setVideoInfo]);

  return unavailable || isLocked ? (
    <Wrapper style={wrapper} onClick={onClick}>
      <CustomTooltip className='overlay-process' description={tooltip}>
        <img alt='locked' src={icon} {...image} />
      </CustomTooltip>
    </Wrapper>
  ) : null;
};

export default memo(LockState);
