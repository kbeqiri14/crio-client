import { Fragment, memo, useState, useEffect } from 'react';
import { Col, Row, Text, Title, Select, Button } from '@ui-kit';
import { Footer } from '@shared/Footer';
import { validateEmail } from '@utils/helpers';

import paperPlane from '@images/paper-plane.png';
import earnMore from '@images/earn-more.png';
import { errorToast } from '@ui-kit/Notification';
import Wrapper from './styled';

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
    desc: `You will get total of $300 per month! $250 ($5,000 * 5%) for inviting Erika $50 ($1,000 * 5%) for inviting John This is in addition to other income streams you earn on Crio.`,
  },
];

export const FeaturesPage = () => {
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
    <Wrapper>
      <Row justify='center' align='middle'>
        <Col
          className='email-section'
          xl={{ span: 7, offset: 0 }}
          lg={{ span: 10, offset: 0 }}
          md={{ span: 10, offset: 0 }}
          xs={{ span: 22 }}
        >
          <Title level={4}>Invite New Creators and Start Earning More with Crio</Title>
          <Text level={4} className='margin-bottom'>
            For every creator that signs-up, you will get a payout equal to 5% of each of their
            earnings for as long as they are Creators on Crio!{' '}
            <b>This comes out of Crio’s pocket not the creators.</b>
          </Text>
          <Select
            mode='tags'
            autoFocus
            onChange={validationOfEmail}
            maxTagCount={5}
            showArrow={false}
            filterOption={false}
            className='email-input'
            placeholder='Write here ...'
            tokenSeparators={[' ']}
            value={emails}
          />
          <Button type='primary' width={220}>
            SEND INVITATIONS
          </Button>
        </Col>
        <Col
          xl={{ span: 6, offset: 4 }}
          lg={{ span: 10, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          offset={2}
        >
          <img src={paperPlane} alt='paper plane' className='paper-plane' />
        </Col>
      </Row>
      <Title level={6} className='text-center works-title'>
        How it works
      </Title>
      <Row justify='center' align='middle' style={{ marginTop: '120px' }} className='works-section'>
        <Col
          xl={{ span: 12, offset: 1 }}
          lg={{ span: 14, offset: 0 }}
          md={{ span: 14, offset: 0 }}
          sm={{ span: 20, offset: 2 }}
          xs={{ span: 22, offset: 1 }}
        >
          <img src={earnMore} alt='earn more' className='earn-more-img' />
        </Col>
        <Col
          xl={{ span: 8, offset: 0 }}
          lg={{ span: 8, offset: 0 }}
          md={{ span: 8, offset: 0 }}
          sm={{ span: 20, offset: 2 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Row gutter={[0, 24]}>
            {info.map(({ key, title, desc }) => (
              <Fragment key={key}>
                <Col md={4} xs={4}>
                  <div className='circled'>
                    <Text level={4}>{key}</Text>
                  </div>
                </Col>
                <Col md={19} xs={18} className='text-left text-options'>
                  <Text level={4}>
                    {title} <br />
                  </Text>
                  <Text level={3} color='dark25'>
                    {desc}
                  </Text>
                </Col>
              </Fragment>
            ))}
          </Row>
        </Col>
      </Row>
      <Footer />
    </Wrapper>
  );
};

export default memo(FeaturesPage);
