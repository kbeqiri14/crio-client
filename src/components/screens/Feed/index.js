import { useState } from 'react';
import { Carousel, Row } from 'antd';
import { Link } from 'react-router-dom';
import { getPosters } from '@screens/LandingPage/posters';
import { renderPosters } from '@shared/PostersList';
import { Text, Title } from '@ui-kit/Text';
import samplePoster from '@images/posters/carousel-poster.png';
import sampleAvatar from '@images/avatar-sample.png';
import './styles.less';

const videoPosters = getPosters(8);

export const Feed = () => {
  const [posters] = useState(renderPosters(videoPosters, 0));
  return (
    <div className='cr-feed'>
      <section className='cr-feed__poster-carousel'>
        <div className='cr-carousel'>
          <Carousel effect='fade' className='cr-carousel__container'>
            <div className='cr-carousel__item'>
              <img alt='poster' src={samplePoster} />
            </div>
            <div className='cr-carousel__item'>
              <img alt='poster' src={samplePoster} />
            </div>
            <div className='cr-carousel__item'>
              <img alt='poster' src={samplePoster} />
            </div>
            <div className='cr-carousel__item'>
              <img alt='poster' src={samplePoster} />
            </div>
          </Carousel>
          <div className='cr-carousel__cards'>
            <div className='cr-carousel__cards--author'>
              <img alt='Artist avatar' src={sampleAvatar} />
              <Text level='30' color='dark' inline>
                © Artwork by &nbsp;
              </Text>
              <Link>
                <Text level='30' color='secondary' inline>
                  Ann Bee
                </Text>
              </Link>
            </div>
            <div className='cr-carousel__cards--title'>
              <Title level='10' color='dark'>
                Big mac - McDonald's Commercial
              </Title>
            </div>
            <div className='cr-carousel__cards--desc'>
              <Text level='10' color='black_75'>
                Description goes here Description goes here Description goes here
              </Text>
            </div>
          </div>
        </div>
      </section>
      <section className='cr-feed__posters-list cr-landing__video-grid'>
        <Row gutter={[22, 35]} className='cr-landing__video-grid__container'>
          {posters}
        </Row>
      </section>
    </div>
  );
};
