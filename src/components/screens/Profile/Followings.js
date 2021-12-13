import { memo } from 'react';
import { Col, Row } from 'antd';

import { PosterCard } from '@shared/PostersList';
import ProfileInfo from '@shared/ProfileInfo';
import { Slider } from '@ui-kit/Slider';
import { Spinner } from '@ui-kit/Spinner';
import { ReactComponent as Icon } from '@svgs/followings-empty.svg';
import EmptyState from '@shared/EmptyState';

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
              <PosterCard
                key={idx}
                name={user.name}
                providerType={user.providerType}
                providerUserId={user.providerUserId}
                {...poster}
              />
            ))}
          </Slider>
        </div>
      </div>
    </Col>
  </Row>
);

const Followings = ({ loadingFollowings, followings }) => (
  <Spinner spinning={loadingFollowings} color='white'>
    {!loadingFollowings && !followings?.length ? (
      <EmptyState Icon={Icon} />
    ) : (
      followings?.map(({ artworks, ...user }, idx) => (
        <FollowingRow key={user.id + idx} user={user} artworks={artworks} />
      ))
    )}
  </Spinner>
);

export default memo(Followings);
