import { memo } from 'react';

import { Col, Row } from '@ui-kit';
import Poster from './Poster';

export const PostersList = ({ postersList = [] }) => (
  <Row gutter={[22, 20]}>
    {postersList.map((item) => (
      <Col key={item.id}>
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
          status={item?.status}
          accessibility={item?.accessibility}
          videoUri={item?.videoUri}
        />
      </Col>
    ))}
  </Row>
);

export default memo(PostersList);
