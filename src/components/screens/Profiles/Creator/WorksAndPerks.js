import { memo, useCallback, useState } from 'react';
import { Col, Row } from 'antd';

import { Text } from '@ui-kit/Text';
import Works from '../shared/Works';
import Perks from '../shared/Perks';

export const WorksAndPerks = () => {
  const [worksView, setWorksView] = useState(true);
  const showWorks = useCallback(() => setWorksView(true), []);
  const showPerks = useCallback(() => setWorksView(false), []);

  return (
    <Row className='container' gutter={[0, 47]}>
      <Col span={2}>
        <Text level='40' color='white_75' className={worksView ? 'active' : 'inactive'} onClick={showWorks}>
          Works 126
        </Text>
      </Col>
      <Col span={22}>
        <Text level={40} color='white_75' className={!worksView ? 'active' : 'inactive'} onClick={showPerks}>
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
