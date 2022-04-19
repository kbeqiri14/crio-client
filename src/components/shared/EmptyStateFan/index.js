import { memo, useCallback, useMemo } from 'react';

import history from '@app/configs/history';
import { ReactComponent as Icon } from '@svgs/fallowing-empty.svg';
import { Col, Button, Row, Text } from '@ui-kit';

const EmptyState = ({ isSubscribed }) => {
  const text = useMemo(
    () =>
      isSubscribed
        ? 'You don’t follow anyone'
        : 'Subscribe to follow creators and gain access to free digital products across Crio',
    [isSubscribed],
  );

  const goToPricing = useCallback(() => history.push('/pricing'), []);

  return (
    <Row justify='center' gutter={[0, 30]}>
      <Col span={24} align='center'>
        <Icon />
      </Col>
      <Col span={24} align='center'>
        <Text level={3} color='white' width={100}>
          {text}
        </Text>
      </Col>
      {!isSubscribed && (
        <Col>
          <Button type='primary' fillColor='green' onClick={goToPricing}>
            SUBSCRIBE
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default memo(EmptyState);
