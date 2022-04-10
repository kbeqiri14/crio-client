import { memo, useCallback } from 'react';
import { Col, Row } from 'antd';

import history from '@app/configs/history';
import { Button } from '@ui-kit';
import { Text } from '@ui-kit/Text';
import './styles.less';

const EmptyState = ({ Icon, text, showButton, showMail }) => {
  const upload = useCallback(() => history.push('/upload'), []);

  return (
    <Row justify='center' gutter={[0, 30]} className='empty-state'>
      <Col span={24}>
        <Icon />
      </Col>
      {text && (
        <Col span={24}>
          <Text level={20} color='white'>
            {text}
          </Text>
          {showMail && (
            <Text level='20' color='white'>
              Please, contact <a href='mailto:info@criointeractive.com'>info@criointeractive.com</a>{' '}
              for more help.
            </Text>
          )}
        </Col>
      )}
      {showButton && (
        <Col>
          <Button type='primary' onClick={upload}>
            UPLOAD
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default memo(EmptyState);
