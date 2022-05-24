import { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { useSendEmail } from '@root/src/components/shared/SendEmailModal/Context';
import { contactCreator } from '@app/graphql/mutations/user.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Col, Row, Input, Title } from '@ui-kit';
import { BlurredModal } from '@ui-kit/Modal';
import { errorToast, successToast } from '@ui-kit/Notification';

const SendEmailModal = () => {
  const [message, setMessage] = useState();
  const { sendEmailInfo, setSendEmailInfo } = useSendEmail();
  const hide = useCallback(() => setSendEmailInfo({}), [setSendEmailInfo]);

  const [sendEmail, { loading }] = useMutation(contactCreator, {
    variables: { mailInfo: { message, productId: sendEmailInfo.productId } },
    onCompleted: () => {
      hide();
      successToast('The message is successfully sent');
    },
    onError: () => errorToast('Something went wrong!', 'Please, try again later!'),
  });

  return (
    <BlurredModal width={600} visible={true} onCancel={hide}>
      <Row justify='center' align='top' gutter={[0, 40]}>
        <Col span={24}>
          <Title level={1}>Email Message</Title>
        </Col>
        <Col span={24}>
          <Input.TextArea
            autoSize={{ minRows: 4, maxRows: 4 }}
            placeholder='Write message here...'
            onChange={(e) => setMessage(e.target.value)}
          />
        </Col>
        <Col>
          <ActionButtons loading={loading} saveText='SEND' onCancel={hide} onSave={sendEmail} />
        </Col>
      </Row>
    </BlurredModal>
  );
};

export default memo(SendEmailModal);
