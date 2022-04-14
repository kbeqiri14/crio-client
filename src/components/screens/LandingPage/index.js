import { useState } from 'react';
import { Row } from 'antd';
import cc from 'classcat';
import { useReactiveVar } from '@apollo/client';

import { signupErrorVar } from '@configs/client-cache';
import { useRandomArtworks } from '@root/src/hooks/useRandomArtworks';
import GetStarted from '@shared/GetStarted';
import { renderPosters } from '@shared/PostersList';
import { Footer } from '@shared/Footer';
import { Meta } from '@shared/Meta';
import { Button } from '@ui-kit';
import { Text, Title } from '@ui-kit/Text';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import aboutPerks from '@images/about-perks.png';
import './styles.less';

export const LandingPage = () => {
  const [offset, setOffset] = useState(0);
  const [postersList, setPostersList] = useState([]);

  const signupError = useReactiveVar(signupErrorVar);

  const { isEnd, loading, loadMore } = useRandomArtworks(({ getRandomArtworks }) => {
    setOffset(offset + 15);
    setPostersList([...postersList, ...renderPosters(getRandomArtworks, 3)]);
  }, offset);

  return (
    <div className='cr-landing__container'>
      <Meta title='Crio | Home' description='Crio - Landing Page' />
      {loading && !offset && <GlobalSpinner />}
      <section className='cr-landing__banner'>
        <div>
          <div className='cr-landing__banner__heading'>
            <h1>Discover the Best Visual Content from Your Favorite Creators</h1>
          </div>
          <div className='cr-landing__banner__desc'>
            Crio is a leading community platform for creatives to showcase their work and interact
            with fans across the globe
          </div>
          {signupError && <GetStarted size='large' />}
        </div>
      </section>
      <section className='cr-landing__video-grid'>
        <Row gutter={[22, 35]} className='cr-landing__video-grid__container'>
          {postersList}
        </Row>
        <Row className={cc(['cr-landing__video-grid__see-all', { 'list-loaded': isEnd }])}>
          {!isEnd && offset && (
            <Button loading={loading} onClick={loadMore}>
              SEE MORE
            </Button>
          )}
        </Row>
      </section>
      <section className='cr-landing__about-perks'>
        <div className='about-perks__wrapper'>
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
        {signupError && (
          <div className='about-perks__connect'>
            <GetStarted size='large' />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
