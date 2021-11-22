import { Fragment, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row } from 'antd';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

import { randomNumberVar } from '@configs/client-cache';
import { getRandomArtworksCount, getRandomArtworks } from '@app/graphql/queries/artworks.query';
import { usePresentation, defaultMockValue } from '@shared/PresentationView';
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

const ScrollPosters = ({ handleClick }) => {
  return (
    <div className='cr-feed__poster-scroll'>
      <Slider withScroll breakpoints={SliderBreakPoints}>
        {videoPosters.concat(videoPosters).map((p, idx) => (
          <PosterCard
            onClick={() => handleClick(defaultMockValue)}
            key={idx}
            thumbnailUri={p}
            name='Ann Bee'
            title='Work’s name goes here'
          />
        ))}
      </Slider>
    </div>
  );
};

const RandomAuthorArtworks = ({ posters, handleClick }) => (
  <Fragment>
    <div className='cr-artworks-section__author'>
      <Title level='10' color='white' inline>
        © Artwork by &nbsp;
        <Link>Ann Bee</Link>
      </Title>
    </div>
    <ScrollPosters handleClick={handleClick} />
    <Row gutter={[22, 35]} className='cr-landing__video-grid__container random-works'>
      {posters}
    </Row>
  </Fragment>
);

export const Feed = () => {
  const { show } = usePresentation();
  const [offset, setOffset] = useState(0);
  const [carPosters, setCarPosters] = useState([]);
  const [topPosters, setTopPosters] = useState([]);
  const [bottomPosters, setBottomPosters] = useState([]);
  const [currentPoster, setCurrentPoster] = useState(carPosters?.[0]);
  const [authorBlocks] = useState(Array.from({ length: 1 }, () => uuid()));
  const count = useReactiveVar(randomNumberVar);

  const [requestRandomArtworks, { loading }] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ getRandomArtworks }) => {
      if (!offset) {
        setCarPosters(getRandomArtworks.slice(0, 4));
        setTopPosters(renderPosters(getRandomArtworks.slice(4, 12), 0, show, false, true));
        setOffset(4 + 8 + 15);
        setBottomPosters([
          ...bottomPosters,
          ...renderPosters(getRandomArtworks.slice(12), 3, show, false, true),
        ]);
        return;
      }
      setOffset(offset + 15);
      setBottomPosters([
        ...bottomPosters,
        ...renderPosters(getRandomArtworks, 3, show, false, true),
      ]);
    },
  });

  const { data } = useQuery(getRandomArtworksCount, {
    onCompleted: ({ getRandomArtworksCount }) => {
      const n = Math.floor(Math.random() * getRandomArtworksCount + 1);
      randomNumberVar(n);
      requestRandomArtworks({
        variables: { params: { count: n, offset, limit: offset ? 15 : 4 + 8 + 15 } },
      });
    },
  });

  const end = useMemo(
    () => data?.getRandomArtworksCount <= offset,
    [data?.getRandomArtworksCount, offset],
  );
  const handleLoadMore = useCallback(() => requestRandomArtworks({
    variables: { params: { count, offset, limit: 15 } },
  }), [count, offset, requestRandomArtworks]);

  const handlePosterChange = (index) => setCurrentPoster(carPosters[index]);

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
            {carPosters?.map((pic) => (
              <div className='cr-carousel__item' key={pic.id}>
                <img alt={pic.title} src={pic.thumbnailUri} />
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
              <Title level='10' color='dark'>
                {currentPoster?.title}
              </Title>
            </div>
            <div className='cr-carousel__cards--desc'>
              <Text level='10' color='black_75'>
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
            <RandomAuthorArtworks handleClick={show} key={blockId} posters={bottomPosters} />
          ))}
          {!end && offset && (<Row className='cr-landing__video-grid__see-all'>
            <SecondaryButton loading={loading && offset} onClick={handleLoadMore}>LOAD MORE</SecondaryButton>
          </Row>)}
        </div>
      </section>
      <Footer />
    </div>
  );
};
