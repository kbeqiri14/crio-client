import { memo } from 'react';
import { Skeleton } from 'antd';

import { Col, Row } from '@ui-kit';
import Artwork from './Artwork';
import { SkeletonWrapper } from './styled';

export const ArtworksList = ({ artworksList = [], loading }) => {
  const dummyArray = new Array(12).fill();
  if (loading) {
    return (
      <Row gutter={22}>
        {dummyArray.map(() => (
          <Col>
            <SkeletonWrapper>
              <Skeleton.Image />;
            </SkeletonWrapper>
            <Skeleton active round avatar title={{ width: '92%' }} paragraph={{ rows: 0 }} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
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
};

export default memo(ArtworksList);
