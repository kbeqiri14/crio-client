import { Meta } from '@shared/Meta';
import { Fragment, useRef, useState } from 'react';
import { Carousel, Row } from 'antd';
import { Link } from 'react-router-dom';
import ScrollBars from 'react-custom-scrollbars';
import { getPosters } from '@screens/LandingPage/posters';
import { Footer } from '@shared/Footer';
import { PosterCard, renderPosters } from '@shared/PostersList';
import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import uuid from '@utils/uuid';
import sampleAvatar from '@images/avatar-sample.png';
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
    },
  },
  {
    id: 2,
    url: samplePoster1,
    title: 'The Camper Cartel',
    description: 'We helped Slip.Stream to create music videos in minutes.',
    author: {
      name: 'Lew Chan',
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
    },
  },
  {
    id: 4,
    url: samplePoster3,
    title: 'MUSIC VIDEO CONCEPTS',
    description: 'These are not commissioned pieces for the songs,they are just experiments.',
    author: {
      name: 'Into Dust',
    },
  },
];

const videoPosters = getPosters(8);
const authorVideoPosters = getPosters(15);

const posterWidth = 326.5;
const posterGap = 22;
const postsPerLine = 4;
const scrollWidth = postsPerLine * (posterWidth + posterGap);

const ScrollPosters = () => {
  const scrolls = useRef();

  const handleScrollRight = () => {
    const val = scrolls.current.getValues();
    scrolls.current.view.scroll({
      left: val.scrollLeft + scrollWidth,
      behavior: 'smooth',
    });
  };
  const handleScrollLeft = () => {
    const val = scrolls.current.getValues();
    scrolls.current.view.scroll({
      left: val.scrollLeft - scrollWidth,
      behavior: 'smooth',
    });
  };
  return (
    <div className='cr-feed__poster-scroll'>
      <Meta title='Feed' description='Crio - Artworks Feed' />
      <ScrollBars
        autoHide={false}
        ref={scrolls}
        renderTrackHorizontal={(props) => <div {...props} className='cr-scroll-horizontal' />}
        renderThumbHorizontal={(props) => <div {...props} className='cr-thumb-horizontal' />}
        style={{ width: '100%', height: 276 + 41 }}
      >
        <div className='posters-list'>
          {videoPosters.concat(videoPosters).map((p, idx) => (
            <PosterCard
              key={idx}
              index={idx}
              poster={p}
              author='Ann Bee'
              description='Work’s name goes here'
            />
          ))}
        </div>
      </ScrollBars>
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
              <img alt='Artist avatar' src={sampleAvatar} />
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
