import { memo, useCallback } from 'react';

import { ARTWORKS } from '@configs/constants';
import { getThumbnail } from '@utils/helpers';
import { Col, Row } from '@ui-kit';
import Artwork from './Artwork';

export const ArtworksList = ({ artworksList = [] }) => {
  const getSource = useCallback(
    (userId, content, thumbnail) =>
      content.startsWith('/videos/') ? thumbnail : getThumbnail(ARTWORKS, userId, content),
    [],
  );

  return (
    <Row gutter={[22, 20]}>
      {artworksList.map((item) => (
        <Col key={item.artworkId}>
          <Artwork
            providerType={item?.providerType}
            providerUserId={item?.providerUserId}
            avatar={item?.avatar}
            src={getSource(item.userId, item.content, item.thumbnail)}
            userId={item?.userId}
            username={item?.username}
            artworkId={item?.artworkId}
            title={item?.title}
            description={item?.description}
            status={item?.status}
            accessibility={item?.accessibility}
            content={item?.content}
          />
        </Col>
      ))}
    </Row>
  );
};

export default memo(ArtworksList);
