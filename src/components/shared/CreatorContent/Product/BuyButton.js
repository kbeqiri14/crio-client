import { memo, useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';

import { PRODUCTS } from '@configs/constants';
import history from '@configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getStripeCheckoutSession } from '@app/graphql/queries/products.query';
import { getThumbnail } from '@utils/helpers';
import { Button, notification, Tooltip } from '@ui-kit';
import { ReactComponent as LockIcon } from '@svgs/lock-buy.svg';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { useSendEmail } from '@shared/SendEmailModal/Context';
import { categoriesVar } from '@configs/client-cache';

function isImgUrl(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}

const BuyButton = ({ userId, productId, categoryId, file, price, limit, accessibility, block }) => {
  const { user } = useLoggedInUser();
  const { setSendEmailInfo } = useSendEmail();
  const { setInfo } = usePresentation();
  const [downloading, setDownloading] = useState(false);
  const categories = useReactiveVar(categoriesVar);

  const hide = useCallback(() => setInfo({}), [setInfo]);
  const [getCheckoutSession, { loading }] = useLazyQuery(getStripeCheckoutSession, {
    fetchPolicy: 'no-cache',
    variables: { productId },
    onCompleted: ({ getStripeCheckoutSession }) =>
      (window.location.href = getStripeCheckoutSession.url),
    onError: (e) => notification.errorToast(e?.message),
  });

  const download = useCallback(async (url) => {
    if (!url) {
      console.log('Resource URL not provided!');
      return;
    }
    window.open(url);
    // setDownloading(true);
    // const isImage = await isImgUrl(url);
    // if (isImage) {
    //   fetch(url)
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //       const blobURL = URL.createObjectURL(blob);
    //       const a = document.createElement('a');
    //       a.href = blobURL;
    //       a.style = 'display: none';

    //       if (name && name.length) {
    //         a.download = name;
    //       }
    //       document.body.appendChild(a);
    //       a.click();
    //     })
    //     .finally(() => setDownloading(false));
    // } else {
    //   window.open(url, '_blank');
    // }
  }, []);

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
        : categoryId !== categories.commissionId
        ? 'DOWNLOAD'
        : 'EMAIL',
    [price, productId, categoryId, categories.commissionId, user.boughtProducts],
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
  }, [
    productId,
    limit,
    label,
    isLocked,
    hide,
    userId,
    file,
    setSendEmailInfo,
    download,
    getCheckoutSession,
  ]);

  const button = useMemo(
    () => (
      <Button
        block={block}
        type='primary'
        fill_color={color}
        min_width={126}
        icon={isLocked && <LockIcon />}
        disabled={disabled}
        loading={loading || downloading}
        onClick={onClick}
      >
        {label}
      </Button>
    ),
    [block, color, loading, downloading, disabled, isLocked, label, onClick],
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
        {categories.commissionId && button}
      </Tooltip>
    );
  }

  return button;
};

export default memo(BuyButton);
