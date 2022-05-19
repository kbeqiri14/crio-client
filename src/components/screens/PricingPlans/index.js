import { Fragment, memo, useCallback, useMemo } from 'react';
import cc from 'classcat';

import { STRIPE_PAYMENT_URL } from '@configs/environment';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Meta } from '@shared/Meta';
import { Footer } from '@shared/Footer';
import { Button } from '@ui-kit';
import { Col, Divider, Row, Text, Title } from '@ui-kit';
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
  'Buy publicly available products',
  'Watch, comment, like publicly available content',
];
const perksListPro = [
  'Ability to follow any creator',
  'Access to all free products from creators you follow',
  'Watch any exclusive content from creators you follow',
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
                  <Title level={1}>$7</Title>
                  <Text level={2}> / month</Text>
                </div>
                <PerksList isFree={false} listItems={perksListPro} />
                <Row gutter={[0, 20]} padding_top={10} padding_horizontal={35}>
                  <Col span={24}>
                    <Divider />
                  </Col>
                  <Col align='center' padding_bottom={20}>
                    <Text level={1} color='dark25'>
                      Crio shares a portion of your subscription fee with all creators you follow to
                      support their work and efforts!
                    </Text>
                  </Col>
                </Row>
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
