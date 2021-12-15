import { memo, useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';

import { cancelSubscription } from '@app/graphql/mutations/user.mutation';
import { me } from '@app/graphql/queries/users.query';
import ActionButtons from '@shared/ActionButtons';
import { Title, Text } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import { errorToast, successToast } from '@ui-kit/Notification';

export const CancelSubscription = memo(() => {
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
              <Title level={10} color='white'>
                Pro account
              </Title>
            </Col>
            <Col span={24}>
              <Text level={10} color='white_75' className='desc'>
                Your payment will be automatically renewed each month.
              </Text>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Text level={10} color='white_75'>
            Need to {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={show}>cancel</a> your subscription?
          </Text>
        </Col>
      </Row>
      {visible && (
        <BlurredModal
          width={486}
          maskClosable={false}
          visible={visible}
          onCancel={hide}
          className='confirmation'
        >
          <Title level={10} color='white'>
            Cancel the subscription?
          </Title>
          <ActionButtons
            cancelText='NO'
            saveText='YES, CANCEL'
            loading={loading}
            onCancel={hide}
            onSave={requestCancelSubscription}
          />
        </BlurredModal>
      )}
    </div>
  );
});

export default CancelSubscription;
