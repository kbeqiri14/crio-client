import { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Col, Row, Text, Title } from '@ui-kit';

const TopPosterWrapper = styled('div')``;

const TopPoster = ({ username, thumbnail }) => {
  return (
    <TopPosterWrapper>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 103.09%)',
        }}
      />
      <Row
        style={{
          position: 'absolute',
          paddingLeft: 140,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        gutter={[0, 12]}
      >
        <Col span={24}>
          <Title level={3} color='white' max_width={725}>
            Discover the Best Visual Content from Your Favorite Creators
          </Title>
        </Col>
        <Col span={24}>
          <Text level={4} color='white' max_width={555}>
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
        <Col spam={24} style={{ width: '100%' }}>
          <div
            style={{
              position: 'absolute',
              bottom: -50,
              right: -90,
            }}
          >
            <Text level={3} color='white'>
              Artwork by{' '}
            </Text>
            <Link to={`/profile/${username}`}>
              <Text level={3} color='white' underline>
                {username}
              </Text>
            </Link>
          </div>
        </Col>
      </Row>
      <img alt='artwork' height={380} width='100%' style={{ objectFit: 'cover' }} src={thumbnail} />
    </TopPosterWrapper>
  );
};

export default memo(TopPoster);
