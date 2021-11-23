import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row } from 'antd';
import { useQuery } from '@apollo/client';

import { getUserArtworks } from '@app/graphql/queries/artworks.query';
import { renderPosters } from '@shared/PostersList';
import { Spinner } from '@ui-kit/Spinner';

const Works = ({ isLock }) => {
  const { pathname } = useLocation();
  const [works, setWorks] = useState([]);
  const [topPosters, setTopPosters] = useState([]);

  const { loading } = useQuery(getUserArtworks, {
    variables: { id: +pathname.split('/').slice(-1)[0] || undefined },
    onCompleted: ({ getUserArtworks }) => {
      const posters = renderPosters(getUserArtworks, 0, isLock);
      setWorks(getUserArtworks);
      setTopPosters(posters);
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    pollInterval: 30000,
  });

  useEffect(() => {
    const posters = renderPosters(works, 0, isLock);
    setTopPosters(posters);
  }, [isLock, works]);

  return (
    <Spinner spinning={loading} color='white'>
      <div className='cr-feed__posters-list cr-landing__video-grid'>
        <Row
          style={{ width: '100%' }}
          gutter={[22, 35]}
          className='cr-landing__video-grid__container'
        >
          {topPosters.length && topPosters}
        </Row>
      </div>
    </Spinner>
  );
};

export default memo(Works);
