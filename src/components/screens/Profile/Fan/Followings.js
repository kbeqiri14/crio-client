import { memo } from 'react';
import { Col, Row } from 'antd';
import { useQuery } from '@apollo/client';

import { getCreatorUsers } from '@app/graphql/queries/users.query';
import { PosterCard } from '@shared/PostersList';
import ProfileInfo from '@shared/ProfileInfo';
import { usePresentation, defaultMockValue } from '@shared/PresentationView';
import { getPosters } from '@screens/LandingPage/posters';
import { Slider } from '@ui-kit/Slider';
import { Spinner } from '@ui-kit/Spinner';

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
const videoPosters = getPosters(8);

const ScrollPosters = ({ handleClick }) => {
  return (
    <div className='cr-feed__poster-scroll'>
      <Slider withScroll breakpoints={SliderBreakPoints}>
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
    <Col span={6}>
      <ProfileInfo
        isFollowing
        {...{ ...user, picture: require(`../../../../assets/images/mock-creators/${user.firstName}.png`).default }}
      />
    </Col>
    <Col span={14}>
      <div className='cr-artworks-section'>
        <ScrollPosters handleClick={handleClick} />
      </div>
    </Col>
  </Row>
);

const Followings = () => {
  const { show } = usePresentation();
  const { data, loading } = useQuery(getCreatorUsers);

  return (
    <Spinner spinning={loading} color='white'>
      {data?.getCreatorUsers?.map(({ userId, ...user }) => <FollowingRow key={userId} user={user} handleClick={show} />)}
    </Spinner>
  );
};

export default memo(Followings);
