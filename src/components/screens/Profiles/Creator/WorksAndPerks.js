import { memo, useCallback, useState } from 'react';
import { Col, Row } from 'antd';

import { Text } from '@ui-kit/Text';
import Works from '../__partials__/Works';
import Perks from '../__partials__/Perks';

export const WorksAndPerks = () => {
  const [worksView, setWorksView] = useState(true);
  const showWorks = useCallback(() => setWorksView(true), []);
  const showPerks = useCallback(() => setWorksView(false), []);

  return (
    <Row className='container' gutter={[0, 47]}>
      <Col span={24}>
        <Row gutter={50}>
          <Col>
            <Text
              level='40'
              color='white_75'
              className={worksView ? 'active' : 'inactive'}
              onClick={showWorks}
            >
              WORKS 126
            </Text>
          </Col>
          <Col>
            <Text
              level={40}
              color='white_75'
              className={!worksView ? 'active' : 'inactive'}
              onClick={showPerks}
            >
              PERKS
            </Text>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {worksView ? <Works /> : <Perks />}
      </Col>
    </Row>
  );
};

export default memo(WorksAndPerks);
