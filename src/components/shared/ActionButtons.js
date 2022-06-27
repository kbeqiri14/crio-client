import { memo } from 'react';

import { Button, Col, Row } from '@ui-kit';

const ActionButtons = ({
  fillColor = 'blue',
  cancelText = 'CANCEL',
  saveText = 'SAVE',
  onCancel,
  onSave,
  cancelLoading,
  cancelDisabled,
  loading,
  disabled,
}) => (
  <Row justify='center' gutter={[37, 10]}>
    <Col min_width={190}>
      <Button
        block
        white='true'
        loading={cancelLoading}
        disabled={cancelDisabled}
        onClick={onCancel}
      >
        {cancelText}
      </Button>
    </Col>
    <Col min_width={190}>
      <Button
        block
        type='primary'
        fill_color={fillColor}
        loading={loading}
        disabled={disabled}
        onClick={onSave}
      >
        {saveText}
      </Button>
    </Col>
  </Row>
);

export default memo(ActionButtons);
