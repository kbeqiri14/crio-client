import { memo, useState, useEffect, useCallback } from 'react';
import { Tooltip } from 'antd';
import { CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useLazyQuery, useMutation } from '@apollo/client';

import { getUserInvitations } from '@app/graphql/queries/users.query';
import { sendInvitation } from '@app/graphql/mutations/user.mutation';
import { validateEmail } from '@utils/helpers';
import { Col, Row, Text, Title, Select, Button } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { errorToast, successToast } from '@ui-kit/Notification';
import Circle from '@ui-kit/Custom/Circle';
import paperPlane from '@images/paper-plane.png';
import earnMore from '@images/earn-more.png';

const Wrapper = styled('div')`
  width: 100%;
  .ant-select-dropdown {
    display: none;
  }
  .ant-select-selection-item {
    background: ${(props) => props.theme.colors.dark50};
    border: 1px solid ${(props) => props.theme.colors.dark50};
    color: ${(props) => props.theme.colors.dark100} !important;
    height: 32px;
    padding: 0 4px 0 10px;
    align-items: center;
  }
  .ant-select-selection-search-input {
    color: white !important;
  }
  .ant-select-selection-item-remove {
    color: ${(props) => props.theme.colors.dark0} !important;
    padding-top: 2px;
  }
  .ant-select-selector {
    padding: 4px 16px !important;
  }
  .ant-select-selection-search {
    margin-inline-start: -5px;
  }
`;

const info = [
  { key: 1, title: 'Invite Members', desc: 'Let’s say you Invited two creators: Erika and John' },
  {
    key: 2,
    title: 'Invited Members Earnings',
    desc: 'Erika earns $5,000 / month on Crio and John earns $1,000 / month',
  },
  {
    key: 3,
    title: 'Your Earnings',
    desc: `You will get a total of $300 / month! $250 ($5,000 * 5%) for inviting Erika & $50 ($1,000 * 5%) for inviting John. This is in addition to other income streams you earn on Crio. `,
  },
];

const EarnMore = () => {
  const [initial, setInitial] = useState(true);
  const [emails, setEmails] = useState([]);
  const [requestUserInvitations, { data, loading: loadingInvitations }] = useLazyQuery(
    getUserInvitations,
    {
      fetchPolicy: 'cache-and-network',
      onCompleted: () => setInitial(false),
    },
  );
  const [inviteUsers, { loading }] = useMutation(sendInvitation, {
    variables: { emails },
    onCompleted: () => {
      setEmails([]);
      successToast('The invitation(s) are successfully sent');
      requestUserInvitations();
    },
    onError: (e) => errorToast(e?.message),
  });

  const send = useCallback(() => {
    if (emails.length + +data?.getUserInvitations?.length > 5) {
      errorToast("You can't invite more then 5 people");
      return;
    }
    inviteUsers();
  }, [emails.length, data?.getUserInvitations?.length, inviteUsers]);

  const validationOfEmail = (values) => {
    const validatedEmails = values.filter(validateEmail);
    setEmails(validatedEmails);
    if (values.length !== validatedEmails.length) {
      errorToast('Invalid email address');
    }
  };

  useEffect(() => {
    const asyncFunc = async () => requestUserInvitations();
    asyncFunc();
  }, [requestUserInvitations]);

  if (initial && loadingInvitations) {
    return <GlobalSpinner />;
  }

  return (
    <Row
      justify='center'
      align='middle'
      gutter={[0, 225]}
      padding_horizontal={25}
      padding_top={120}
      padding_bottom={180}
    >
      <Col span={24}>
        <Row justify='center' align='middle' gutter={172}>
          <Col max_width={568 + 172}>
            <Row gutter={[0, 20]}>
              <Col>
                <Title level={8}>Invite New Creators and Start Earning More with Crio</Title>
              </Col>
              <Col>
                <Text level={4}>
                  For every creator that signs-up, you will get a payout equal to <b>5%</b> of each
                  of their earnings for as long as they are Creators on Crio! You can refer up to{' '}
                  <b>5 creators.</b>
                </Text>
              </Col>
              <Col>
                <Text level={4}>
                  <b>This payout will come from us at Crio not the creators you refer!</b>
                </Text>
              </Col>
              <Col span={24}>
                <Title level={1}>
                  <b>Your Invitations</b>
                </Title>
              </Col>
              <Col padding_left={20}>
                {data?.getUserInvitations?.map(({ email, accept }) => (
                  <Title level={2}>
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
                ))}
              </Col>
              {data?.getUserInvitations?.length < 5 && (
                <>
                  <Wrapper>
                    <Select
                      mode='tags'
                      autoFocus
                      onChange={validationOfEmail}
                      maxTagCount={5}
                      showArrow={false}
                      filterOption={false}
                      placeholder='Write here ...'
                      tokenSeparators={[' ']}
                      value={emails}
                    />
                  </Wrapper>
                  <Col padding_top={20}>
                    <Button
                      type='primary'
                      loading={loading}
                      disabled={emails.length < 1}
                      width={220}
                      onClick={send}
                    >
                      SEND INVITATIONS
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </Col>
          <Col max_width='100%'>
            <img src={paperPlane} alt='paper plane' width='100%' height={474} className='rotate' />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Title level={6} align='center'>
          How it works
        </Title>
        <Row justify='center' align='middle' gutter={[186, 80]} padding_top={124}>
          <Col max_width='100%'>
            <img src={earnMore} alt='earn more' width='100%' />
          </Col>
          <Col max_width={365 + 186}>
            <Row justify='center' align='middle' gutter={[0, 40]}>
              {info.map(({ key, title, desc }) => (
                <Col span={24} key={key}>
                  <Row align='middle' gutter={20}>
                    <Col>
                      <Circle>{key}</Circle>
                    </Col>
                    <Col max_width={310}>
                      <Text level={4}>{title}</Text>
                      <br />
                      <Text level={3} color='dark25'>
                        {desc}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(EarnMore);
