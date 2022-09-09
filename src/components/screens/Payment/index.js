import { memo, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useQuery, useLazyQuery } from '@apollo/client';

import { env } from '@app/configs/environment';
import history from '@configs/history';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useQueryParams from '@app/hooks/useQueryParams';
import {
  getConnectAccount,
  getConnectLoginLink,
  getConnectOnboardingLink,
  deleteStripeAccount,
} from '@app/graphql/queries/payment-method.query';
import { Button, Col, notification, Row, Text, Title } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import card from '@images/card.png';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 100px 20px;
  > div {
    max-width: 1171px;
  }
`;

const emails = [
  'klodi.beqiri14@gmail.com',
  'nkosyan123@gmail.com',
  'siranushgasparyan93@gmail.com',
];

const Payment = () => {
  const { user } = useLoggedInUser();
  const { refreshUrl } = useQueryParams();
  const [requestDelete, { loading }] = useLazyQuery(deleteStripeAccount, {
    fetchPolicy: 'no-cache',
    onCompleted: () => (window.location.href = '/payment'),
  });
  const { data: connectAccount, loading: gettingConnectAccount } = useQuery(getConnectAccount);
  const [requestConnectOnboardingLink, { loading: gettingConnectOnboardingLink }] = useLazyQuery(
    getConnectOnboardingLink,
    {
      fetchPolicy: 'no-cache',
      onCompleted: ({ getConnectOnboardingLink }) =>
        (window.location.href = getConnectOnboardingLink.url),
      onError: (e) => notification.errorToast(`Cannot create onboarding link: ${e?.message}`),
    },
  );
  const [requestConnectLoginLink, { loading: gettingConnectLoginLink }] = useLazyQuery(
    getConnectLoginLink,
    {
      fetchPolicy: 'no-cache',
      onCompleted: ({ getConnectLoginLink }) =>
        window.open(getConnectLoginLink.url, '_blank', 'noopener,noreferrer,nofollow'),
    },
  );
  const showRetry = useMemo(
    () => env !== 'production' && emails.includes(user.email),
    [user.email],
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
      <Row gutter={[0, 20]}>
        <Col md={{ span: 24 }} lg={{ span: 12 }}>
          <Row gutter={[0, 40]}>
            <Col>
              <Title level={4}>Start earning instantly using Crio's simple payments platform</Title>
            </Col>
            <Col span={24}>
              <Text level={4}>
                We are using STRIPE online payments processing. You can access your earnings when
                you need them most and get paid, all from the Dashboard
              </Text>
            </Col>
            <Col span={24}>
              {connectAccount?.getConnectAccount?.details_submitted ? (
                <Button
                  type='primary'
                  onClick={requestConnectLoginLink}
                  loading={gettingConnectLoginLink}
                >
                  LOG IN STRIPE
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
              {showRetry && (
                <Col span={24} padding_top={20}>
                  <Button onClick={requestDelete} loading={loading}>
                    RETRY
                  </Button>
                </Col>
              )}
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 24 }} lg={{ span: 10, offset: 2 }} align='center'>
          <img alt='locked' src={card} style={{ maxWidth: ' 100%' }} />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(Payment);
