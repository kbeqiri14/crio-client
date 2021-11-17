import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row } from 'antd';
import { useQuery } from '@apollo/client';

import { getUserArtworks } from '@app/graphql/queries/artworks.query';
import { renderPosters } from '@shared/PostersList';
import { usePresentation } from '@shared/PresentationView';
import { getPosters } from '@screens/LandingPage/posters';
import { Spinner } from '@ui-kit/Spinner';

const videoPosters = getPosters(8);

const Works = ({ isLock }) => {
  const { pathname } = useLocation();
  const [works, setWorks] = useState();
  const { show } = usePresentation();
  const [topPosters, setTopPosters] = useState(null);

  const { loading } = useQuery(getUserArtworks, {
    variables: { id: +pathname.split('/').slice(-1)[0] || undefined },
    onCompleted: ({ getUserArtworks }) => {
      const posters = renderPosters(
        works?.length ? getUserArtworks : videoPosters,
        0,
        show,
        isLock,
        works?.length,
      );
      setWorks(getUserArtworks);
      setTopPosters(posters);
    },
    notifyOnNetworkStatusChange: true,
    pollInterval: 30000,
  });

  useEffect(() => {
    const posters = renderPosters(
      works?.length ? works : videoPosters,
      0,
      show,
      isLock,
      works?.length,
    );
    setTopPosters(posters);
  }, [isLock, works, show]);

  return (
    <Spinner spinning={loading && !topPosters?.length} color='white'>
      <div className='cr-feed__posters-list cr-landing__video-grid'>
        <Row
          style={{ width: '100%' }}
          gutter={[22, 35]}
          className='cr-landing__video-grid__container'
        >
          {topPosters}
        </Row>
      </div>
    </Spinner>
  );
};

export default memo(Works);
