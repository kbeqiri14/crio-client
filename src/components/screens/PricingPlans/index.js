import { Fragment, memo, useCallback, useMemo } from 'react';
import { Col, Row } from 'antd';
import cc from 'classcat';

import { STRIPE_PAYMENT_URL } from '@configs/environment';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Meta } from '@shared/Meta';
import { Footer } from '@shared/Footer';
import { Button } from '@ui-kit';
import { Text, Title } from '@ui-kit';
import { CustomTooltip } from '@ui-kit/Tooltip';
import { warningToast } from '@ui-kit/Notification';
import { ReactComponent as CheckMark } from '@svgs/green-check.svg';
import { ReactComponent as RecommendIcon } from '@svgs/recommend.svg';
import CancelSubscription from './CancelSubscription';
import './styles.less';

const PerksListItem = ({ listIcon, content, isFree }) => {
  return (
    <li className={cc(['cr-pricing__perks-list-item', { 'is-pro': !isFree }])}>
      <span className='cr-pricing__perks-list-item__icon'>{listIcon}</span>
      <Text level={3}>{content}</Text>
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

const PricingPlans = () => {
  const { user } = useLoggedInUser();

  const handleClick = useCallback(() => {
    if (user?.id) {
      window.open(STRIPE_PAYMENT_URL, '_blank', 'noopener,noreferrer,nofollow');
    } else {
      warningToast('Warning', 'Please sign in to get started.');
    }
  }, [user?.id]);
  const showCancelSubscription = useMemo(
    () => user?.isSubscribed && user?.subscribePeriodIsValid && !user?.payment?.subscriptionCancel,
    [user?.isSubscribed, user?.payment?.subscriptionCancel, user?.subscribePeriodIsValid],
  );

  return (
    <Fragment>
      <Meta title='Pricing Plans' description='Crio - Pricing Plans' />
      {showCancelSubscription ? (
        <CancelSubscription />
      ) : (
        <div className='cr-pricing'>
          <Row justify='center' align='stretch' gutter={[8, 8]}>
            <Col>
              <div className='cr-pricing__card'>
                <Title level={1} align='center' margin_bottom={65}>
                  Free
                </Title>
                <PerksList isFree listItems={perksListFree} />
              </div>
            </Col>
            <Col>
              <div className='cr-pricing__card is-paid'>
                <RecommendIcon className='recommended-marker' />
                <Title level={1} align='center' margin_bottom={16}>
                  Pro
                </Title>
                <div className='cr-pricing__card--price'>
                  <Title level={1}>$5</Title>
                  <Text level={2}>/ month</Text>
                </div>
                <PerksList isFree={false} listItems={perksListPro} />
                <CustomTooltip
                  placement='right'
                  className='default-overlay'
                  title='Warning'
                  description='Please, use the email address attached to your profile'
                >
                  <div className='cr-pricing__card--action'>
                    <Button block type='primary' fill_color='green' onClick={handleClick}>
                      GET STARTED
                    </Button>
                  </div>
                </CustomTooltip>
              </div>
            </Col>
          </Row>
        </div>
      )}
      <Footer />
    </Fragment>
  );
};

export default memo(PricingPlans);
