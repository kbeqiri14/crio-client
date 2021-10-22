import { memo, useState } from 'react';
import { Row } from 'antd';

import { renderPosters } from '@shared/PostersList';
import { getPosters } from '@screens/LandingPage/posters';

const videoPosters = getPosters(8);

const Works = () => {
  const [topPosters] = useState(renderPosters(videoPosters, 0));

  return (
    <div className='cr-feed__posters-list cr-landing__video-grid'>
      <Row gutter={[22, 35]} className='cr-landing__video-grid__container'>
        {topPosters}
      </Row>
    </div>
  );
};

export default memo(Works);
