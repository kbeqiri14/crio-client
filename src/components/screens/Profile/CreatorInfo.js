import { memo } from 'react';
import { Col, Divider, Row, Text } from '@ui-kit';

export const CreatorProfile = ({ user = {} }) => {
  return (
    <Row justify='center' gutter={[0, 40]}>
      <Col>
        <Row>
          <Col align='center'>
            <Text level={3} color='white'>
              Subscribers
              <br />
              {user.followersCount || 0}
            </Text>
          </Col>
          <Col margin_left={15} margin_right={15}>
            <Divider type='vertical' />
          </Col>
          <Col align='center'>
            <Text level={3} color='white'>
              Artworks
              <br />
              {user?.artworksCount || 0}
            </Text>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row justify='center' direction='column'>
          <Col align='center' margin_bottom={12}>
            <Text level={2} color='dark25'>
              About me
            </Text>
          </Col>
          <Col align='center'>
            <Text level={3} color='white'>
              I am Ann. I am a 3-D Artist. Check out some of my products below!
            </Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(CreatorProfile);
