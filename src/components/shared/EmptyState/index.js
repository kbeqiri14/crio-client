import { memo, useCallback, useMemo } from 'react';

import history from '@configs/history';
import { ReactComponent as UploadIcon } from '@svgs/upload-icon.svg';
import { ReactComponent as NotFoundUserIcon } from '@svgs/not-found-user.svg';
import noData from '@images/no-data.png';
import { Col, Button, Row, Text } from '@ui-kit';

const EmptyState = ({ username, isCreator, isProfile, isSubscribed, isMarketplace }) => {
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
    return isSubscribed
      ? 'You don’t have any following yet'
      : 'Subscribe to follow creators and gain access to free digital products across Crio';
  }, [username, isCreator, isProfile, isSubscribed, isMarketplace]);

  const visible = useMemo(
    () => !isProfile && (isCreator || !isSubscribed),
    [isCreator, isProfile, isSubscribed],
  );
  const [label, color] = useMemo(
    () => (isCreator ? ['UPLOAD', 'blue'] : ['SUBSCRIBE', 'green']),
    [isCreator],
  );
  const onClick = useCallback(
    () => history.push(`/${isCreator ? (isMarketplace ? 'upload' : 'upload/artwork') : 'pricing'}`),
    [isCreator, isMarketplace],
  );

  return (
    <Row justify='center' align='middle' padding_top={100} gutter={[0, 20]}>
      <Col span={24} align='center' padding_bottom={20}>
        {isCreator ? (
          isProfile ? (
            <img src={noData} alt='no-data' />
          ) : (
            <UploadIcon width={210} height={151} />
          )
        ) : (
          <NotFoundUserIcon width={210} height={151} />
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
