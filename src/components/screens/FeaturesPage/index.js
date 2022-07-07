import { memo, useEffect } from 'react';
import { Divider, Col, Row, Text, Title, List } from '@ui-kit';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { me } from '@app/graphql/queries/users.query';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import { Footer } from '@shared/Footer';
import bubble from '@images/bubble.png';
import halfBubble from '@images/half-bubble.png';
import paperPlane from '@images/paper-plane.png';
import cashFlow from '@images/cash-flow.png';
import follow from '@images/follow.png';
import FeaturesWrapper from './styled/FeaturesWrapper';

const listData = [
  'Crio puts [80%] of all subscription revenue from fans into a “Creator Pool.”',
  'Creators are paid from the “Creator Pool” each month based on the below formula.',
];
const subData = [
  'Creators can immediately make monthly income everytime they get new followers!',
  'Note: Only subscribers can follow creators on Crio.',
];

export const FeaturesPage = () => {
  const { user } = useLoggedInUser();
  const [updateUserInfo] = useMutation(updateUser, {
    variables: { attributes: { featuresSeen: true } },
    update: (cache, mutationResult) => {
      if (mutationResult?.data?.updateUser) {
        const existingData = cache.readQuery({ query: me });
        cache.writeQuery({
          query: me,
          data: { me: { ...existingData?.me, featuresSeen: true } },
        });
      }
    },
  });
  useEffect(() => {
    if (user.id && !user.featuresSeen) {
      updateUserInfo();
    }
  }, [user.id, user.featuresSeen, updateUserInfo]);

  return (
    <FeaturesWrapper>
      <div className='custom-back'>
        <Row className='banner container'>
          <Col md={12} offset={6} className='desc-content'>
            <img alt='bubble background' className='bubble' src={bubble} />
            <img alt='half bubble background' className='half-bubble' src={halfBubble} />
            <Title className='banner-title'>
              Let’s Discover Crio <br /> The Creative Marketplace
            </Title>
            <Text level={4} color='dark25' className='desc-texts'>
              Crio is a community marketplace platform where creators can <br /> offer digital
              products, services, and content to their fans.
            </Text>
            <Text level={4} color='dark25' className='desc-texts'>
              See some tips on how to monetize!
            </Text>
          </Col>
        </Row>
      </div>
      <Row className='creator-desc container'>
        <Col md={24} className='title-section'>
          <Title className='title'>How to Get Started as a Creator</Title>
          <Text level={4} color='dark25' className='desc-texts'>
            There are two ways to become a creator
          </Text>
        </Col>
        <Col md={12} offset={1}>
          <img src={paperPlane} alt='paper plane' />
        </Col>
        <Col md={10} offset={1} className='self-center'>
          <Row align='middle'>
            <div className='circled'>
              <Text level={4}>1</Text>
            </div>
            <Text className='text-options'>
              Ask a current creator on Crio to send <br /> you a special referral link.
            </Text>
          </Row>
          <Row align='middle'>
            <div className='circled'>
              <Text level={4}>2</Text>
            </div>
            <Text className='text-options'>
              Email us directly at <br /> <span className='email'>info@criointeractive.com</span>{' '}
              and we can <br /> upgrade your account to “creator status.”
            </Text>
          </Row>
        </Col>
      </Row>
      <div className='custom-back'>
        <Row className='subscription container'>
          <Col md={24} style={{ textAlign: 'center' }}>
            <Title className='title'>Community Subscription</Title>
            <Text level={4} color='dark25' className='desc-texts'>
              {' '}
              Fans can subscribe monthly to Crio and then follow any <br /> creator to support their
              work and efforts!{' '}
            </Text>
          </Col>
          <Col className='list' md={10} offset={3}>
            <List
              $type='disc'
              $listWidth='70%'
              $padding={10}
              items={listData.map((item) => (
                <Text>{item}</Text>
              ))}
            />
            <Row className='formula-text'>
              <Col md={11}>
                <Text color='dark25'> # of fans following you </Text>
                <Divider width={230} />
                <Text color='dark25'> Total # of fans following all creators </Text>
              </Col>
              <Col md={5}>
                <Text color='dark25'>&nbsp; &nbsp; x &nbsp; Creator Pool </Text>
              </Col>
            </Row>
            <List
              $type='disc'
              $listWidth='70%'
              $padding={10}
              items={subData.map((item) => (
                <Text>{item}</Text>
              ))}
            />
          </Col>
          <Col md={10}>
            <img src={cashFlow} alt='cash flow' />
          </Col>
        </Row>
      </div>
      <Row className='follower-section container' align='middle'>
        <Col md={24} className='title-section'>
          <Title className='title'>How to Get More Followers</Title>
          <Text level={4} color='dark25' className='desc-texts'>
            We have made it easier for anyone to support creators <br /> on Crio with just one
            monthly subscription
          </Text>
        </Col>
        <Col md={15}>
          <img src={follow} alt='follow' />
        </Col>
        <Col md={9} className='self-center followers'>
          <Row align='middle' gutter={[0, 48]}>
            <div className='circled'>
              <Text level={4}>1</Text>
            </div>
            <Text level={4} className='text-options'>
              Ask your current fans to support <br /> you on Crio! All they have to do is <br />{' '}
              subscribe and follow your profile.
            </Text>
          </Row>
          <Row align='middle' gutter={[0, 48]}>
            <div className='circled'>
              <Text level={4}>2</Text>
            </div>
            <Text level={4} className='text-options'>
              Attract more subscribers to follow <br /> your profile by setting certain <br />{' '}
              products/perks as “free” or offering <br /> exclusive content.
            </Text>
          </Row>
          <Row align='middle' gutter={[0, 48]}>
            <div className='circled'>
              <Text level={4}>3</Text>
            </div>
            <Text level={4} className='text-options'>
              The more followers you have, the <br /> more subscription revenue you <br /> can make
              monthly!
            </Text>
          </Row>
        </Col>
      </Row>
      <Row justify='center' align='middle'>
        <Col className='final-section'>
          <Title className='banner-title'>
            Thanks for joining Crio <br />
            Let’s build a great community!
          </Title>
          <Text level={4} color='dark25' className='info'>
            Check out our{' '}
            <Link to='/payment' className='faq'>
              FAQ
            </Link>{' '}
            guide or email us at <br /> <span className='email'>info@criointeractive.com</span>{' '}
            <br /> and get more about how Crio works
          </Text>
        </Col>
      </Row>
      <Footer />
    </FeaturesWrapper>
  );
};

export default memo(FeaturesPage);
