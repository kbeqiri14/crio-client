import { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Col, Row, Text, Title } from '@ui-kit';

const TopPosterWrapper = styled('div')`
  .absolute-center {
    position: absolute;
    left: 140px;
    top: 50%;
    transform: translateY(-50%);
    @media (max-width: 767.98px) {
      left: 10px;
    }
  }
  .absolute-bottom {
    position: absolute;
    bottom: 20px;
    right: 40px;
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
        <Title level={3}>Crio: The Creative Marketplace</Title>
      </Col>
      <Col span={24}>
        <Text level={4} max_width={555}>
          Shop thousands of products and see the best artwork from the entire community of creators
          on Crio
        </Text>
      </Col>
      <Col span={24}>
        <Link to={`/profile/${username}`}>
          <Button type='primary' size='large'>
            VISIT FEATURED CREATOR
          </Button>
        </Link>
      </Col>
    </Row>
    <Text level={3} className='absolute-bottom'>
      Artwork by {username}
    </Text>
    <img alt='artwork' height={380} width='100%' className='fit-cover' src={thumbnail} />
  </TopPosterWrapper>
);

export default memo(TopPoster);
