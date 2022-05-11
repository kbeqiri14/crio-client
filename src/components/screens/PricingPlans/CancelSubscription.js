import { memo, useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';

import { cancelSubscription } from '@app/graphql/mutations/user.mutation';
import { me } from '@app/graphql/queries/users.query';
import Confirmation from '@shared/Confirmation';
import { Title, Text } from '@ui-kit';
import { errorToast, successToast } from '@ui-kit/Notification';

export const CancelSubscription = () => {
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
      successToast('Your cancellation request is successfully sent.');
    },
    onError: () => {
      hide();
      errorToast('Something went wrong!', 'Please, try again later!');
    },
  });

  return (
    <div>
      <Row
        justify='center'
        align='center'
        gutter={[0, 21]}
        className='cr-pricing__cancel-subscription'
      >
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
    </div>
  );
};

export default memo(CancelSubscription);
