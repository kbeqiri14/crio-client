import { memo, useCallback, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { PRODUCTS } from '@configs/constants';
import history from '@configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getStripeCheckoutSession } from '@app/graphql/queries/products.query';
import { getThumbnail } from '@utils/helpers';
import { Button, Tooltip } from '@ui-kit';
import { errorToast } from '@ui-kit/Notification';
import { ReactComponent as LockIcon } from '@svgs/lock-buy.svg';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { useSendEmail } from '@shared/SendEmailModal/Context';

const download = (url, name) => {
  if (!url) {
    console.log('Resource URL not provided!');
    return;
  }
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobURL;
      a.style = 'display: none';

      if (name && name.length) {
        a.download = name;
      }
      document.body.appendChild(a);
      a.click();
    });
};

const BuyButton = ({
  userId,
  productId,
  productTypeId,
  file,
  price,
  limit,
  accessibility,
  block,
}) => {
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
    () =>
      price && !user.boughtProducts?.includes(productId)
        ? 'BUY'
        : +productTypeId === 2
        ? 'DOWNLOAD'
        : 'EMAIL',
    [price, productId, productTypeId, user.boughtProducts],
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
    if (label === 'DOWNLOAD') {
      return () => download(getThumbnail(PRODUCTS, userId, `file-${file}`), file);
    }
    return () => limit >= 0 && getCheckoutSession();
  }, [productId, limit, label, isLocked, hide, userId, file, setSendEmailInfo, getCheckoutSession]);

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

  if (isLocked) {
    return (
      <Tooltip
        getPopupContainer={(triggerNode) =>
          triggerNode.parentNode.querySelector('.ant-tooltip-open')
        }
        title={tooltip}
      >
        {button}
      </Tooltip>
    );
  }

  return button;
};

export default memo(BuyButton);
