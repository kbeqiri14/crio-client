import { memo, useCallback, useMemo } from 'react';

import history from '@app/configs/history';
import { ReactComponent as ArtworksEmptyIcon } from '@svgs/artworks-empty.svg';
import { ReactComponent as FallowingEmptyIcon } from '@svgs/fallowing-empty.svg';
import { Col, Button, Row, Text } from '@ui-kit';

const EmptyState = ({ username, isCreator, isProfile, isSubscribed }) => {
  const text = useMemo(() => {
    if (isProfile) {
      return `${username} ${
        isCreator ? 'hasn’t added an artwork yet' : 'is not following anyone yet'
      }`;
    }
    if (isCreator) {
      return 'Upload your first artwork';
    }
    return isSubscribed
      ? 'You don’t follow anyone'
      : 'Subscribe to follow creators and gain access to free digital products across Crio';
  }, [username, isCreator, isProfile, isSubscribed]);

  const visible = useMemo(
    () => !isProfile && (isCreator || !isSubscribed),
    [isCreator, isProfile, isSubscribed],
  );
  const label = useMemo(() => (isCreator ? 'UPLOAD' : 'SUBSCRIBE'), [isCreator]);
  const onClick = useCallback(
    () => history.push(`/${isCreator ? 'upload' : 'pricing'}`),
    [isCreator],
  );

  return (
    <Row justify='center' gutter={[0, 30]}>
      <Col span={24} align='center'>
        {isCreator ? <ArtworksEmptyIcon /> : <FallowingEmptyIcon />}
      </Col>
      <Col span={24} align='center' max_width={260}>
        <Text level={3} color='white'>
          {text}
        </Text>
      </Col>
      {visible && (
        <Col span={24} align='center'>
          <Button type='primary' fill_color='green' onClick={onClick}>
            {label}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default memo(EmptyState);
