import { memo, useState } from 'react';
import { Col, Row } from 'antd';

import { Text } from '@ui-kit/Text';
import Works from '../shared/Works';
import Perks from '../shared/Perks';

export const WorksAndPerks = () => {
  const [worksView, setWorksView] = useState(true);

  return (
    <Row className='container' gutter={[0, 47]}>
      <Col span={1}>
        <Text level='40' color='white_75' onClick={() => setWorksView(true)}>
          Works
        </Text>
      </Col>
      <Col span={23}>
        <Text level={40} color='white_75' onClick={() => setWorksView(false)}>
          Perks
        </Text>
      </Col>
      <Col span={24}>
        {worksView ? <Works /> : <Perks />}
      </Col>
    </Row>
  );
};

export default memo(WorksAndPerks);
