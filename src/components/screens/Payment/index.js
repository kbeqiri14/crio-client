import { memo, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useLazyQuery } from '@apollo/client';

import history from '@app/configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useQueryParams from '@app/hooks/useQueryParams';
import {
  getConnectAccount,
  getConnectLoginLink,
  getConnectOnboardingLink,
} from '@app/graphql/queries/payment-method.query';
import { Button, Text } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { errorToast } from '@ui-kit/Notification';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

const Payment = () => {
  const { user } = useLoggedInUser();
  const { refreshUrl } = useQueryParams();
  const { data: connectAccount, loading: gettingConnectAccount } = useQuery(getConnectAccount);
  const [requestConnectOnboardingLink, { loading: gettingConnectOnboardingLink }] = useLazyQuery(
    getConnectOnboardingLink,
    {
      onCompleted: ({ getConnectOnboardingLink }) =>
        (window.location.href = getConnectOnboardingLink.url),
      onError: (e) => errorToast(`Cannot create onboarding link: ${e?.message}`),
    },
  );
  const [requestConnectLoginLink, { loading: gettingConnectLoginLink }] = useLazyQuery(
    getConnectLoginLink,
    {
      onCompleted: ({ getConnectLoginLink }) =>
        window.open(getConnectLoginLink.url, '_blank', 'noopener,noreferrer,nofollow'),
    },
  );

  useEffect(() => {
    if (user.id) {
      if (!user.isCreator) {
        history.push('/');
        return;
      }
    }
  }, [
    user.id,
    user.isCreator,
    gettingConnectAccount,
    connectAccount?.getConnectAccount?.details_submitted,
  ]);

  useEffect(() => {
    if (refreshUrl) {
      requestConnectOnboardingLink();
    }
  }, [refreshUrl, requestConnectOnboardingLink]);

  if (gettingConnectAccount) {
    return <GlobalSpinner />;
  }

  return (
    <Wrapper>
      {!connectAccount?.getConnectAccount?.charges_enabled && (
        <Text>Your payouts are paused To resume payouts, update your payment details.</Text>
      )}
      {connectAccount?.getConnectAccount?.details_submitted ? (
        <Button onClick={requestConnectLoginLink} loading={gettingConnectLoginLink}>
          Login Stripe
        </Button>
      ) : (
        <Button onClick={requestConnectOnboardingLink} loading={gettingConnectOnboardingLink}>
          Onboarding your Stripe account
        </Button>
      )}
    </Wrapper>
  );
};

export default memo(Payment);
