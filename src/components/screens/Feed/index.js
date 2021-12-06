import { memo } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row } from 'antd';
import { Img } from 'react-image';

import { useFeedRandomArtworks } from '@app/hooks/useFeedRandomArtworks';
import { PosterCard, renderPosters } from '@shared/PostersList';
import { Footer } from '@shared/Footer';
import { Meta } from '@shared/Meta';
import { Slider } from '@ui-kit/Slider';
import { Spinner } from '@ui-kit/Spinner';
import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { ReactComponent as Icon } from '@svgs/feed-empty.svg';
import EmptyState from '@shared/EmptyState';
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

const RandomAuthorArtworks = memo(({ blockPosters }) => (
  <Fragment>
    <div className='cr-artworks-section__author'>
      <Title level='10' color='white' inline>
        © Artwork by &nbsp;
        <Link to={`/profile/${blockPosters.authorPosters?.[0]?.userId}`}>
          {blockPosters.authorPosters?.[0]?.name}
        </Link>
      </Title>
    </div>
    <div className='cr-feed__poster-scroll'>
      <Slider withScroll breakpoints={SliderBreakPoints}>
        {blockPosters.authorPosters?.map((poster, idx) => (
          <PosterCard key={idx} {...poster} />
        ))}
      </Slider>
    </div>
    <Row gutter={[22, 35]} className='cr-landing__video-grid__container random-works'>
      {blockPosters.posters}
    </Row>
  </Fragment>
));

export const Feed = () => {
  const [offset, setOffset] = useState(0);
  const [topPosters, setTopPosters] = useState([]);
  const [blockPosters, setBlockPosters] = useState([]);
  const [currentPoster, setCurrentPoster] = useState();

  const { isEnd, loading, carouselPosters, loadMore } = useFeedRandomArtworks(
    ({ getRandomArtworksForFeed }) => {
      if (!offset) {
        setTopPosters(renderPosters(getRandomArtworksForFeed.topArtworks, 0));
        setBlockPosters([
          {
            authorPosters: getRandomArtworksForFeed.userArtworks,
            posters: getRandomArtworksForFeed.artworks
              ? renderPosters(getRandomArtworksForFeed.artworks, 3)
              : undefined,
          },
        ]);
        setOffset(8 + 15);
        return;
      }
      setBlockPosters([
        ...blockPosters,
        {
          authorPosters: getRandomArtworksForFeed.userArtworks,
          posters: renderPosters(getRandomArtworksForFeed.artworks, 3),
        },
      ]);
      setOffset(offset + 15);
    },
    offset,
    offset ? 15 : 8 + 15,
  );

  useEffect(() => {
    if (carouselPosters.length && !currentPoster) {
      setCurrentPoster(carouselPosters[0]);
    }
  }, [carouselPosters, currentPoster]);

  const handlePosterChange = (index) => setCurrentPoster(carouselPosters[index]);

  return (
    <div className='cr-feed'>
      <Meta title='Feed' description='Crio - Artworks Feed' />
      {loading && !offset && <GlobalSpinner />}
      {!loading && !carouselPosters.length ? (
        <EmptyState Icon={Icon} text='There are no artworks yet' />
      ) : (
        <Fragment>
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
                  <Text level='30' color='dark'>
                    © Artwork by &nbsp;
                  </Text>
                  <Link to={`/profile/${currentPoster?.userId}`}>
                    <Text level='30' color='secondary' inline ellipsis>
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
              {blockPosters.map((item, index) => (
                <RandomAuthorArtworks key={index} blockPosters={item} />
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
        </Fragment>
      )}
      <Footer />
    </div>
  );
};
