import { memo } from 'react';
import { Col, Row } from 'antd';

import { PosterCard } from '@shared/PostersList';
import ProfileInfo from '@shared/ProfileInfo';
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

const FollowingRow = ({ user }) => (
  <Row justify='center'>
    <Col span={6} className='following-info'>
      <ProfileInfo user={user} isFollowing />
    </Col>
    <Col span={14}>
      <div className='cr-artworks-section'>
        <div className='cr-feed__poster-scroll'>
          <Slider withScroll breakpoints={SliderBreakPoints} breakpointsBase='container'>
            {videoPosters.concat(videoPosters).map((p, idx) => (
              <PosterCard key={idx} thumbnailUri={p} name='Ann Bee' title='Work’s name goes here' />
            ))}
          </Slider>
        </div>
      </div>
    </Col>
  </Row>
);

const Followings = ({ loadingFollowings, followings }) => (
  <Spinner spinning={loadingFollowings} color='white'>
    {followings?.map(({ userId, ...user }, idx) => (
      <FollowingRow key={user.id + idx} user={user} />
    ))}
  </Spinner>
);

export default memo(Followings);
