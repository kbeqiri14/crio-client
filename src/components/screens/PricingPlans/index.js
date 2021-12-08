import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';
import cc from 'classcat';

import history from '@app/configs/history';
import { STRIPE_PAYMENT_URL } from '@configs/environment';
import { useCurrentUser } from '@app/auth/hooks';
import { Meta } from '@shared/Meta';
import { Footer } from '@shared/Footer';
import { Text, Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import { CustomTooltip } from '@ui-kit/Tooltip';
import { warningToast } from '@ui-kit/Notification';
import { ReactComponent as CheckMark } from '@svgs/green-check.svg';
import { ReactComponent as BackIcon } from '@svgs/back.svg';
import { ReactComponent as RecommendIcon } from '@svgs/recommend.svg';
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
  'View all publicly available content across the entire platform from your favorite creators',
  'Behind the scenes footage',
];
const perksListPro = [
  'View all content across the entire platform from all your favorite creators',
  'Behind the scenes footage',
  'Access to never-before seen exclusive content',
  '5 Vouchers / month to redeem for various perks from any of your favorite creators (e.g., personal video edits, downloadable content, tutorials, merchandise, and much more!)',
];

export const PricingPlans = () => {
  const { pathname } = useLocation();
  const { user, loading } = useCurrentUser();
  const id = +pathname.split('/').slice(-1)[0];
  const goBack = useCallback(() => history.push(`/profile/perks/${id}`), [id]);

  const handleClick = useCallback(() => {
    if (user && !loading) {
      window.open(STRIPE_PAYMENT_URL, '_blank', 'noopener,noreferrer,nofollow');
    } else {
      warningToast('Warning', 'Please sign in to get started.');
    }
  }, [loading, user]);

  return (
    <div className='cr-pricing'>
      <Meta title='Pricing Plans' description='Crio - Pricing Plans' />
      {!!user && !loading && !!id && (
        <div className='cr-pricing__header'>
          <BackIcon onClick={goBack} />
          <Title inline level={20} color='white'>
            Subscribe To Get Access
          </Title>
        </div>
      )}
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
            <RecommendIcon className='recommended-marker' />
            <Title level='10' color='white'>
              Pro
            </Title>
            <div className='cr-pricing__card--price'>
              <Title level='10' color='white' inline>
                $5
              </Title>
              <Text level='30' color='white_75' inline>
                / month
              </Text>
            </div>
            <PerksList isFree={false} listItems={perksListPro} />
            <CustomTooltip
              placement='right'
              className='overlay-subscription'
              title='Warning'
              description='Please, use the email address attached to your profile'
            >
              <div className='cr-pricing__card--action'>
                <SecondaryButton
                  size='large'
                  textColor='white'
                  filled
                  fillColor='tertiary'
                  isBlock
                  onClick={handleClick}
                >
                  GET STARTED
                </SecondaryButton>
              </div>
            </CustomTooltip>
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};
