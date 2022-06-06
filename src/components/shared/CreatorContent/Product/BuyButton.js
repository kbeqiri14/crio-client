import { memo, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useSendEmail } from '@root/src/components/shared/SendEmailModal/Context';
import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getStripeCheckoutSession } from '@app/graphql/queries/products.query';
import { Button } from '@ui-kit';
import { ReactComponent as LockIcon } from '@svgs/lock-buy.svg';

const BuyButton = ({ userId, username, productId, price, limit, accessibility, block }) => {
  const { user } = useLoggedInUser();
  const { setSendEmailInfo } = useSendEmail();
  const [getCheckoutSession, { loading }] = useLazyQuery(getStripeCheckoutSession, {
    fetchPolicy: 'no-cache',
    variables: { productId },
    onCompleted: ({ getStripeCheckoutSession }) =>
      (window.location.href = getStripeCheckoutSession.url),
  });

  const [label, color, onClick, icon] = useMemo(() => {
    if (accessibility === 'subscriber_only') {
      if (!user.isSubscribed) {
        return ['Buy', 'blue', () => history.push('/pricing'), <LockIcon />];
      }
      if (!user.followings?.includes(userId)) {
        return ['Buy', 'blue', () => history.push(`/profile/${username}`), <LockIcon />];
      }
      if (!price) {
        return ['Email', 'green', () => setSendEmailInfo({ productId })];
      }
    }
    if (user.boughtProducts?.includes(productId)) {
      return ['Email', 'green', () => setSendEmailInfo({ productId })];
    }
    return [
      'Buy',
      'blue',
      async () => {
        if (limit >= 0) {
          getCheckoutSession();
        }
      },
    ];
  }, [
    userId,
    username,
    user.isSubscribed,
    user.followings,
    user.boughtProducts,
    productId,
    price,
    limit,
    accessibility,
    setSendEmailInfo,
    getCheckoutSession,
  ]);

  return (
    <Button
      block={block}
      type='primary'
      fill_color={color}
      min_width={126}
      icon={icon}
      disabled={limit === 0 && label === 'Buy'}
      loading={loading}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default memo(BuyButton);
