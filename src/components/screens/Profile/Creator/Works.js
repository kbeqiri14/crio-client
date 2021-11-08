import { memo, useEffect, useState } from 'react';
import { Row } from 'antd';
import { useQuery } from '@apollo/client';

import { getArtworks } from '@app/graphql/queries/artworks.query';
import { renderPosters } from '@shared/PostersList';
import { usePresentation } from '@shared/PresentationView';
import { getPosters } from '@screens/LandingPage/posters';
import { Spinner } from '@ui-kit/Spinner';

const videoPosters = getPosters(8);

const Works = ({ isLock }) => {
  const [works, setWorks] = useState();
  const { show } = usePresentation();
  const [topPosters, setTopPosters] = useState(null);

  const { loading } = useQuery(getArtworks, {
    onCompleted: ({ getArtworks }) => console.log(getArtworks) || setWorks(getArtworks),
  });

  useEffect(() => setTopPosters(renderPosters(works?.length ? works : videoPosters, 0, show, isLock, works?.length)),[isLock, works, show]);

  return (
    <Spinner spinning={loading} color='white'>
      <div className='cr-feed__posters-list cr-landing__video-grid'>
        <Row gutter={[22, 35]} className='cr-landing__video-grid__container'>
          {!loading && topPosters}
        </Row>
      </div>
    </Spinner>
  );
};

export default memo(Works);
