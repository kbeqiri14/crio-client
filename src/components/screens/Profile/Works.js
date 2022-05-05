import { memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useQuery } from '@apollo/client';

import { getUserArtworks } from '@app/graphql/queries/artworks.query';
import { Spinner } from '@ui-kit/Spinner';
import EmptyState from '@shared/EmptyState';
import Poster from '@app/components/screens/ExplorePage/Poster';

const Works = ({ username, isProfile, isFollowing, isLock }) => {
  const { pathname } = useLocation();
  const [initialPolling, setInitialPolling] = useState(true);
  const [works, setWorks] = useState([]);

  const { loading } = useQuery(getUserArtworks, {
    variables: { username: pathname.split('/').slice(-1)[0] || undefined },
    onCompleted: ({ getUserArtworks }) => {
      setInitialPolling(false);
      setWorks(getUserArtworks);
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    pollInterval: 30000,
  });

  return (
    <Spinner spinning={initialPolling && loading && !works?.length} color='white'>
      {(!loading || !initialPolling) && !works?.length ? (
        <EmptyState username={username} isCreator={true} isProfile={isProfile} />
      ) : (
        // <div className='cr-feed__posters-list cr-landing__video-grid profile-artworks-list'>
        //   <Row
        //     style={{ width: '100%' }}
        //     gutter={[22, 35]}
        //     justify='start'
        //     className='cr-landing__video-grid__container'
        //   >
        //     {works.map((poster, index) => (
        //       <Col key={index} xl={6} lg={8} md={12} sm={24} xs={24} className='video-grid__item'>
        //         <PosterCard {...poster} isLock={isLock} showActions={!isProfile} />
        //       </Col>
        //     ))}
        //   </Row>
        // </div>
        <Row justify='center' gutter={[24, 24]}>
          {works.map((item) => (
            <Col>
              <Poster
                providerType={item?.providerType}
                providerUserId={item?.providerUserId}
                avatar={item?.avatar}
                src={item?.thumbnailUri}
                userId={item?.userId}
                username={item?.name}
                artworkId={item?.artworkId}
                title={item?.title}
                description={item?.description}
                videoUri={item?.videoUri}
                accessibility={item?.accessibility}
                isLock={isLock && item?.accessibility === 'subscriber_only'}
                showActions={!isProfile}
              />
            </Col>
          ))}
        </Row>
      )}
    </Spinner>
  );
};

export default memo(Works);
