import uuid from '@utils/uuid';
import { memo } from 'react';
import { Col, Row } from 'antd';
import { Text } from '@ui-kit/Text';
import { arrayChunk, getRandomInt } from '@utils/helpers';
import { ReactComponent as PlayIcon } from '@svgs/play.svg';

const PosterCard = memo(({ poster, author, description }) => (
  <div className='video-grid__item-container'>
    <img alt='Crio artworks poster' src={poster} />
    <Row justify='space-between' align='bottom' className='video-grid__item-panel'>
      <Col>
        <div>
          <Text level='60'>{author}</Text>
        </div>
        <div>
          <Text level='50'>{description}</Text>
        </div>
      </Col>
      <Col>
        <PlayIcon />
      </Col>
    </Row>
  </div>
));

const LargeVideoPoster = memo(({ poster }) => (
  <Col span={12} xs={24} xl={12} lg={24} className='video-grid__item large'>
    <PosterCard poster={poster} author='Ann Bee' description='Work’s name goes here' />
  </Col>
));

const VideoPostersBlock = memo(({ posters }) => (
  <Col xs={24} lg={24} xl={12} span={12}>
    <Row justify='center' align='top' gutter={[22, 35]}>
      {posters.map((p, index) => (
        <Col key={index} xs={12} lg={12} xl={12} span={12} className='video-grid__item'>
          <PosterCard poster={p} author='Ann Bee' description='Work’s name goes here' />
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

export const renderPosters = (videoPosters, largePostersCount) => {
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
