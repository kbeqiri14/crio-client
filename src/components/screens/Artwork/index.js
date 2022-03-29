import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row, Skeleton } from 'antd';
import { useLazyQuery, useQuery } from '@apollo/client';

import { getArtwork, getRandomArtworks } from '@app/graphql/queries/artworks.query';
import { PosterCard } from '@shared/PostersList';
import { Text } from '@ui-kit/Text';
import Header from './Header';

export const Artwork = () => {
  const { pathname } = useLocation();
  const artworkId = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const [requestRandomArtworks, { data: artworks }] = useLazyQuery(getRandomArtworks);
  const { data, loading: loadingArtwork } = useQuery(getArtwork, {
    variables: { artworkId },
    onCompleted: ({ getArtwork }) => {
      if (getArtwork?.userId) {
        requestRandomArtworks({
          variables: { params: { userId: getArtwork?.userId, artworkId, limit: 3 } },
        });
      }
    },
  });
  const artwork = useMemo(() => data?.getArtwork || {}, [data?.getArtwork]);
  const videoUri = useMemo(
    () => artwork.videoUri?.substring(artwork.videoUri?.lastIndexOf('/') + 1),
    [artwork.videoUri],
  );

  return (
    <div className='video-view-container'>
      <Row className='video-view-column'>
        <Col span={18} offset={3} className='video-view-author'>
          <Skeleton
            round
            active
            avatar={{ size: 83 }}
            title={{ width: '100%' }}
            paragraph={{ rows: 1 }}
            loading={loadingArtwork}
          />
          {!loadingArtwork && (
            <Header
              providerType={artwork.providerType}
              providerUserId={artwork.providerUserId}
              avatar={artwork.avatar}
              title={artwork.title}
              name={artwork.name}
            />
          )}
        </Col>
        <Col span={18} offset={3}>
          <div className='video-view__player embed-responsive aspect-ratio-16/9'>
            <iframe
              title={artwork.title || 'Crio video player'}
              src={`https://player.vimeo.com/video/${videoUri}?h=dc77330a55&color=ffffff&title=0&byline=0&portrait=0`}
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              allowFullScreen
            />
          </div>
        </Col>
        <Col span={18} offset={3}>
          <Skeleton round active title={false} paragraph={{ rows: 2 }} loading={loadingArtwork} />
          {!loadingArtwork && (
            <Text level='10' color='white'>
              {artwork.description}
            </Text>
          )}
        </Col>
      </Row>
      {artworks?.getRandomArtworks?.length >= 3 && (
        <Row justify='start' className='video-player-more'>
          <Col span={18} className='column'>
            <Row justify='space-between' align='middle'>
              <Col>
                <Text level='40' color='white'>
                  More by {artwork.name}
                </Text>
              </Col>
              <Col>
                <Link to={`/profile/${artwork.name}`}>
                  <Text level='20' color='primary'>
                    View profile
                  </Text>
                </Link>
              </Col>
            </Row>
            <Row gutter={[22, 22]} justify='center' align='middle'>
              {artworks?.getRandomArtworks?.map((poster, idx) => (
                <Col xl={8} md={12} sm={24} xs={24} key={idx}>
                  <PosterCard {...poster} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default memo(Artwork);
