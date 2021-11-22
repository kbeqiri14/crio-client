import { useCallback, useMemo, useState } from 'react';
import { Row } from 'antd';
import cc from 'classcat';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

import { randomNumberVar } from '@configs/client-cache';
import { useCurrentUser } from '@app/auth/hooks';
import { getRandomArtworksCount, getRandomArtworks } from '@app/graphql/queries/artworks.query';
import { usePresentation } from '@shared/PresentationView';
import { renderPosters } from '@shared/PostersList';
import { ConnectButton } from '@shared/ConnectButton';
import { Footer } from '@shared/Footer';
import { Meta } from '@shared/Meta';
import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import aboutPerks from '@images/about-perks.png';
import './styles.less';

export const LandingPage = () => {
  const [offset, setOffset] = useState(0);
  const [postersList, setPostersList] = useState([]);

  const { user } = useCurrentUser();
  const { show } = usePresentation();
  const count = useReactiveVar(randomNumberVar);

  const [requestRandomArtworks, { loading }] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ getRandomArtworks }) => {
      setOffset(offset + 15);
      setPostersList([...postersList, ...renderPosters(getRandomArtworks, 3, show, false, true)]);
    },
  });

  const requestArtworks = useCallback(
    (n) =>
      requestRandomArtworks({
        variables: { params: { count: n || count, offset } },
      }),
    [count, offset, requestRandomArtworks],
  );

  const { data } = useQuery(getRandomArtworksCount, {
    onCompleted: ({ getRandomArtworksCount }) => {
      const n = Math.floor(Math.random() * getRandomArtworksCount + 1);
      randomNumberVar(n);
      requestArtworks(n);
    },
  });

  const end = useMemo(
    () => data?.getRandomArtworksCount <= offset,
    [data?.getRandomArtworksCount, offset],
  );

  const handleLoadList = useCallback(() => requestArtworks(), [requestArtworks]);

  return (
    <div className='cr-landing__container'>
      <Meta title='Crio | Home' description='Crio - Landing Page' />
      <section className='cr-landing__banner'>
        <div>
          <div className='cr-landing__banner__heading'>
            <h1>Discover the world’s top animators and creatives</h1>
          </div>
          <div className='cr-landing__banner__desc'>
            Crio is a leading community platform for creatives to showcase their work and interact
            with fans across the globe
          </div>
          {!user && <ConnectButton />}
        </div>
      </section>
      <section className='cr-landing__video-grid'>
        <Row gutter={[22, 35]} className='cr-landing__video-grid__container'>
          {postersList}
        </Row>
        <Row className={cc(['cr-landing__video-grid__see-all', { 'list-loaded': end }])}>
          {!end && offset && (
            <SecondaryButton loading={loading && offset} onClick={handleLoadList}>
              SEE MORE
            </SecondaryButton>
          )}
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
            <ConnectButton />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
