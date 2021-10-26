import { Fragment, useState } from 'react';
import { Carousel, Row } from 'antd';
import { Link } from 'react-router-dom';
import { getPosters } from '@screens/LandingPage/posters';
import { PosterCard, renderPosters } from '@shared/PostersList';
import { Footer } from '@shared/Footer';
import { Meta } from '@shared/Meta';
import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import { Slider } from '@ui-kit/Slider';
import uuid from '@utils/uuid';
import samplePoster from '@images/posters/carousel-poster.jpg';
import samplePoster1 from '@images/posters/carousel-poster.png';
import samplePoster2 from '@images/posters/carousel-poster-2.jpg';
import samplePoster3 from '@images/posters/carousel-poster-3.jpg';
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
const authorVideoPosters = getPosters(15);

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

const RandomAuthorArtworks = ({ posters }) => (
  <Fragment>
    <div className='cr-artworks-section__author'>
      <Title level='10' color='white' inline>
        © Artwork by &nbsp;
        <Link to='/profile/Ann Bee'>Ann Bee</Link>
      </Title>
    </div>
    <ScrollPosters />
    <Row gutter={[22, 35]} className='cr-landing__video-grid__container random-works'>
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
      <Meta title='Feed' description='Crio - Artworks Feed' />
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
              <Link to={`/profile/${currentPoster.author.name}`}>
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
