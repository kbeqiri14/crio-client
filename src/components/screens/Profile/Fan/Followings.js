import { memo } from 'react';
import { Col, Row } from 'antd';

import { PosterCard } from '@shared/PostersList';
import ProfileInfo from '@shared/ProfileInfo';
import { usePresentation, defaultMockValue } from '@shared/PresentationView';
import { getPosters } from '@screens/LandingPage/posters';
import { Slider } from '@ui-kit/Slider';
import { Spinner } from '@ui-kit/Spinner';

const SliderBreakPoints = {
  800: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  500: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
  240: {
    slidesPerView: 1,
    slidesPerGroup: 1,
  },
};
const videoPosters = getPosters(8);

const ScrollPosters = ({ handleClick }) => {
  return (
    <div className='cr-feed__poster-scroll'>
      <Slider withScroll breakpoints={SliderBreakPoints} breakpointsBase='container'>
        {videoPosters.concat(videoPosters).map((p, idx) => (
          <PosterCard
            onClick={() => handleClick(defaultMockValue)}
            key={idx}
            poster={p}
            author='Ann Bee'
            title='Work’s name goes here'
          />
        ))}
      </Slider>
    </div>
  );
};

const FollowingRow = ({ user, handleClick }) => (
  <Row justify='center'>
    <Col span={6} className='following-info'>
      <ProfileInfo user={user} isFollowing />
    </Col>
    <Col span={14}>
      <div className='cr-artworks-section'>
        <ScrollPosters handleClick={handleClick} />
      </div>
    </Col>
  </Row>
);

const Followings = ({ loadingFollowings, followings }) => {
  const { show } = usePresentation();

  return (
    <Spinner spinning={loadingFollowings} color='white'>
      {followings?.map(({ userId, ...user }) => <FollowingRow key={user.id} user={user} handleClick={show} />)}
    </Spinner>
  );
};

export default memo(Followings);
