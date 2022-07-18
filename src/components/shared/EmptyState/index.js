import { memo, useCallback, useMemo } from 'react';

import history from '@configs/history';
import noUser from '@images/no-user.png';
import emptyMarketplace from '@images/empty-marketplace.png';
import emptyArtwork from '@images/empty-artwork.png';
import upload from '@images/upload.png';
import notFound from '@images/not-found.png';
import { Col, Button, Row, Text } from '@ui-kit';

const EmptyState = ({ username, isCreator, isProfile, isEmpty, isSubscribed, isMarketplace }) => {
  const text = useMemo(() => {
    if (isProfile) {
      let text = 'is not following anyone yet';
      if (isCreator) {
        text = isMarketplace
          ? 'hasn’t added a products and services yet'
          : 'hasn’t added an artwork yet';
      }
      return `${username} ${text}`;
    }
    if (isCreator) {
      return isMarketplace ? 'Upload your first product or service' : 'Upload your first artwork';
    }
    if (isEmpty) {
      return isMarketplace ? 'Product is not found' : 'Artwork is not found';
    }
    return isSubscribed
      ? 'You don’t have any following yet'
      : 'Subscribe to follow creators and gain access to free digital products across Crio';
  }, [username, isCreator, isProfile, isSubscribed, isMarketplace, isEmpty]);
  const icon = useMemo(() => {
    if (isCreator) {
      if (isProfile) {
        return isMarketplace ? emptyMarketplace : emptyArtwork;
      }
      return upload;
    }
    if (isEmpty) {
      return notFound;
    }
    return noUser;
  }, [isCreator, isProfile, isMarketplace, isEmpty]);
  const [label, color] = useMemo(
    () => (isCreator ? ['UPLOAD', 'blue'] : ['SUBSCRIBE', 'green']),
    [isCreator],
  );
  const visible = useMemo(
    () => !isEmpty && !isProfile && (isCreator || !isSubscribed),
    [isCreator, isProfile, isSubscribed, isEmpty],
  );
  const onClick = useCallback(
    () => history.push(`/${isCreator ? (isMarketplace ? 'upload' : 'upload/artwork') : 'pricing'}`),
    [isCreator, isMarketplace],
  );

  return (
    <Row justify='center' align='middle' padding_top={100} gutter={[0, 20]}>
      <Col span={24} align='center' padding_bottom={20}>
        <img src={icon} alt='empty' />
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
