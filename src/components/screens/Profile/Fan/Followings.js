import { memo } from 'react';
import { Col, Row } from 'antd';

import { PosterCard } from '@shared/PostersList';
import ProfileInfo from '@shared/ProfileInfo';
import { getPosters } from '@screens/LandingPage/posters';
import { Slider } from '@ui-kit/Slider';

const videoPosters = getPosters(8);
const SliderBreakPoints = {
  1440: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1024: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  600: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
  240: {
    slidesPerView: 1,
    slidesPerGroup: 1,
  },
};

const ScrollPosters = () => {
  return (
    <div className='cr-feed__poster-scroll'>
      <Slider withScroll breakpoints={SliderBreakPoints}>
        {videoPosters.concat(videoPosters).map((p, idx) => (
          <PosterCard key={idx} poster={p} author='Ann Bee' title='Work’s name goes here' />
        ))}
      </Slider>
    </div>
  );
};

const mockCreator = {
  name: 'Ben Dee',
  username: 'allergic_designer',
  email: 'ben.dee@gmail.com',
};

const FollowingRow = () => (
  <Row justify='center'>
    <Col span={6}>
      <ProfileInfo {...mockCreator} />
    </Col>
    <Col span={14}>
      <div className='cr-artworks-section'>
        <ScrollPosters />
      </div>
    </Col>
  </Row>
);

const Followings = () => [1, 2].map((item) => <FollowingRow key={item} />);

export default memo(Followings);
