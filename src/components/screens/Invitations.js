import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Tooltip } from 'antd';
import { CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useQuery, useReactiveVar } from '@apollo/client';

import history from '@configs/history';
import { loggedInUserLoadingVar } from '@configs/client-cache';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getInvitations } from '@app/graphql/queries/users.query';
import { Title } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 50px 70px;
  .ant-table-wrapper {
    width: 100%;
  }
`;

const columns = [
  {
    title: 'Creator',
    key: 'creator',
    render: ({ username }) => (
      <Title level={2}>
        <Link to={`/profile/${username}`}>{username}</Link>
      </Title>
    ),
  },
  {
    title: 'Invitations',
    key: 'invitations',
    render: ({ emails }) =>
      emails.map(({ email, accept }) => (
        <Title level={2} color='dark50' ellipsis={{ tooltip: email }}>
          {accept ? (
            <Tooltip title='Accepted'>
              <CheckCircleTwoTone />
            </Tooltip>
          ) : (
            <Tooltip title='Pending'>
              <CloseCircleOutlined />
            </Tooltip>
          )}{' '}
          {email}
        </Title>
      )),
  },
];

const Invitations = () => {
  const { user } = useLoggedInUser();
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);
  const { data, loading } = useQuery(getInvitations);

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
      <Table
        pagination={false}
        rowKey={({ username }) => username}
        className='data'
        dataSource={data?.getInvitations || []}
        columns={columns}
      />
    </Wrapper>
  );
};

export default memo(Invitations);
