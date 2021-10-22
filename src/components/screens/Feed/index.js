import { Fragment, useRef, useState } from 'react';
import { Carousel, Row } from 'antd';
import { Link } from 'react-router-dom';
import { getPosters } from '@screens/LandingPage/posters';
import { PosterCard, renderPosters } from '@shared/PostersList';
import { Footer } from '@shared/Footer';
import { Meta } from '@shared/Meta';
import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import uuid from '@utils/uuid';
import samplePoster from '@images/posters/carousel-poster.jpg';
import samplePoster1 from '@images/posters/carousel-poster.png';
import samplePoster2 from '@images/posters/carousel-poster-2.jpg';
import samplePoster3 from '@images/posters/carousel-poster-3.jpg';
import { ReactComponent as ArrowLeft } from '@svgs/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@svgs/arrow-right.svg';
import './styles.less';

const carouselPosters = [
  {
    id: 1,
    url: samplePoster,
    title: 'Editorial series for Quartz',
    description:
      'This time, we have been asked for three different illustration sets for Quartz’s homepage.',
    author: {
      name: 'Ann Bee',
      avatar: 'https://avatars.dicebear.com/api/pixel-art/Ann_Bee.svg',
    },
  },
  {
    id: 2,
    url: samplePoster1,
    title: 'The Camper Cartel',
    description: 'We helped Slip.Stream to create music videos in minutes.',
    author: {
      name: 'Lew Chan',
      avatar: 'https://avatars.dicebear.com/api/pixel-art/Lew_Chan.svg',
    },
  },
  {
    id: 3,
    url: samplePoster2,
    title: 'Design for video automation',
    description:
      'Starting from the branded colors of the logo, we developed a fresh color palette.',
    author: {
      name: 'Design Studio Kraft',
      avatar: 'https://avatars.dicebear.com/api/pixel-art/Design_Studio_Kraft.svg',
    },
  },
  {
    id: 4,
    url: samplePoster3,
    title: 'MUSIC VIDEO CONCEPTS',
    description: 'These are not commissioned pieces for the songs,they are just experiments.',
    author: {
      name: 'Into Dust',
      avatar: `https://avatars.dicebear.com/api/pixel-art/Into_Dust.svg`,
    },
  },
];
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

const videoPosters = getPosters(8);
const authorVideoPosters = getPosters(15);

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
          slidesToShow={4}
          slidesToScroll={4}
          dots={false}
          infinite
        >
          {videoPosters.concat(videoPosters).map((p, idx) => (
            <PosterCard key={idx} poster={p} author='Ann Bee' title='Work’s name goes here' />
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

const RandomAuthorArtworks = ({ posters }) => (
  <Fragment>
    <div className='cr-artworks-section__author'>
      <Title level='10' color='white' inline>
        © Artwork by &nbsp;
        <Link>Ann Bee</Link>
      </Title>
    </div>
    <ScrollPosters />
    <Row gutter={[22, 35]} className='cr-landing__video-grid__container'>
      {posters}
    </Row>
  </Fragment>
);

export const Feed = () => {
  const [topPosters] = useState(renderPosters(videoPosters, 0));
  const [bottomPosters] = useState(renderPosters(authorVideoPosters, 3));
  const [authorBlocks, setAuthorBlocks] = useState(Array.from({ length: 1 }, () => uuid()));
  const [currentPoster, setCurrentPoster] = useState(carouselPosters[0]);

  const handlePosterChange = (index) => {
    setCurrentPoster(carouselPosters[index]);
  };

  const handleLoadMore = () => {
    setAuthorBlocks(authorBlocks.concat([uuid()]));
  };

  return (
    <div className='cr-feed'>
      <section className='cr-feed__poster-carousel'>
        <div className='cr-carousel'>
          <Carousel
            afterChange={handlePosterChange}
            autoplay
            autoplaySpeed={2500}
            effect='fade'
            className='cr-carousel__container'
          >
            {carouselPosters.map((pic) => (
              <div className='cr-carousel__item' key={pic.id}>
                <img alt={pic.title} src={pic.url} />
              </div>
            ))}
          </Carousel>
          <div className='cr-carousel__cards'>
            <div className='cr-carousel__cards--author'>
              <img alt='Artist avatar' src={currentPoster.author.avatar} />
              <Text level='30' color='dark' inline>
                © Artwork by &nbsp;
              </Text>
              <Link>
                <Text level='30' color='secondary' inline>
                  {currentPoster.author.name}
                </Text>
              </Link>
            </div>
            <div className='cr-carousel__cards--title'>
              <Title level='10' color='dark'>
                {currentPoster.title}
              </Title>
            </div>
            <div className='cr-carousel__cards--desc'>
              <Text level='10' color='black_75'>
                {currentPoster.description}
              </Text>
            </div>
          </div>
        </div>
      </section>
      <section className='cr-feed__posters-list cr-landing__video-grid'>
        <Row gutter={[22, 35]} className='cr-landing__video-grid__container'>
          {topPosters}
        </Row>
        <div className='cr-artworks-section'>
          {authorBlocks.map((blockId) => (
            <RandomAuthorArtworks key={blockId} posters={bottomPosters} />
          ))}
          <Row className='cr-landing__video-grid__see-all'>
            <SecondaryButton onClick={handleLoadMore}>LOAD MORE</SecondaryButton>
          </Row>
        </div>
      </section>
      <Footer />
    </div>
  );
};
