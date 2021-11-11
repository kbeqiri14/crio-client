import uuid from '@utils/uuid';
import { memo } from 'react';
import { Col, Row, Tooltip } from 'antd';

import { CustomTooltip } from '@ui-kit/Tooltip';
import { Text } from '@ui-kit/Text';
import { arrayChunk, getRandomInt } from '@utils/helpers';
import lockImage from '@images/lock.png';
import loadingVideo from '@images/loading-video.png';
import { ReactComponent as PlayIcon } from '@svgs/play.svg';

export const PosterCard = memo(({
  poster,
  index,
  author,
  title,
  description,
  status,
  videoUri,
  isLock,
  isReal,
  onClick,
  ...props
}) => {
    const handleClick = () => {
      onClick?.({
        title,
        description: description || 'Bruh',
        id: videoUri?.substring(videoUri?.lastIndexOf('/') + 1),
        author: {
          name: author,
          avatar: `https://avatars.dicebear.com/api/pixel-art/${Date.now()}.svg`,
        },
      });
    };
    return (
      <div
        className={`video-grid__item-container ${(isLock || (isReal && status !== 'available')) ? 'lock' : ''}`}
        onClick={handleClick}
        {...props}
      >
        <img alt='Crio artworks poster' src={poster} className={isLock || (isReal && status !== 'available') ? 'lock' : ''} />
        {(index || index === 0) && <div className='poster-number'>{index}</div>}
        <Row justify='space-between' align='bottom' className='video-grid__item-panel'>
          <Col span={22}>
            <div>
              <Text level='60'>{author}</Text>
            </div>
            <div>
              <Tooltip title={title}>
                <Text level={isReal ? '40' : '50'} ellipsis>
                  {title}
                </Text>
              </Tooltip>
            </div>
            {isReal && (
              <Tooltip title={description}>
                <Text level='50' ellipsis>{description}</Text>
              </Tooltip>
            )}
          </Col>
          <Col span={1}>
            <PlayIcon />
          </Col>
        </Row>
        {(isLock || (isReal && status !== 'available')) && (
          <div className='video-grid__item-lock'>
            {
              isLock
                ? <img alt='lock' src={isLock ? lockImage : loadingVideo} />
                : <CustomTooltip
                    className='overlayProcess'
                    description='Your video is being processed. It can take a while. Please wait.'
                  >
                    <img alt='lock' src={isLock ? lockImage : loadingVideo} />
                  </CustomTooltip>
            }
          </div>
        )}
      </div>
    );
  },
);

const LargeVideoPoster = memo(({ poster, onClick }) => (
  <Col span={12} xs={24} xl={12} lg={24} className='video-grid__item large'>
    <PosterCard onClick={onClick} poster={poster} author='Ann Bee' title='Work’s name goes here' />
  </Col>
));

const VideoPostersBlock = memo(({ posters, isLock, nonLock, isReal, onClick }) => (
  <Col xs={24} lg={24} xl={12} span={12}>
    <Row justify='start' align='top' gutter={[22, 35]}>
      {isReal
        ? posters.map(({ id, title, description, status, thumbnailUri, videoUri }, index) => (
            <Col key={index} xs={12} lg={12} xl={12} span={12} className='video-grid__item'>
              <PosterCard
                title={title}
                description={description}
                status={status}
                poster={thumbnailUri}
                videoUri={videoUri}
                isLock={id === nonLock ? false : isLock}
                isReal={true}
                onClick={onClick}
              />
            </Col>
          ))
        : posters.map((p, index) => (
            <Col key={index} xs={12} lg={12} xl={12} span={12} className='video-grid__item'>
              <PosterCard
                isLock={p === nonLock ? false : isLock}
                onClick={onClick}
                poster={p}
                lock
                author='Ann Bee'
                title='Work’s name goes here'
              />
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

export const renderPosters = (
  videoPosters = [],
  largePostersCount,
  handleClick,
  isLock,
  isReal,
) => {
  const largePosters = getRandomIndices(videoPosters.length, largePostersCount);
  const posterLinks = videoPosters.filter((_, idx) => !largePosters.has(idx));
  const regularPosterElements = arrayChunk(posterLinks, 4).map((vp) => (
    <VideoPostersBlock
      isLock={isLock}
      isReal={isReal}
      nonLock={isReal ? posterLinks[0]?.id : posterLinks[0]}
      onClick={handleClick}
      key={uuid()}
      posters={vp}
    />
  ));
  const largePosterElements = videoPosters
    .filter((_, idx) => largePosters.has(idx))
    .map((vp) => <LargeVideoPoster onClick={handleClick} key={uuid()} poster={vp} />);

  const insertionPoints = getRandomIndices(regularPosterElements.length, largePostersCount);

  for (const [idx] of insertionPoints.entries()) {
    regularPosterElements.splice(idx, 0, largePosterElements[0]);
    largePosterElements.splice(0, 1);
  }

  return regularPosterElements;
};
