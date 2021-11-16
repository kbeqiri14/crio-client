import { memo } from 'react';
import { Col, Row } from 'antd';

import { SecondaryButton } from '@ui-kit/Button';

const ActionButtons = ({
  cancelText = 'CANCEL',
  saveText = 'SAVE',
  onCancel,
  onSave,
  cancelLoading,
  cancelDisabled,
  loading,
  disabled,
}) => (
  <Row justify='center' gutter={37}>
    <Col>
      <SecondaryButton
        textColor={cancelLoading ? 'white' : 'white_75'}
        borderColor='white_75'
        size='large'
        loading={cancelLoading}
        disabled={cancelDisabled}
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
