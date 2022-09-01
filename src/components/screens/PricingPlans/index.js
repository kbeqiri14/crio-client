import { memo, useMemo } from 'react';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Meta } from '@shared/Meta';
import CancelSubscription from './CancelSubscription';
import Pricing from './Pricing';

const PricingPlans = () => {
  const { user } = useLoggedInUser();

  const showCancelSubscription = useMemo(
    () => user?.isSubscribed && user?.subscribePeriodIsValid && !user?.payment?.subscriptionCancel,
    [user?.isSubscribed, user?.payment?.subscriptionCancel, user?.subscribePeriodIsValid],
  );

  return (
    <>
      <Meta title='Pricing Plans' description='Crio - Pricing Plans' />
      {showCancelSubscription ? <CancelSubscription /> : <Pricing />}
    </>
  );
};

export default memo(PricingPlans);
