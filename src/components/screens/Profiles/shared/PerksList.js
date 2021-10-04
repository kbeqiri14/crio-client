import React, { Fragment, memo } from 'react';
import { Col, Image, Row, Typography } from 'antd';

import videoImage from '../../../../assets/images/video-card.png'
import tutorialImage from '../../../../assets/images/tutorial-card.png';
import assetImage from '../../../../assets/images/asset-card.png';

const { Text } = Typography;

const perks = [
  {
    title: 'Personal Video Editing',
    desc: 'Video must be under 20 seconds. First come, first serve the basis.',
    src: videoImage,
  },
  {
    title: 'Tutorial Classes',
    desc: 'Join my group tutorial class to learn more about my editing process. I will send information over email to all fans that sign up.',
    src: tutorialImage,
  },
  {
    title: 'Free Asset Pack',
    desc: 'All fans who enter will get a free pack over email that will include some of the animations I use in my videos.',
    src: assetImage,
  },
];

function PerksList() {
  return (
    <Row justify='center' align='middle' style={{ backgroundColor: 'rgba(0.9, 0.9, 0.9, 1.0)' }} gutter={[0, 25]}>
      {perks.map(({ title, desc, src }) => (
        <Fragment>
          <Col span={24}>
            <Text
              style={{
                fontSize: 26,
                weight: '400',
                color: '#FFFFFF',
              }}>
              {title}
            </Text>
          </Col>
          <Col span={24}>
            <Text
              style={{
                fontSize: 18,
                weight: '400',
                color: '#FFFFFF',
              }}>
              {desc}
            </Text>
          </Col>
          <Col span={24}>
            <Image src={src} />
          </Col>
        </Fragment>))}
    </Row>
  );
}

export default memo(PerksList);
