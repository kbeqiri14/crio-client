import { memo, useCallback, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useSendEmail } from '@root/src/components/shared/SendEmailModal/Context';
import history from '@configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getStripeCheckoutSession } from '@app/graphql/queries/products.query';
import { Button } from '@ui-kit';
import { errorToast } from '@ui-kit/Notification';
import { ReactComponent as LockIcon } from '@svgs/lock-buy.svg';
import { usePresentation } from '@shared/PresentationView/PresentationContext';

const BuyButton = ({ userId, username, productId, price, limit, accessibility, block }) => {
  const { user } = useLoggedInUser();
  const { setSendEmailInfo } = useSendEmail();
  const { setInfo } = usePresentation();
  const hide = useCallback(() => setInfo({}), [setInfo]);
  const [getCheckoutSession, { loading }] = useLazyQuery(getStripeCheckoutSession, {
    fetchPolicy: 'no-cache',
    variables: { productId },
    onCompleted: ({ getStripeCheckoutSession }) =>
      (window.location.href = getStripeCheckoutSession.url),
    onError: (e) => errorToast(e?.message),
  });

  const [label, color, onClick, icon] = useMemo(() => {
    if (accessibility === 'subscriber_only') {
      if (!user.isSubscribed) {
        return [
          'BUY',
          'blue',
          () => {
            hide();
            history.push('/pricing');
          },
          <LockIcon />,
        ];
      }
      if (!user.followings?.includes(userId)) {
        return ['BUY', 'blue', () => history.push(`/profile/${username}`), <LockIcon />];
      }
      if (!price) {
        return ['EMAIL', 'green', () => setSendEmailInfo({ productId })];
      }
    }
    if (user.boughtProducts?.includes(productId)) {
      return ['EMAIL', 'green', () => setSendEmailInfo({ productId })];
    }
    return [
      'BUY',
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
    hide,
  ]);

  return (
    <Button
      block={block}
      type='primary'
      fill_color={color}
      min_width={126}
      icon={icon}
      disabled={limit === 0 && label === 'BUY'}
      loading={loading}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default memo(BuyButton);
