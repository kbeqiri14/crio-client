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

const getPerks = (isSubscribed, vouchers) => {
  const perksArr = [
    {
      id: 1,
      title: 'Tier 1 Perks',
      desc: 'LIMITED SUPPLY: This offering can include rewards ranging from personal video edits, 1 on 1 time, discounts on merchandise, and much more!  ',
      src: isSubscribed ? perk1Subscribe : perk1,
    },
    {
      id: 2,
      title: 'Tier 2 Perks',
      desc: 'This offering can include rewards ranging from tutorials, printables, shoutouts, and much more!',
      src: isSubscribed ? perk2Subscribe : perk2,
      fillColor: 'secondary',
    },
    {
      id: 3,
      title: 'Tier 3 Perks',
      desc: 'This offering can include various downloadable content such as wallpapers, asset packs, and much more! ',
      src: isSubscribed ? perk3Subscribe : perk3,
      fillColor: 'fourth',
    },
  ];
  return perksArr.filter((perk) => vouchers[`tier${perk.id}`] > 0);
};

const Button = memo(({ subscribe, fillColor = 'tertiary', disabled, onClick }) => (
  <SecondaryButton
    size='large'
    textColor={disabled ? 'white_75' : 'white'}
    filled
    fillColor={fillColor}
    disabled={disabled}
    onClick={onClick}
    isBlock={subscribe}
  >
    {subscribe ? 'SUBSCRIBE TO GET ACCESS' : 'GET STARTED'}
  </SecondaryButton>
));

const SubscribeButton = memo(({ isProfile, isSubscribed, onClick }) =>
  isProfile && !isSubscribed ? (
    <Col className='subscribe'>
      <Button key='top' subscribe onClick={onClick} />
    </Col>
  ) : null,
);

const Perks = ({ isProfile, isSubscribed, vouchers, onButtonClick }) => {
  const { pathname } = useLocation();
  const goPricing = useCallback(
    () => history.push(`/pricing/${pathname.split('/').slice(-1)[0]}`),
    [pathname],
  );

  if (!vouchers) {
    return null;
  }

  return (
    <Row gutter={[0, 44]} justify='center' className='perks'>
      <SubscribeButton isProfile={isProfile} isSubscribed={isSubscribed} onClick={goPricing} />
      {getPerks(isProfile && isSubscribed, vouchers).map(({ id, title, desc, src, fillColor }) => (
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
              {isProfile && isSubscribed && (
                <Button onClick={() => onButtonClick(id)} fillColor={fillColor} />
              )}
            </Col>
          </Row>
        </Col>
      ))}
      <SubscribeButton isProfile={isProfile} isSubscribed={isSubscribed} onClick={goPricing} />
    </Row>
  );
};

export default memo(Perks);
