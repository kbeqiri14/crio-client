import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getArtwork } from '@app/graphql/queries/artworks.query';
import { loggedInUserLoadingVar } from '@configs/client-cache';
import NotFound from '@shared/NotFound';
import { ReactComponent as NotFoundUser } from '@svgs/not-found.svg';
import { Col, Row } from '@ui-kit';
import Content from './Content';
import MoreProductsSection from '@root/src/components/screens/Product/MoreProductsSection';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  > div {
    min-width: 1040px;
    max-width: 1040px;
  }
`;

export const Artwork = () => {
  const { user } = useLoggedInUser();
  const { pathname } = useLocation();
  const artworkId = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);

  const { data, loading: loadingArtwork } = useQuery(getArtwork, { variables: { artworkId } });
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

  if (loadingArtwork || loggedInUserLoading) {
    return (
      <Wrapper>
        <Row gutter={[0, 40]}>
          <Col span={24}>
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
      </Wrapper>
    );
  }
  if (!Object.keys(artwork).length) {
    return <NotFound text='Artwork is not found' icon={<NotFoundUser />} />;
  }
  return (
    <>
      <Content videoInfo={artwork} videoUri={videoUri} isLocked={isLocked} />
      <MoreProductsSection videoInfo={artwork} />
    </>
  );
};

export default memo(Artwork);
