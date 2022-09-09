import { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { useSendEmail } from '@shared/SendEmailModal/Context';
import { contactCreator } from '@app/graphql/mutations/user.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Col, Modal, notification, Row, Input, Title } from '@ui-kit';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';

const SendEmailModal = () => {
  const [message, setMessage] = useState();
  const { sendEmailInfo, setSendEmailInfo } = useSendEmail();
  const hide = useCallback(() => setSendEmailInfo({}), [setSendEmailInfo]);

  const [sendEmail, { loading }] = useMutation(contactCreator, {
    variables: { mailInfo: { message: message?.trim(), productId: sendEmailInfo.productId } },
    onCompleted: () => {
      hide();
      notification.successToast('The message is successfully sent');
    },
    onError: () => notification.errorToast('Something went wrong!', 'Please, try again later!'),
  });

  return (
    <Modal
      centered
      footer={null}
      closeIcon={<CloseIcon />}
      width={600}
      visible={true}
      onCancel={hide}
    >
      <Row justify='center' align='top' gutter={[0, 40]}>
        <Col span={24}>
          <Title level={1}>Email Message</Title>
        </Col>
        <Col span={24}>
          <Input.TextArea
            maxLength={500}
            autoSize={{ minRows: 4, maxRows: 4 }}
            placeholder='Write message here...'
            onChange={(e) => setMessage(e.target.value)}
          />
        </Col>
        <Col>
          <ActionButtons
            disabled={!message?.trim()}
            loading={loading}
            saveText='SEND'
            onCancel={hide}
            onSave={sendEmail}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(SendEmailModal);
