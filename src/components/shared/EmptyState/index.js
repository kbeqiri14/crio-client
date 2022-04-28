import { memo, useCallback, useMemo } from 'react';

import history from '@app/configs/history';
import { ReactComponent as UploadIcon } from '@svgs/upload.svg';
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
  const [label, color] = useMemo(
    () => (isCreator ? ['UPLOAD', 'blue'] : ['SUBSCRIBE', 'green']),
    [isCreator],
  );
  const onClick = useCallback(
    () => history.push(`/${isCreator ? 'upload' : 'pricing'}`),
    [isCreator],
  );

  return (
    <Row justify='center' align='middle' gutter={[0, 20]}>
      <Col span={24} align='center' padding_bottom={20}>
        {isCreator ? (
          <UploadIcon width={210} height={151} />
        ) : (
          <FallowingEmptyIcon width={210} height={151} />
        )}
      </Col>
      <Col span={24} align='center' max_width={260}>
        <Text level={3}>{text}</Text>
      </Col>
      {visible && (
        <Col span={24} align='center'>
          <Button type='primary' fill_color={color} onClick={onClick}>
            {label}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default memo(EmptyState);
