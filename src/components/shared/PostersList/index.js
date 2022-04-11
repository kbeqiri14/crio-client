import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row, Tooltip } from 'antd';
import cc from 'classcat';

import history from '@app/configs/history';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { CustomTooltip } from '@ui-kit/Tooltip';
import { Text } from '@ui-kit/Text';
import uuid from '@utils/uuid';
import { arrayChunk, getRandomInt } from '@utils/helpers';
import lockImage from '@images/lock.png';
import loadingVideo from '@images/loading-video.png';
import { ReactComponent as PlayIcon } from '@svgs/play.svg';
import Actions from '@screens/Video/Actions';

export const PosterCard = memo(
  ({
    index,
    name,
    artworkId,
    userId,
    providerType,
    providerUserId,
    avatar,
    title,
    description,
    accessibility,
    status,
    videoUri,
    thumbnailUri,
    showActions,
    onClick,
    ...props
  }) => {
    const { pathname } = useLocation();
    const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
    const { setVideoInfo } = usePresentation();

    const unavailable = status && status !== 'available';
    const isLock = !showActions && accessibility === 'subscriber_only';

    const handleClick = () => {
      if (!isLock) {
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
            name,
            avatar: avatarUrl,
          });
        }
      }
    };

    return (
      <CustomTooltip
        trigger={unavailable && !isLock ? ['hover'] : []}
        className='overlay-process'
        description='Your video is being processed. It can take a while. Please wait.'
      >
        <div
          className={cc(['video-grid__item-container', { processing: unavailable, lock: isLock }])}
          {...props}
        >
          {showActions && (
            <Actions
              artworkId={artworkId}
              videoUri={videoUri}
              title={title}
              description={description}
              accessibility={accessibility}
            />
          )}
          <img
            alt='Crio artworks poster'
            src={thumbnailUri}
            className={cc([{ lock: isLock || unavailable }])}
            onClick={handleClick}
          />
          {(index || index === 0) && <div className='poster-number'>{index}</div>}
          {!isLock && !unavailable && (
            <Row
              justify='space-between'
              align='bottom'
              wrap={false}
              className='video-grid__item-panel'
              onClick={handleClick}
            >
              <Col span={22}>
                <Text level='60'>{name}</Text>
                <Tooltip title={title}>
                  <Text level={'50'} ellipsis>
                    {title}
                  </Text>
                </Tooltip>
              </Col>
              <Col span={1}>
                <PlayIcon />
              </Col>
            </Row>
          )}
          {isLock && (
            <div className='video-grid__item-lock'>
              <img alt='lock' src={lockImage} />
            </div>
          )}
          {!isLock && unavailable && (
            <div className='video-grid__item-lock'>
              <img alt='lock' src={loadingVideo} />
            </div>
          )}
        </div>
      </CustomTooltip>
    );
  },
);

const LargeVideoPoster = memo(({ poster }) => (
  <Col span={12} xs={24} xl={12} lg={24} className='video-grid__item large'>
    <PosterCard {...poster} />
  </Col>
));

const VideoPostersBlock = memo(({ posters }) => (
  <Col xs={24} lg={24} xl={12} span={12}>
    <Row justify='start' align='top' gutter={[22, 35]}>
      {posters.map((poster, index) => (
        <Col key={index} xs={12} lg={12} xl={12} span={12} className='video-grid__item'>
          <PosterCard {...poster} />
        </Col>
      ))}
    </Row>
  </Col>
));

const getRandomIndices = (arrLength, indicesCount) => {
  const indices = new Set();
  if (!indicesCount) {
    return indices;
  }
  for (let c = 0; c < indicesCount; c += 1) {
    let index = getRandomInt(0, arrLength - 1);
    while (indices.has(index)) {
      index = getRandomInt(0, arrLength - 1);
    }
    indices.add(index);
  }
  return indices;
};

export const renderPosters = (videoPosters = [], largePostersCount) => {
  const largePosters = getRandomIndices(videoPosters.length, largePostersCount);
  const posterLinks = videoPosters.filter((_, idx) => !largePosters.has(idx));
  const regularPosterElements = arrayChunk(posterLinks, 4).map((vp) => (
    <VideoPostersBlock key={uuid()} posters={vp} />
  ));
  const largePosterElements = videoPosters
    .filter((_, idx) => largePosters.has(idx))
    .map((vp) => <LargeVideoPoster key={uuid()} poster={vp} />);

  const insertionPoints = getRandomIndices(regularPosterElements.length, largePostersCount);

  for (const [idx] of insertionPoints.entries()) {
    regularPosterElements.splice(idx, 0, largePosterElements[0]);
    largePosterElements.splice(0, 1);
  }

  return regularPosterElements;
};
