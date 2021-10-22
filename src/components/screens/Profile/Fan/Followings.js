import { memo, useRef } from 'react';
import { Carousel, Col, Row } from 'antd';

import { Meta } from '@shared/Meta';
import { PosterCard } from '@shared/PostersList';
import ProfileInfo from '@shared/ProfileInfo';
import { getPosters } from '@screens/LandingPage/posters';
import { ReactComponent as ArrowLeft } from '@svgs/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@svgs/arrow-right.svg';

const videoPosters = getPosters(8);
const slickResponsive = [
  {
    breakpoint: 1440,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
    },
  },
];

const ScrollPosters = () => {
  const slick = useRef();

  const handleScrollRight = () => {
    slick.current.next();
  };
  const handleScrollLeft = () => {
    slick.current.prev();
  };
  return (
    <div className='cr-feed__poster-scroll'>
      <Meta title='Feed' description='Crio - Artworks Feed' />
      <div className='posters-list'>
        <Carousel
          variableWidth
          responsive={slickResponsive}
          ref={slick}
          slidesToScroll={3}
          dots={false}
          infinite
        >
          {videoPosters.concat(videoPosters).map((p, idx) => (
            <PosterCard key={idx} poster={p} author='Ann Bee' description='Work’s name goes here' />
          ))}
        </Carousel>
      </div>
      <div className='slider-left'>
        <button onClick={handleScrollLeft}>
          <ArrowLeft />
        </button>
      </div>
      <div className='slider-right'>
        <button onClick={handleScrollRight}>
          <ArrowRight />
        </button>
      </div>
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
