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
import { Button, Col, Row, Text, Title } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { errorToast } from '@ui-kit/Notification';
import card from '@images/card.png';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  > div {
    max-width: 1171px;
  }
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
      <Row>
        <Col span={12}>
          <Row gutter={[0, 40]}>
            <Col>
              <Title level={4}>Invite New Creators and Start Earning More with Crio</Title>
            </Col>
            <Col>
              <Text level={4}>
                For every creator that signs-up, you will get a payout equal to 5% of each of their
                earnings for as long as they are Creators on Crio!{' '}
              </Text>
            </Col>
            {!connectAccount?.getConnectAccount?.charges_enabled && (
              <Col span={24}>
                <Title level={1}>
                  Your payouts are paused. To resume payouts, update your payment details.
                </Title>
              </Col>
            )}
            <Col span={24}>
              {connectAccount?.getConnectAccount?.details_submitted ? (
                <Button
                  type='primary'
                  onClick={requestConnectLoginLink}
                  loading={gettingConnectLoginLink}
                >
                  LOGIN STRIPE
                </Button>
              ) : (
                <Button
                  type='primary'
                  onClick={requestConnectOnboardingLink}
                  loading={gettingConnectOnboardingLink}
                >
                  ONBOARDING YOUR STRIPE ACCOUNT
                </Button>
              )}
            </Col>
            <Col span={24}>
              <Button onClick={requestDelete} loading={loading}>
                RETRY
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={10} offset={2}>
          <img alt='locked' src={card} />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(Payment);
