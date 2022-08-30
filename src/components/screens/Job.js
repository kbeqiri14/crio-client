/* eslint-disable no-unused-vars */
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox, Switch, Table } from 'antd';
import styled from 'styled-components';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';

import history from '@configs/history';
import { loggedInUserLoadingVar } from '@configs/client-cache';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { job } from '@app/graphql/queries/users.query';
import { createTransfers } from '@app/graphql/mutations/user.mutation';
import { Button, Col, Row, Text, Title } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { errorToast, successToast } from '@ui-kit/Notification';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 50px 70px;
`;

const columns = [
  {
    title: 'Creator Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Creator Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Stripe Account',
    dataIndex: 'stripe',
    key: 'stripe',
    render: (checked) => <Checkbox defaultChecked={checked} disabled />,
    align: 'center',
  },
  {
    title: 'Follower Count',
    dataIndex: 'count',
    key: 'count',
    align: 'center',
  },
  {
    title: 'Share',
    dataIndex: 'share',
    key: 'share',
    align: 'right',
    render: (text) => <span>{text.toFixed(1)}%</span>,
  },
  {
    title: 'Payout',
    dataIndex: 'payout',
    key: 'payout',
    align: 'right',
    render: (text) => <span>${text.toFixed(2)}</span>,
  },
];

const AMOUNT = 6.5;

const Job = () => {
  const { user } = useLoggedInUser();
  const [state, setState] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);
  const { loading } = useQuery(job, {
    onCompleted: ({ job }) => {
      let totalFollowersCount = 0;
      job.creatorsFollowersCount.forEach((item) => (totalFollowersCount += +item.followersCount));
      const price = (AMOUNT * job.subscribersCount * 80) / 100;
      const creatorsFollowers = job.creatorsFollowersCount.reduce(
        (acc, item) => [
          ...acc,
          {
            name: `${item.firstName} ${item.lastName}`,
            email: item.email,
            stripe: item.stripe,
            count: +item.followersCount,
            share: (+item.followersCount / totalFollowersCount) * 100,
            payout: (+item.followersCount / totalFollowersCount) * price,
          },
        ],
        [],
      );
      setState({ totalFollowersCount, subscribersCount: job.subscribersCount, creatorsFollowers });
      setDataSource(creatorsFollowers.filter(({ count }) => count > 0));
    },
  });
  const [transfer, { loading: transferring }] = useMutation(createTransfers, {
    onCompleted: () => successToast('Transfers successfully done'),
    onError: () => errorToast('Something went wrong!'),
  });

  const pool = useMemo(
    () => ((state.subscribersCount * AMOUNT * 80) / 100).toFixed(2),
    [state.subscribersCount],
  );
  const totalShare = useMemo(
    () =>
      dataSource.reduce((acc, item) => {
        acc += +item.share;
        return acc;
      }, 0),
    [dataSource],
  );
  const totalPayout = useMemo(
    () =>
      dataSource.reduce((acc, item) => {
        acc += +item.payout;
        return acc;
      }, 0),
    [dataSource],
  );
  const filter = useCallback(
    (checked) =>
      setDataSource(
        checked ? dataSource.filter(({ count }) => count > 0) : state.creatorsFollowers,
      ),
    [dataSource, state.creatorsFollowers],
  );

  useEffect(() => {
    if (user.id || !(loading || loggedInUserLoading)) {
      if (
        !(
          user.email === 'kbeqiri14@gmail.com' ||
          user.email === 'nkosyan123@gmail.com' ||
          user.email === 'siranush@tidepoollabs.com'
        )
      ) {
        history.push('/');
      }
    }
  }, [user.email, user.id, loading, loggedInUserLoading]);

  if (loading || loggedInUserLoading) {
    return <GlobalSpinner />;
  }

  return (
    <Wrapper>
      <Row gutter={[0, 20]}>
        <Col span={20}>
          <Row>
            <Col span={22} align='right'>
              <Text level={4} color='dark25'>
                # of Subscribers on Crio
              </Text>
            </Col>
            <Col span={2} align='right'>
              <Title level={2}>{state.subscribersCount}</Title>
            </Col>
            <Col span={22} align='right'>
              <Text level={4} color='dark25'>
                Subscription Price ($) / mont
              </Text>
            </Col>
            <Col span={2} align='right'>
              <Title level={2}>${AMOUNT.toFixed(2)}</Title>
            </Col>
            <Col span={22} align='right'>
              <Text level={4} color='dark25'>
                Total Crio Subscription Revenue/ Month
              </Text>
            </Col>
            <Col span={2} align='right'>
              <Title level={2}>${(state.subscribersCount * AMOUNT).toFixed(2)}</Title>
            </Col>
            <Col span={22} align='right'>
              <Text level={4} color='dark25'>
                % Allocated to Creator
              </Text>
            </Col>
            <Col span={2} align='right'>
              <Title level={2}>80%</Title>
            </Col>
            <Col span={22} align='right'>
              <Text level={4} color='dark25'>
                Creator Pool / month
              </Text>
            </Col>
            <Col span={2} align='right'>
              <Title level={2}>${pool}</Title>
            </Col>
          </Row>
        </Col>
        <Col span={24} align='right' padding_top={80}>
          <Row justify='end' align='middle'>
            <Col>
              <Title level={2}>Show only creators who have followers</Title>
            </Col>
            <Col padding_left={20}>
              <Switch defaultChecked onChange={filter} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Table
            pagination={false}
            rowKey={({ email }) => email}
            className='data'
            dataSource={dataSource}
            columns={columns}
            summary={() => (
              <Table.Summary>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}>
                    <span style={{ fontWeight: 'bold' }}>Total</span>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align='center'>
                    <span style={{ fontWeight: 'bold' }}>{state.totalFollowersCount}</span>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align='right'>
                    <span style={{ fontWeight: 'bold' }}>{totalShare.toFixed(1)}%</span>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align='right'>
                    <span style={{ fontWeight: 'bold' }}>${totalPayout.toFixed(2)}</span>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </Col>
        {/* <Col span={24} align='end'>
          <Button type='primary' loading={transferring} onClick={transfer}>
            Transfer
          </Button>
        </Col> */}
      </Row>
    </Wrapper>
  );
};

export default memo(Job);
