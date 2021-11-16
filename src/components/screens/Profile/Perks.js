import { memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';

import history from '@app/configs/history';
import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import perk1 from '@images/perks/perk-1.png';
import perk2 from '@images/perks/perk-2.png';
import perk3 from '@images/perks/perk-3.png';
import perk1Subscribe from '@images/perks/perk-1-subscribe.png';
import perk2Subscribe from '@images/perks/perk-2-subscribe.png';
import perk3Subscribe from '@images/perks/perk-3-subscribe.png';

const getPerks = (isProfile) => [
  {
    title: 'Tier 1 Perks',
    desc: 'LIMITED SUPPLY: This offering can include rewards ranging from personal video edits, 1 on 1 time, discounts on merchandise, and much more!  ',
    src: isProfile ? perk1Subscribe : perk1,
  },
  {
    title: 'Tier 2 Perks',
    desc: 'This offering can include rewards ranging from tutorials, printables, shoutouts, and much more!',
    src: isProfile ? perk2Subscribe : perk2,
    fillColor: 'secondary',
  },
  {
    title: 'Tier 3 Perks',
    desc: 'This offering can include various downloadable content such as wallpapers, asset packs, and much more! ',
    src: isProfile ? perk3Subscribe : perk3,
    fillColor: 'fourth',
  },
];

const SubscribeButton = memo(({ subscribe, fillColor = 'tertiary', disabled, onClick }) => (
  <SecondaryButton
    size='large'
    textColor={disabled ? 'white_75' : 'white'}
    filled
    fillColor={fillColor}
    disabled={disabled}
    onClick={onClick}
  >
    {subscribe ? 'SUBSCRIBE TO GET ACCESS' : 'GET STARTED'}
  </SecondaryButton>
));

const Perks = ({ isProfile, loadingIsSubscriber, isSubscribed }) => {
  const { pathname } = useLocation();
  const goPricing = useCallback(
    () => history.push(`/pricing/${pathname.split('/').slice(-1)[0]}`),
    [pathname],
  );

  return (
    <Row gutter={[0, 44]} justify='center' className='perks'>
      {isProfile && !isSubscribed && (
        <Col>
          <SubscribeButton key='top' subscribe onClick={goPricing} />
        </Col>
      )}
      {getPerks(isProfile).map(({ title, desc, src, fillColor }) => (
        <Col key={title}>
          <Row justify='center'>
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
            <Col span={24} className='container'>
              <img alt={title} src={src} />
              {isProfile && <SubscribeButton fillColor={fillColor} />}
            </Col>
          </Row>
        </Col>
      ))}
      {isProfile && !isSubscribed && (
        <Col>
          <SubscribeButton key='bottom' subscribe onClick={goPricing} />
        </Col>
      )}
    </Row>
  );
};

export default memo(Perks);
