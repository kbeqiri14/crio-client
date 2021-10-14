import { Meta } from '@shared/Meta';
import { Col, Row } from 'antd';
import cc from 'classcat';
import { Footer } from '@shared/Footer';
import { SecondaryButton } from '@ui-kit/Button';
import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as CheckMark } from '@svgs/green-check.svg';
import recommendedMarker from '@images/pricing-marker.png';
import './styles.less';

const PerksListItem = ({ listIcon, content, isFree }) => {
  return (
    <li className={cc(['cr-pricing__perks-list-item', { 'is-pro': !isFree }])}>
      <span className='cr-pricing__perks-list-item__icon'>{listIcon}</span>
      <Text color='white_75' level='20' inline>
        {content}
      </Text>
    </li>
  );
};

const PerksList = ({ listItems, isFree }) => {
  return (
    <ul className='cr-pricing__perks-list'>
      {listItems.map((item) => (
        <PerksListItem isFree={isFree} content={item} key={item} listIcon={<CheckMark />} />
      ))}
    </ul>
  );
};

const perksListFree = [
  'View all content across the entire platform from your favourite creators',
  'Access to never-before seen exclusive content',
  'Behind the scenes footage',
];
const perksListPro = [
  ...perksListFree,
  `1 Voucher / month for Tier 1 Perks \n(e.g., Personal Video Edits from any creator)`,
  `2 Vouchers / month for Tier 2 Perks \n(e.g., Video EditingTutorials from any creator)`,
  `3 Vouchers / month for Tier 3 Perks \n(e.g., Asset packs, downloadable content, etc.)`,
];

export const PricingPlans = () => {
  return (
    <div className='cr-pricing'>
      <Meta title='Pricing Plans' description='Crio - Pricing Plans' />
      <Row justify='center' align='stretch'>
        <Col>
          <div className='cr-pricing__card'>
            <Title color='white' level='10'>
              Free
            </Title>
            <PerksList isFree listItems={perksListFree} />
          </div>
        </Col>
        <Col>
          <div className='cr-pricing__card is-paid'>
            <img
              src={recommendedMarker}
              alt='Prising Pro recommended'
              className='recommended-marker'
            />
            <Title level='10' color='white'>
              Pro
            </Title>
            <div className='cr-pricing__card--price'>
              <Title level='10' color='white' inline>
                $8
              </Title>
              <Text level='30' color='white_75' inline>
                / month
              </Text>
            </div>
            <PerksList isFree={false} listItems={perksListPro} />
            <div className='cr-pricing__card--action'>
              <SecondaryButton size='large' filled fillColor='tertiary' isBlock>
                GET STARTED
              </SecondaryButton>
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};
