import { memo, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@app/configs/history';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Col, Row, Text } from '@ui-kit';
import { CustomTooltip } from '@ui-kit/Tooltip';
import Actions from '@screens/Video/Actions';
import lockImage from '@images/lock.png';
import loadingVideo from '@images/loading-video.png';

const PosterWrapper = styled('div')`
  border: 1px solid ${(props) => props.theme.colors.dark50};
  box-sizing: border-box;
  border-radius: 30px;
  margin-bottom: 8px;
  cursor: pointer;
  img {
    border-radius: 30px;
    object-fit: cover;
  }
  .info {
    position: absolute;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 103.09%);
    bottom: 39px;
    padding: 26px 20px;
    width: 332px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.4s linear;
  }
  .lock {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    backdrop-filter: blur(8px);
    border-radius: 30px;
    width: 332px;
    height: 332px;
  }
  &:hover:not(.isLock) {
    .actions,
    .info {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Poster = ({
  providerType,
  providerUserId,
  avatar,
  userId,
  username,
  artworkId,
  title,
  description,
  videoUri,
  accessibility,
  status,
  src,
  isLock,
  showActions,
  tooltip,
}) => {
  const { pathname } = useLocation();
  const { setVideoInfo } = usePresentation();
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
  const unavailable = useMemo(() => status && status !== 'available', [status]);

  const goToPricing = useCallback(() => {
    setVideoInfo({});
    history.push('/pricing');
  }, [setVideoInfo]);

  const showArtwork = useCallback(() => {
    if (pathname.includes('/artwork/')) {
      history.push(`/artwork/${artworkId}`);
      return;
    }
    window.history.replaceState('', '', `/artwork/${artworkId}`);
    setVideoInfo({
      title,
      description,
      id: videoUri?.substring(videoUri?.lastIndexOf('/') + 1),
      artworkId,
      userId,
      providerType,
      providerUserId,
      name: username,
      avatar: avatarUrl,
    });
  }, [
    providerType,
    providerUserId,
    userId,
    username,
    artworkId,
    title,
    description,
    videoUri,
    avatarUrl,
    pathname,
    setVideoInfo,
  ]);

  return (
    <>
      <PosterWrapper className={isLock ? 'isLock' : ''}>
        <div className='info' onClick={showArtwork}>
          <Text level={4}>{title}</Text>
        </div>
        {isLock && (
          <div className='lock' onClick={goToPricing}>
            <CustomTooltip className='overlay-process' description={tooltip}>
              <img alt='lock' src={lockImage} />
            </CustomTooltip>
          </div>
        )}
        {unavailable && (
          <div className='lock'>
            <CustomTooltip
              className='overlay-process'
              description='Your video is being processed. It can take a while. Please wait.'
            >
              <img alt='lock' src={loadingVideo} />
            </CustomTooltip>
          </div>
        )}
        {showActions && (
          <Actions
            username={username}
            artworkId={artworkId}
            videoUri={videoUri}
            title={title}
            description={description}
            accessibility={accessibility}
          />
        )}
        <img src={src} alt='artwork' width={332} height={332} onClick={showArtwork} />
      </PosterWrapper>
      <Link to={`/profile/${username}`}>
        <Row gutter={12} align='middle'>
          <Col>
            <img
              src={avatarUrl}
              width={30}
              height={30}
              alt='avatar'
              className='border-radius-100'
            />
          </Col>
          <Col max_width={309}>
            <Text level={3} ellipsis={{ tooltip: username }}>
              {username}
            </Text>
          </Col>
        </Row>
      </Link>
    </>
  );
};

export default memo(Poster);
