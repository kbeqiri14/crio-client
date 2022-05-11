import { memo, useState } from 'react';
import { Col, Row, Input } from 'antd';
import ActionButtons from '@shared/ActionButtons';
import { BlurredModal } from '@ui-kit/Modal';
import { Title } from '@ui-kit';
import './styles.less';

const Footer = ({ loading = false, onCancel, onSave, disabled }) => {
  return (
    <ActionButtons
      saveText='SEND'
      loading={loading}
      disabled={disabled}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};

export const SendEmailModal = ({ handleSendEmail, onCancel, loading }) => {
  const [message, setMessage] = useState('');

  return (
    <BlurredModal width={828} visible onCancel={onCancel} className='cr-send-email'>
      <Row justify='center' align='top'>
        <Col span={24} style={{ marginBottom: 20 }}>
          <Title level={2}>Email Message</Title>
        </Col>
        <Col span={24} style={{ marginBottom: 60 }}>
          <Input.TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='cr-send-email__text'
            placeholder='Type your message...'
          />
        </Col>
        <Col span={24}>
          <Footer
            loading={loading}
            disabled={!Boolean(message?.trim().length)}
            onCancel={onCancel}
            onSave={() => handleSendEmail(message)}
          />
        </Col>
      </Row>
    </BlurredModal>
  );
};

export default memo(SendEmailModal);
