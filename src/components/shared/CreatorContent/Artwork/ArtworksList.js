import { memo } from 'react';

import { Col, Row } from '@ui-kit';
import Artwork from './Artwork';

export const ArtworksList = ({ artworksList = [] }) => (
  <Row gutter={[22, 20]}>
    {artworksList.map((item) => (
      <Col key={item.artworkId}>
        <Artwork
          providerType={item?.providerType}
          providerUserId={item?.providerUserId}
          avatar={item?.avatar}
          userId={item?.userId}
          username={item?.username}
          artworkId={item?.artworkId}
          title={item?.title}
          description={item?.description}
          status={item?.status}
          accessibility={item?.accessibility}
          content={item?.content}
          thumbnail={item.thumbnail}
        />
      </Col>
    ))}
  </Row>
);

export default memo(ArtworksList);
