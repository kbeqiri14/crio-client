import { memo } from 'react';
import { Col, Row } from 'antd';

import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import perk1 from '@images/perks/perk-1.png';
import perk2 from '@images/perks/perk-2.png';
import perk3 from '@images/perks/perk-3.png';

const perks = [
  {
    title: 'Tier 1 Perks',
    desc: 'LIMITED SUPPLY: This offering can include rewards ranging from personal video edits, 1 on 1 time, discounts on merchandise, and much more!  ',
    src: perk1,
  },
  {
    title: 'Tier 2 Perks',
    desc: 'This offering can include rewards ranging from tutorials, printables, shoutouts, and much more!',
    src: perk2,
  },
  {
    title: 'Tier 3 Perks',
    desc: 'This offering can include various downloadable content such as wallpapers, asset packs, and much more! ',
    src: perk3,
  },
];

const SubscribeButton = () => (
  <Col>
    <SecondaryButton size='large' textColor='white' filled fillColor='tertiary'>
      SUBSCRIBE TO GET ACCESS
    </SecondaryButton>
  </Col>
);

const Perks = ({ isProfile }) => (
  <Row gutter={[0, 44]} justify='center' className='perks'>
    {/* {isProfile && <SubscribeButton key='top' />} */}
    {perks.map(({ title, desc, src }) => (
      <Col key={title}>
        <Row justify='center'>
          <Col span={24}>
            <Title level={10} color='white'>
              {title}
            </Title>
          </Col>
          <Col md={18} lg={15} xl={12} xxl={9}>
            <Text level={10} color='white'>
              {desc}
            </Text>
          </Col>
          <Col span={24}>
            <img alt={title} src={src} />
          </Col>
        </Row>
      </Col>
    ))}
    {/* {isProfile && <SubscribeButton key='bottom' />} */}
  </Row>
);

export default memo(Perks);
