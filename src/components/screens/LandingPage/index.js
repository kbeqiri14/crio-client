import { useState } from 'react';
import { Row } from 'antd';
import cc from 'classcat';

import { useCurrentUser } from '@app/auth/hooks';
import { renderPosters } from '@shared/PostersList';
import { ConnectButton } from '@shared/ConnectButton';
import { Footer } from '@shared/Footer';
import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import { getPosters } from './posters';
import aboutPerks from '@images/about-perks.png';
import './styles.less';

const multiplier = 3;
const smallPostersCount = multiplier * 4;
const largePostersCount = multiplier;
const videosCount = smallPostersCount + largePostersCount;
const videoPosters = getPosters(videosCount);

export const LandingPage = () => {
  const { user, loading } = useCurrentUser();
  const [listLoaded, setListLoaded] = useState(false);
  const [postersList, setPostersList] = useState(renderPosters(videoPosters, largePostersCount));

  const handleLoadList = () => {
    setPostersList([...postersList, ...renderPosters(videoPosters, largePostersCount)]);
    setListLoaded(true);
  };

  return (
    <div className='cr-landing__container'>
      <section className='cr-landing__banner'>
        <div>
          <div className='cr-landing__banner__heading'>
            <h1>Discover the world’s top animators and creatives</h1>
          </div>
          <div className='cr-landing__banner__desc'>
            Crio is a leading community platform for creatives to showcase their work and interact
            with fans across the globe
          </div>
          {!user && <ConnectButton disabled={loading} />}
        </div>
      </section>
      <section className='cr-landing__video-grid'>
        <Row gutter={[22, 35]} className='cr-landing__video-grid__container'>
          {postersList}
        </Row>
        <Row className={cc(['cr-landing__video-grid__see-all', { 'list-loaded': listLoaded }])}>
          {!listLoaded && <SecondaryButton onClick={handleLoadList}>See All</SecondaryButton>}
        </Row>
      </section>
      <section className='cr-landing__about-perks'>
        <div className={cc(['about-perks__wrapper', { 'is-signed-in': !!user }])}>
          <div className='about-perks__container'>
            <div className='about-perks__info'>
              <div className='about-perks__title'>
                <Title level='10'>About Perks</Title>
              </div>
              <div className='about-perks__desc'>
                <Text level='10'>
                  Subscribe and gain access to various special perks from any of your favorite
                  creators such as personal video edits, tutorials, downloadable content, and much
                  more!
                </Text>
              </div>
            </div>
            <div className='about-perks__illustration'>
              <img src={aboutPerks} alt='About Perks Illustration' />
            </div>
          </div>
        </div>
        {!user && (
          <div className='about-perks__connect'>
            <ConnectButton disabled={loading} />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
