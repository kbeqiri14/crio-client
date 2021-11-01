import { memo } from 'react';
import { Col, Row } from 'antd';

import { SecondaryButton } from '@ui-kit/Button';

const ActionButtons = ({
  cancelText = 'CANCEL',
  saveText = 'SAVE',
  onCancel,
  onSave,
  loading,
  disabled,
}) => (
  <Row gutter={30}>
    <Col>
      <SecondaryButton
        textColor='white_75'
        borderColor='white_75'
        size='large'
        onClick={onCancel}
      >
        {cancelText}
      </SecondaryButton>
    </Col>
    <Col>
      <SecondaryButton
        filled
        textColor={disabled ? 'white_75' : 'white'}
        size='large'
        loading={loading}
        disabled={disabled}
        onClick={onSave}
      >
        {saveText}
      </SecondaryButton>
    </Col>
  </Row>
);

export default memo(ActionButtons);
