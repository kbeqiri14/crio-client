import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';
import { useLazyQuery, useQuery } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getArtwork, getRandomArtworks } from '@app/graphql/queries/artworks.query';
import NotFound from '@shared/NotFound';
import { ReactComponent as NotFoundUser } from '@svgs/not-found.svg';
import { Col, Row } from '@ui-kit';
import Content from './Content';
import MoreBySection from './MoreBySection';

export const Artwork = () => {
  const { user } = useLoggedInUser();
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
  const isLocked = useMemo(() => {
    if (user.isCreator || artwork.accessibility === 'everyone') {
      return false;
    }
    return user.isSubscribed ? !user.followings?.includes(artwork.userId) : true;
  }, [user.isCreator, user.isSubscribed, user.followings, artwork.accessibility, artwork.userId]);

  if (loadingArtwork) {
    return (
      <div className='video-view-container'>
        <Row className='full-width'>
          <Col span={18} offset={3} padding_bottom={30}>
            <Skeleton round active title={{ width: '100%' }} paragraph={null} />
            <Skeleton
              round
              active
              avatar={{ shape: 'circle', size: 33 }}
              title={{ width: '100%' }}
              paragraph={null}
            />
          </Col>
          <Col span={24} align='center'>
            <Skeleton
              active
              avatar={{ shape: 'square', size: 800 }}
              title={false}
              paragraph={false}
            />
          </Col>
        </Row>
      </div>
    );
  }
  if (!Object.keys(artwork).length) {
    return <NotFound text='Artwork is not found' icon={<NotFoundUser />} />;
  }
  return (
    <>
      <Content videoInfo={artwork} videoUri={videoUri} isLocked={isLocked} />
      {artworks?.getRandomArtworks?.length >= 3 && (
        <MoreBySection videoInfo={artwork} postersList={artworks?.getRandomArtworks} />
      )}
    </>
  );
};

export default memo(Artwork);
