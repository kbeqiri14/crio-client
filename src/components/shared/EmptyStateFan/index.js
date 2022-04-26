import { memo, useCallback, useMemo } from 'react';

import history from '@app/configs/history';
import { ReactComponent as Icon } from '@svgs/fallowing-empty.svg';
import { Col, Button, Row, Text } from '@ui-kit';

const EmptyState = ({ username, isProfile, isSubscribed }) => {
  const text = useMemo(() => {
    if (isProfile) {
      return `${username} is not following anyone yet`;
    }
    return isSubscribed
      ? 'You don’t follow anyone'
      : 'Subscribe to follow creators and gain access to free digital products across Crio';
  }, [username, isProfile, isSubscribed]);

  const goToPricing = useCallback(() => history.push('/pricing'), []);

  return (
    <Row justify='center' gutter={[0, 30]}>
      <Col span={24} align='center'>
        <Icon />
      </Col>
      <Col span={24} align='center' max_width={260}>
        <Text level={3} color='white'>
          {text}
        </Text>
      </Col>
      {!isSubscribed && !isProfile && (
        <Col span={24} align='center'>
          <Button type='primary' fill_color='green' onClick={goToPricing}>
            SUBSCRIBE
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default memo(EmptyState);
