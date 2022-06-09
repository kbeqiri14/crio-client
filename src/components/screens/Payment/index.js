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
  deleteStripeAccount,
} from '@app/graphql/queries/payment-method.query';
import { Button, Col, Row, Title } from '@ui-kit';
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
  const [requestDelete, { loading }] = useLazyQuery(deleteStripeAccount, {
    onCompleted: () => (window.location.href = '/payment'),
  });
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
      <Row gutter={[0, 40]}>
        {!connectAccount?.getConnectAccount?.charges_enabled && (
          <Col span={24}>
            <Title level={1}>
              Your payouts are paused. To resume payouts, update your payment details.
            </Title>
          </Col>
        )}
        <Col span={24}>
          {connectAccount?.getConnectAccount?.details_submitted ? (
            <Button onClick={requestConnectLoginLink} loading={gettingConnectLoginLink}>
              Login Stripe
            </Button>
          ) : (
            <Button onClick={requestConnectOnboardingLink} loading={gettingConnectOnboardingLink}>
              Onboarding your Stripe account
            </Button>
          )}
        </Col>
        <Col span={24}>
          <Button onClick={requestDelete} loading={loading}>
            Retry
          </Button>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(Payment);
