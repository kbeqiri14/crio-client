import { memo, useEffect, useState } from 'react';
import { Row } from 'antd';

import { renderPosters } from '@shared/PostersList';
import { usePresentation } from '@shared/PresentationView';
import { getPosters } from '@screens/LandingPage/posters';

const videoPosters = getPosters(8);

const Works = ({ isLock }) => {
  const { show } = usePresentation();
  const [topPosters, setTopPosters] = useState(renderPosters(videoPosters, 0, show, isLock));

  useEffect(() => setTopPosters(renderPosters(videoPosters, 0, show, isLock)),[isLock, show]);

  return (
    <div className='cr-feed__posters-list cr-landing__video-grid'>
      <Row gutter={[22, 35]} className='cr-landing__video-grid__container'>
        {topPosters}
      </Row>
    </div>
  );
};

export default memo(Works);
