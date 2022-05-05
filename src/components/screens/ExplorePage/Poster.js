import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@app/configs/history';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Col, Row, Text } from '@ui-kit';
import Actions from '@screens/Video/Actions';

import lockImage from '@images/lock.png';

const PosterWrapper = styled('div')`
  border: 1px solid ${(props) => props.theme.colors.dark50};
  box-sizing: border-box;
  border-radius: 30px;
  margin-bottom: 8px;
  overflow: hidden;
  img {
    border-radius: 30px;
    object-fit: cover;
  }
  .info {
    position: absolute;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 103.09%);
    bottom: 39px;
    padding: 26px 20px;
    width: 332px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.4s linear;
  }
  &:hover {
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
}) => {
  const { pathname } = useLocation();
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
  const { setVideoInfo } = usePresentation();

  const showArtwork = () => {
    const id = videoUri?.substring(videoUri?.lastIndexOf('/') + 1);
    if (pathname.includes('/artwork/')) {
      history.push(`/artwork/${artworkId}`);
    } else {
      window.history.replaceState('', '', `/artwork/${artworkId}`);
      setVideoInfo({
        title,
        description,
        id,
        artworkId,
        userId,
        providerType,
        providerUserId,
        name: username,
        avatar: avatarUrl,
      });
    }
  };
  return (
    <div>
      <PosterWrapper style={isLock ? { pointerEvents: 'none' } : { cursor: 'pointer' }}>
        <div className='info' onClick={() => !isLock && showArtwork()}>
          <Text level={4}>{title}</Text>
        </div>
        {isLock && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              // left: 0,
              // right: 0,
              // top: 0,
              // bottom: 0,
              // background: 'red',
              backdropFilter: 'blur(8px)',
              borderRadius: 30,
              width: 332,
              height: 332,
              // img {
              //   width: 102px !important;
              //   height: 102px !important;
              // }
            }}
          >
            <img alt='lock' src={lockImage} />
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
        <img
          width={332}
          height={332}
          src={src}
          alt='artwork'
          onClick={() => !isLock && showArtwork()}
        />
      </PosterWrapper>
      {/* {!isLock && unavailable && (
          <div className='video-grid__item-lock'>
            <CustomTooltip
              trigger={unavailable && !isLock ? ['hover'] : []}
              className='overlay-process'
              description='Your video is being processed. It can take a while. Please wait.'
            >
              <img alt='lock' src={loadingVideo} />
            </CustomTooltip>
          </div>
        )} */}
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
            <Text level={3} color='white' ellipsis={{ tooltip: username }}>
              {username}
            </Text>
          </Col>
        </Row>
      </Link>
    </div>
  );
};

export default memo(Poster);
