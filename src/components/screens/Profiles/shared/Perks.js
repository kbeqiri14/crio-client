import React, { Fragment, memo } from 'react';
import { Col, Row } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import videoImage from '@images/perks/video.png'
import tutorialImage from '@images/perks/tutorial.png';
import assetImage from '@images/perks/asset.png';

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

function Perks() {
  return (
    <Row gutter={[0, 44]} className='perks'>
      {perks.map(({ title, desc, src }) => (
        <Col>
          <Row gutter={[55, 20]}>
            <Col span={24}>
              <Title level={10} color='white'>
                {title}
              </Title>
            </Col>
            <Col span={24}>
              <Text level={10} color='white'>
                {desc}
              </Text>
            </Col>
            <Col span={24}>
              <img alt={title} src={src} />
            </Col>
          </Row>
        </Col>))}
    </Row>
  );
}

export default memo(Perks);
