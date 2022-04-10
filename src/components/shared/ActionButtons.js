import { memo } from 'react';
import { Col, Row } from 'antd';

import { Button } from '@ui-kit';

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
  <Row justify='center' gutter={[37, 10]}>
    <Col>
      <Button white loading={cancelLoading} disabled={cancelDisabled} onClick={onCancel}>
        {cancelText}
      </Button>
    </Col>
    <Col>
      <Button type='primary' loading={loading} disabled={disabled} onClick={onSave}>
        {saveText}
      </Button>
    </Col>
  </Row>
);

export default memo(ActionButtons);
