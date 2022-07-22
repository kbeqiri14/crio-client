import { memo, useCallback } from 'react';

import { BUCKET_NAME, COGNITO_REGION } from '@app/configs/environment';
import { Col, Row } from '@ui-kit';
import Artwork from './Artwork';

export const ArtworksList = ({ artworksList = [] }) => {
  const getSource = useCallback(
    (userId, videoUri, thumbnailUri) =>
      videoUri.startsWith('/videos/')
        ? thumbnailUri
        : `https://${BUCKET_NAME}.s3.${COGNITO_REGION}.amazonaws.com/${userId}/artworks/${videoUri}`,
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
            src={getSource(item.userId, item.videoUri, item.thumbnailUri)}
            userId={item?.userId}
            username={item?.username}
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
};

export default memo(ArtworksList);
