import { memo } from 'react';
import { Col, Row } from 'antd';

import { Title } from '@ui-kit/Text';
import { ReactComponent as ArrowBottomIcon } from '@svgs/arrow-down.svg';
import { ReactComponent as PublicIcon } from '@svgs/public.svg';

const Visibility = () => (
  <Col span={8}>
    <Row align='middle' className='visibility'>
      <Col span={5}>
        <PublicIcon />
      </Col>
      <Col span={16}>
        <Title inline level={30} color='white'>Public</Title>
      </Col>
      <Col span={3}>
        <ArrowBottomIcon />
      </Col>
    </Row>
  </Col>
);

export default memo(Visibility);
