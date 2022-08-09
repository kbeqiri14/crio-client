import { memo, useCallback, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useSendEmail } from '@root/src/components/shared/SendEmailModal/Context';
import history from '@configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getStripeCheckoutSession } from '@app/graphql/queries/products.query';
import { Button, Tooltip } from '@ui-kit';
import { errorToast } from '@ui-kit/Notification';
import { ReactComponent as LockIcon } from '@svgs/lock-buy.svg';
import { usePresentation } from '@shared/PresentationView/PresentationContext';

const BuyButton = ({ userId, productId, price, limit, accessibility, block }) => {
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

  const isLocked = useMemo(() => {
    if (user.isCreator || accessibility === 'everyone') {
      return false;
    }
    return user.isSubscribed ? !user.followings?.includes(userId) : true;
  }, [user.isCreator, user.isSubscribed, user.followings, accessibility, userId]);

  const tooltip = useMemo(
    () =>
      user.isSubscribed
        ? 'Follow Creator to gain access'
        : 'Subscribe and follow Creator to gain access',
    [user.isSubscribed],
  );

  const label = useMemo(
    () => (price && !user.boughtProducts?.includes(productId) ? 'BUY' : 'EMAIL'),
    [price, productId, user.boughtProducts],
  );
  const color = useMemo(() => (label === 'BUY' ? 'blue' : 'green'), [label]);
  const disabled = useMemo(() => label === 'BUY' && limit === 0, [limit, label]);
  const onClick = useMemo(() => {
    if (isLocked) {
      return () => hide() || history.push('/pricing');
    }
    if (label === 'EMAIL') {
      return () => setSendEmailInfo({ productId });
    }
    return () => limit >= 0 && getCheckoutSession();
  }, [productId, limit, label, isLocked, hide, setSendEmailInfo, getCheckoutSession]);

  const button = useMemo(
    () => (
      <Button
        block={block}
        type='primary'
        fill_color={color}
        min_width={126}
        icon={isLocked && <LockIcon />}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
      >
        {label}
      </Button>
    ),
    [block, color, loading, disabled, isLocked, label, onClick],
  );
  if (user.isCreator) {
    return null;
  }

  return isLocked ? (
    <Tooltip
      getPopupContainer={(triggerNode) => triggerNode.parentNode.querySelector('.ant-tooltip-open')}
      title={tooltip}
    >
      {button}
    </Tooltip>
  ) : (
    button
  );
};

export default memo(BuyButton);
