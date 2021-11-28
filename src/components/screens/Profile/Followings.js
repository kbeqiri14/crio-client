import { memo } from 'react';
import { Col, Row } from 'antd';

import { PosterCard } from '@shared/PostersList';
import ProfileInfo from '@shared/ProfileInfo';
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

const FollowingRow = ({ user, artworks }) => (
  <Row justify='center'>
    <Col span={6} className='following-info'>
      <ProfileInfo user={user} isFollowing />
    </Col>
    <Col span={14}>
      <div className='cr-artworks-section'>
        <div className='cr-feed__poster-scroll'>
          <Slider withScroll breakpoints={SliderBreakPoints} breakpointsBase='container'>
            {artworks?.map((poster, idx) => (
              <PosterCard key={idx} name={user.name} fbUserId={user.fbUserId} {...poster} />
            ))}
          </Slider>
        </div>
      </div>
    </Col>
  </Row>
);

const Followings = ({ loadingFollowings, followings }) => (
  <Spinner spinning={loadingFollowings} color='white'>
    {followings?.map(({ artworks, ...user }) => (
      <FollowingRow key={user.id} user={user} artworks={artworks} />
    ))}
  </Spinner>
);

export default memo(Followings);
