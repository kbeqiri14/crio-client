import { memo, useMemo } from 'react';
import { Col, Row, Tooltip } from 'antd';

import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { CustomTooltip } from '@ui-kit/Tooltip';
import { Text } from '@ui-kit/Text';
import uuid from '@utils/uuid';
import { arrayChunk, getRandomInt } from '@utils/helpers';
import lockImage from '@images/lock.png';
import loadingVideo from '@images/loading-video.png';
import { ReactComponent as PlayIcon } from '@svgs/play.svg';

export const PosterCard = memo(
  ({
    index,
    name,
    userId,
    fbUserId,
    title,
    description,
    status,
    videoUri,
    thumbnailUri,
    isLock,
    onClick,
    ...props
  }) => {
    const { show } = usePresentation();
    const lock = useMemo(() => isLock || (status && status !== 'available'), [isLock, status]);
    const handleClick = () => show({
      title,
      description,
      id: videoUri?.substring(videoUri?.lastIndexOf('/') + 1),
      userId,
      fbUserId,
      name,
      avatar: `https://graph.facebook.com/${fbUserId}/picture?height=350&width=350`,
    });

    return (
      <div
        className={`video-grid__item-container ${lock ? 'lock' : ''}`}
        onClick={handleClick}
        {...props}
      >
        <img alt='Crio artworks poster' src={thumbnailUri} className={lock ? 'lock' : ''} />
        {(index || index === 0) && <div className='poster-number'>{index}</div>}
        <Row justify='space-between' align='bottom' className='video-grid__item-panel'>
          <Col span={22}>
            <div>
              <Text level='60'>{name}</Text>
            </div>
            <div>
              <Tooltip title={title}>
                <Text level={'50'} ellipsis>
                  {title}
                </Text>
              </Tooltip>
            </div>
            <Tooltip title={description}>
              <Text level='50' ellipsis>
                {description}
              </Text>
            </Tooltip>
          </Col>
          <Col span={1}>
            <PlayIcon />
          </Col>
        </Row>
        {lock && (
          <div className='video-grid__item-lock'>
            {isLock ? (
              <img alt='lock' src={isLock ? lockImage : loadingVideo} />
            ) : (
              <CustomTooltip
                className='overlayProcess'
                description='Your video is being processed. It can take a while. Please wait.'
              >
                <img alt='lock' src={isLock ? lockImage : loadingVideo} />
              </CustomTooltip>
            )}
          </div>
        )}
      </div>
    );
  },
);

const LargeVideoPoster = memo(({ poster }) => (
  <Col span={12} xs={24} xl={12} lg={24} className='video-grid__item large'>
    <PosterCard {...poster} />
  </Col>
));

const VideoPostersBlock = memo(({ posters, isLock, nonLock }) => (
  <Col xs={24} lg={24} xl={12} span={12}>
    <Row justify='start' align='top' gutter={[22, 35]}>
      {posters.map((poster, index) => (
        <Col key={index} xs={12} lg={12} xl={12} span={12} className='video-grid__item'>
          <PosterCard {...poster} isLock={poster.id === nonLock ? false : isLock} />
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

export const renderPosters = (videoPosters = [], largePostersCount, isLock) => {
  const largePosters = getRandomIndices(videoPosters.length, largePostersCount);
  const posterLinks = videoPosters.filter((_, idx) => !largePosters.has(idx));
  const regularPosterElements = arrayChunk(posterLinks, 4).map((vp) => (
    <VideoPostersBlock
      isLock={isLock}
      nonLock={posterLinks[0]?.id}
      key={uuid()}
      posters={vp}
    />
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
