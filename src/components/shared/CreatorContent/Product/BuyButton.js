import { memo, useMemo } from 'react';
import axios from 'axios';

import { useSendEmail } from '@root/src/components/shared/SendEmailModal/Context';
import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Button } from '@ui-kit';
import { ReactComponent as LockIcon } from '@svgs/lock-buy.svg';

const BuyButton = ({ userId, username, productId, price, accessibility, block }) => {
  const { user } = useLoggedInUser();
  const { setSendEmailInfo } = useSendEmail();

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
    return [
      'Buy',
      'blue',
      async () => {
        const { data } = await axios.post(
          `${process.env.REACT_APP_GQL_ROOT.substring(
            0,
            process.env.REACT_APP_GQL_ROOT.length - 8,
          )}stripe/create-checkout-session`,
        );
        window.open(data?.url, '_blank');
      },
    ];
  }, [
    userId,
    username,
    user.isSubscribed,
    user.followings,
    productId,
    price,
    accessibility,
    setSendEmailInfo,
  ]);

  return (
    <>
      <Button
        block={block}
        type='primary'
        fill_color={color}
        min_width={126}
        icon={icon}
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  );
};

export default memo(BuyButton);
