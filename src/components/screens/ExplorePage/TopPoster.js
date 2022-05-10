import { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Col, Row, Text, Title } from '@ui-kit';

const TopPosterWrapper = styled('div')`
  .absolute-center {
    position: absolute;
    height: 100%;
    left: 140px;
    top: 50%;
    transform: translateY(-50%);
  }
  .darken-background {
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 103.09%);
  }
`;

const TopPoster = ({ username, thumbnail }) => (
  <TopPosterWrapper>
    <div className='darken-background' />
    <Row gutter={[0, 12]} className='absolute-center'>
      <Col span={24}>
        <Title level={3} max_width={725}>
          Discover the Best Visual Content from Your Favorite Creators
        </Title>
      </Col>
      <Col span={24}>
        <Text level={4} max_width={555}>
          Crio is a leading community platform for creatives to showcase their work and interact
          with fans across the globe
        </Text>
      </Col>
      <Col span={24}>
        <Link to={`/profile/${username}`}>
          <Button type='primary' size='large'>
            VISIT FEATURED CREATOR
          </Button>
        </Link>
      </Col>
      <Col span={24} margin_top={24} padding_right={40}>
        <Row justify='end'>
          <Col>
            <Text level={3}>Artwork by {username}</Text>
          </Col>
        </Row>
      </Col>
    </Row>
    <img alt='artwork' height={380} width='100%' className='fit-cover' src={thumbnail} />
  </TopPosterWrapper>
);

export default memo(TopPoster);
