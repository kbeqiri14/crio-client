import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { Spinner } from '@ui-kit/Spinner';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row } from 'antd';
import { Img } from 'react-image';

import { useRandomArtworks } from '@root/src/hooks/useRandomArtworks';
import { PosterCard, renderPosters } from '@shared/PostersList';
import { Footer } from '@shared/Footer';
import { Meta } from '@shared/Meta';
import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import { Slider } from '@ui-kit/Slider';
import uuid from '@utils/uuid';
import { getPosters } from '@screens/LandingPage/posters';
import './styles.less';

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

const RandomAuthorArtworks = ({ posters }) => (
  <Fragment>
    <div className='cr-artworks-section__author'>
      <Title level='10' color='white' inline>
        © Artwork by &nbsp;
        <Link to='/'>Ann Bee</Link>
      </Title>
    </div>
    <div className='cr-feed__poster-scroll'>
      <Slider withScroll breakpoints={SliderBreakPoints}>
        {videoPosters.concat(videoPosters).map((p, idx) => (
          <PosterCard key={idx} thumbnailUri={p} name='Ann Bee' title='Work’s name goes here' />
        ))}
      </Slider>
    </div>
    <Row gutter={[22, 35]} className='cr-landing__video-grid__container random-works'>
      {posters}
    </Row>
  </Fragment>
);

export const Feed = () => {
  const [offset, setOffset] = useState(0);
  const [carPosters, setCarPosters] = useState([]);
  const [topPosters, setTopPosters] = useState([]);
  const [bottomPosters, setBottomPosters] = useState([]);
  const [currentPoster, setCurrentPoster] = useState();
  const [authorBlocks] = useState(Array.from({ length: 1 }, () => uuid()));

  const { isEnd, loading, loadMore } = useRandomArtworks(
    ({ getRandomArtworks }) => {
      if (!offset) {
        setCarPosters(getRandomArtworks.slice(0, 4));
        setTopPosters(renderPosters(getRandomArtworks.slice(4, 12), 0));
        setOffset(4 + 8 + 15);
        setBottomPosters([...bottomPosters, ...renderPosters(getRandomArtworks.slice(12), 3)]);
        return;
      }
      setOffset(offset + 15);
      setBottomPosters([...bottomPosters, ...renderPosters(getRandomArtworks, 3)]);
    },
    offset,
    offset ? 15 : 4 + 8 + 15,
  );

  useEffect(() => {
    if (carPosters.length && !currentPoster) {
      setCurrentPoster(carPosters[0]);
    }
  }, [carPosters, currentPoster]);

  const handlePosterChange = (index) => setCurrentPoster(carPosters[index]);

  return (
    <div className='cr-feed'>
      <Meta title='Feed' description='Crio - Artworks Feed' />
      {loading && <GlobalSpinner />}
      <section className='cr-feed__poster-carousel'>
        <div className='cr-carousel'>
          <Carousel
            afterChange={handlePosterChange}
            autoplay
            autoplaySpeed={2500}
            effect='fade'
            className='cr-carousel__container'
          >
            {carPosters?.map((pic) => (
              <div className='cr-carousel__item' key={pic.id}>
                <Img alt={pic.title} src={pic.thumbnailUri} loader={<Spinner />} />
              </div>
            ))}
          </Carousel>
          <div className='cr-carousel__cards'>
            <div className='cr-carousel__cards--author'>
              {currentPoster?.fbUserId && (
                <img
                  alt='Artist avatar'
                  src={`https://graph.facebook.com/${currentPoster?.fbUserId}/picture?height=350&width=350`}
                />
              )}
              <Text level='30' color='dark' inline>
                © Artwork by &nbsp;
              </Text>
              <Link to={`/profile/${currentPoster?.userId}`}>
                <Text level='30' color='secondary' inline>
                  {currentPoster?.name}
                </Text>
              </Link>
            </div>
            <div className='cr-carousel__cards--title'>
              <Title level='10' color='dark' ellipsis>
                {currentPoster?.title}
              </Title>
            </div>
            <div className='cr-carousel__cards--desc'>
              <Text level='10' color='black_75' ellipsis>
                {currentPoster?.description}
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
          {!isEnd && offset && (
            <Row className='cr-landing__video-grid__see-all'>
              <SecondaryButton loading={loading} onClick={loadMore}>
                LOAD MORE
              </SecondaryButton>
            </Row>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};
