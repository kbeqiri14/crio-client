import { memo, useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { cancelSubscription } from '@app/graphql/mutations/user.mutation';
import { me } from '@app/graphql/queries/users.query';
import Confirmation from '@shared/Confirmation';
import { notification, Title, Text } from '@ui-kit';

const Wrapper = styled('div')`
  text-align: center;
  padding: 270px 0;
  max-width: 477px;
  margin: auto;
  .info {
    padding: 47px 0;
    background: #0f0e16;
    border-radius: 27px;
    .desc {
      width: 309px;
    }
  }
`;

const CancelSubscription = () => {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  const [requestCancelSubscription, { loading }] = useMutation(cancelSubscription, {
    update: (cache, mutationResult) => {
      if (mutationResult?.data?.cancelSubscription) {
        const existingData = cache.readQuery({ query: me });
        cache.writeQuery({
          query: me,
          data: {
            me: {
              ...existingData?.me,
              payment: {
                ...existingData?.me?.payment,
                subscriptionCancel: true,
              },
            },
          },
        });
      }
    },
    onCompleted: () => {
      hide();
      notification.successToast('Your cancellation request is successfully sent');
    },
    onError: () => {
      hide();
      notification.errorToast('Something went wrong!', 'Please, try again later!');
    },
  });

  return (
    <Wrapper>
      <Row justify='center' align='center' gutter={[0, 21]}>
        <Col span={24}>
          <Row justify='center' align='center' gutter={[0, 19]} className='info'>
            <Col span={24}>
              <Title level={1} color='white'>
                Pro account
              </Title>
            </Col>
            <Col span={24}>
              <Text level={4} className='desc' max_width={309}>
                Your payment will be automatically renewed each month.
              </Text>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Text level={4}>
            Need to {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={show}>cancel</a> your subscription?
          </Text>
        </Col>
      </Row>
      {visible && (
        <Confirmation
          visible={visible}
          title='Cancel the subscription?'
          loading={loading}
          onConfirm={requestCancelSubscription}
          onCancel={hide}
        />
      )}
    </Wrapper>
  );
};

export default memo(CancelSubscription);
