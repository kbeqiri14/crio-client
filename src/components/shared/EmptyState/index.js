import { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import history from '@configs/history';
import noUser from '@images/no-user.png';
import emptyMarketplace from '@images/empty-marketplace.png';
import emptyArtwork from '@images/empty-artwork.png';
import upload from '@images/upload.png';
import notFound from '@images/not-found.png';
import { Col, Button, Row, Text } from '@ui-kit';

const Wrapper = styled('div')`
  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 70px);
    padding-bottom: 110px;
  }
`;

const EmptyState = ({
  username,
  isCreator,
  isProfile,
  isNotFound,
  isSubscribed,
  isMarketplace,
}) => {
  const text = useMemo(() => {
    if (isNotFound) {
      return isMarketplace ? 'Product is not found' : 'Artwork is not found';
    }
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
    return isSubscribed
      ? 'You don’t have any following yet'
      : 'Subscribe to follow creators and gain access to free digital products across Crio';
  }, [username, isCreator, isProfile, isSubscribed, isMarketplace, isNotFound]);
  const icon = useMemo(() => {
    if (isNotFound) {
      return notFound;
    }
    if (isCreator) {
      if (isProfile) {
        return isMarketplace ? emptyMarketplace : emptyArtwork;
      }
      return upload;
    }
    return noUser;
  }, [isCreator, isProfile, isMarketplace, isNotFound]);
  const [label, color] = useMemo(
    () => (isCreator ? ['UPLOAD', 'blue'] : ['SUBSCRIBE', 'green']),
    [isCreator],
  );
  const visible = useMemo(
    () => !isNotFound && !isProfile && (isCreator || !isSubscribed),
    [isCreator, isProfile, isSubscribed, isNotFound],
  );
  const onClick = useCallback(
    () => history.push(`/${isCreator ? (isMarketplace ? 'upload' : 'upload/artwork') : 'pricing'}`),
    [isCreator, isMarketplace],
  );

  return (
    <Wrapper className={isNotFound ? 'wrap' : ''}>
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
    </Wrapper>
  );
};

export default memo(EmptyState);
