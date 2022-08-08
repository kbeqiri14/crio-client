import { memo } from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';

import { Col, Row } from '@ui-kit';
import Artwork from './Artwork';

export const Wrapper = styled('div')`
  width: 332px;
  height: 332px;
  border: 1px solid ${(props) => props.theme.colors.dark50};
  border-radius: 30px;
  margin-bottom: 8px;
  .ant-skeleton {
    width: 100%;
    .ant-skeleton-image {
      width: 330px;
      height: 330px;
      border-radius: 30px;
    }
  }
`;

export const ArtworksList = ({ artworksList = [], loading }) => {
  const dummyArray = new Array(6).fill();
  if (loading) {
    return (
      <Row gutter={22}>
        {dummyArray.map(() => (
          <Col>
            <Wrapper>
              <Skeleton.Image active />;
            </Wrapper>
            <Skeleton active avatar title={{ width: '100%' }} paragraph={{ rows: 0 }} />
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
