import { memo, useState, useEffect } from 'react';
import styled from 'styled-components';

import { validateEmail } from '@utils/helpers';
import { Col, Row, Text, Title, Select, Button } from '@ui-kit';
import { errorToast } from '@ui-kit/Notification';
import paperPlane from '@images/paper-plane.png';
import earnMore from '@images/earn-more.png';
import { Footer } from '@shared/Footer';

const Wrapper = styled('div')`
  width: 100%;
  .ant-select-dropdown {
    display: none;
  }
  .ant-select-selection-item {
    background: #878c94;
    border: 1px solid #878c94;
    color: #2b2b2b !important;
    height: 32px;
    padding: 0 4px 0 10px;
    align-items: center;
  }
  .ant-select-selection-search-input {
    color: white !important;
  }
  .ant-select-selection-item-remove {
    color: #2b2b2b !important;
    padding-top: 2px;
  }
  .ant-select-selector {
    padding: 4px 16px !important;
  }
`;

const info = [
  { key: 1, title: 'Invite Members', desc: 'Let’s say you Invited two creators: Erika and John' },
  {
    key: 2,
    title: 'Invited Members Earnings',
    desc: 'Erika earns $1,000 / month on Crio and John earns $500 / month"',
  },
  {
    key: 3,
    title: 'Your Earnings',
    desc: (
      <>
        You will get total of $300 per month!
        <br />
        $250 ($5,000 * 5%) for inviting Erika
        <br />
        $50 ($1,000 * 5%) for inviting John This is in addition to other income streams you earn on
        Crio.
      </>
    ),
  },
];

const FeaturesPage = () => {
  const [emails, setEmails] = useState([]);

  const validationOfEmail = (values) => {
    const validatedEmails = values.filter(validateEmail);
    setEmails(validatedEmails);
    if (values.length !== validatedEmails.length) {
      errorToast('Invalid email address');
    }
  };
  useEffect(() => {
    if (emails.length > 5) {
      errorToast('You can send this to 5 people at a time');
    }
  }, [emails]);

  return (
    <>
      <Row
        justify='center'
        align='middle'
        gutter={[0, 200]}
        padding_horizontal={25}
        padding_vertical={40}
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
                    For every creator that signs-up, you will get a payout equal to 5% of each of
                    their earnings for as long as they are Creators on Crio!{' '}
                    <b>This comes out of Crio’s pocket not the creators.</b>
                  </Text>
                </Col>
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
                <Col>
                  <Button type='primary' width={220}>
                    SEND INVITATIONS
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col>
              <img
                src={paperPlane}
                alt='paper plane'
                width={431}
                height={474}
                className='rotate full-max-width'
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Title level={6} align='center'>
            How it works
          </Title>
          <Row justify='center' align='middle' gutter={[186, 80]} padding_top={124}>
            <Col>
              <img src={earnMore} alt='earn more' className='full-max-width' />
            </Col>
            <Col max_width={365 + 186}>
              <Row justify='center' align='middle' gutter={[0, 80]}>
                {info.map(({ key, title, desc }) => (
                  <Col span={24}>
                    <Row align='middle' gutter={20}>
                      <Col className='circle'>
                        <Text level={4}>{key}</Text>
                      </Col>
                      <Col max_width={285}>
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
      <Footer />
    </>
  );
};

export default memo(FeaturesPage);
