import { memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useQuery } from '@apollo/client';

import { getUserArtworks } from '@app/graphql/queries/artworks.query';
import { PosterCard } from '@shared/PostersList';
import { Spinner } from '@ui-kit/Spinner';

const Works = ({ isLock }) => {
  const { pathname } = useLocation();
  const [works, setWorks] = useState([]);

  const { loading } = useQuery(getUserArtworks, {
    variables: { id: +pathname.split('/').slice(-1)[0] || undefined },
    onCompleted: ({ getUserArtworks }) => {
      setWorks(getUserArtworks);
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    pollInterval: 30000,
  });

  return (
    <Spinner spinning={loading && !works?.length} color='white'>
      <div className='cr-feed__posters-list cr-landing__video-grid profile-artworks-list'>
        <Row
          style={{ width: '100%' }}
          gutter={[22, 35]}
          justify='start'
          className='cr-landing__video-grid__container'
        >
          {works.map((poster, index) => (
            <Col key={index} xl={6} lg={8} md={12} sm={24} xs={24} className='video-grid__item'>
              <PosterCard {...poster} isLock={index === 0 ? false : isLock} />
            </Col>
          ))}
        </Row>
      </div>
    </Spinner>
  );
};

export default memo(Works);
