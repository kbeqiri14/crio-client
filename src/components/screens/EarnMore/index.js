import { memo } from 'react';
import { Col, Row, Text, Title, Input, Button } from '@ui-kit';
import { Footer } from '@shared/Footer';
import paperPlane from '@images/paper-plane.png';
import earnMore from '@images/earn-more.png';
import styled from 'styled-components';

const EarnMoreWrapper = styled('div')`
  margin-top: 150px;
  .paper-plane {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
  .email-section {
    width: 568px;
  }
  .email-input {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .works-section {
    align-items: flex-start;
  }
  .works-title {
    margin-top: 200px;
  }
  .circled {
    border: 1px solid white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: #202020;
    padding: 9px 18px;
    margin-right: 20px;
  }
  .text-options {
    margin-bottom: 80px;
  }
  .text-options:last-child {
    margin-bottom: 180px;
  }
  @media (max-width: 768px) {
    .earn-more-img {
      margin-bottom: 40px;
      width: 500px;
    }
    .text-options {
      margin-bottom: 40px;
    }
    .text-options:last-child {
      margin-bottom: 80px;
    }
  }
  @media (max-width: 575px) {
    .earn-more-img {
      width: 440px;
      margin-bottom: 40px;
    }
    .works-title {
      margin-top: 100px;
      margin-bottom: 60px;
    }
    .paper-plane {
      width: 380px;
    }
    @media (max-width: 420px) {
      .earn-more-img {
        width: 320px;
        margin-bottom: 40px;
      }
    }
  }
`;

export const FeaturesPage = () => {
  return (
    <EarnMoreWrapper>
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
          <Input className='email-input' level={4} maxLength={50} placeholder='Write here...' />
          <Button type='primary'>SEND INVITATION</Button>
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
            <Col md={4} xs={4}>
              <div className='circled'>
                <Text level={4}>1</Text>
              </div>
            </Col>
            <Col md={19} xs={18} className='text-left text-options'>
              <Text level={4}>
                Invited Members <br />
              </Text>
              <Text level={3} color='dark25'>
                Let’s say you Invited two creators: Erika and John
              </Text>
            </Col>
            <Col md={4} xs={4}>
              <div className='circled'>
                <Text level={4}>2</Text>
              </div>
            </Col>
            <Col md={19} xs={18} className='text-left text-options'>
              <Text level={4}>
                Invited Members Earnings <br />
              </Text>
              <Text level={3} color='dark25'>
                Erika earns $1,000 / month on Crio and John earns $500 / month"
              </Text>
            </Col>
            <Col md={4} xs={4}>
              <div className='circled'>
                <Text level={4}>3</Text>
              </div>
            </Col>
            <Col md={19} xs={18} className='text-left text-options'>
              <Text level={4}>
                Your Earnings <br />
              </Text>
              <Text level={3} color='dark25'>
                You will get total of $300 per month! $250 ($5,000 * 5%) for inviting Erika $50
                ($1,000 * 5%) for inviting John This is in addition to other income streams you earn
                on Crio.
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
    </EarnMoreWrapper>
  );
};

export default memo(FeaturesPage);
