import { memo, useEffect } from 'react';
import { Divider, Col, Row, Text, Title, List, Carousel } from '@ui-kit';
import { Image } from 'antd';
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
import commissions from '@images/commissions.png';
import guides from '@images/guides.png';
import digitalAssets from '@images/digital-assets.png';
import psd from '@images/psd.png';
import FeaturesWrapper from './styled/FeaturesWrapper';

const listData = [
  'Crio puts [80%] of all subscription revenue from fans into a “Creator Pool.”',
  'Creators are paid from the “Creator Pool” each month based on the below formula.',
];
const subData = [
  'Creators can immediately make monthly income everytime they get new followers!',
  'Note: Only subscribers can follow creators on Crio.',
];
const eCommerceData = [
  'Creators can sell individual digital products or services to anyone, including free users and subscribers.',
  'Creators keep 90% of each transaction. 10% is kept by Crio to cover the costs of operations (e.g., transaction fees, paying our employees, server costs).',
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
          <Col
            xl={{ span: 14, offset: 5 }}
            lg={{ span: 16, offset: 4 }}
            md={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            className='desc-content'
          >
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
      <Row className='creator-desc container' justify='center'>
        <Col md={24} className='title-section'>
          <Title className='title'>How to Get Started as a Creator</Title>
          <Text level={4} color='dark25' className='desc-texts'>
            There are two ways to become a creator
          </Text>
        </Col>
        <Col
          xl={12}
          lg={8}
          md={8}
          sm={{ span: 7, offset: 0 }}
          xs={{ span: 24, offset: 0 }}
          offset={1}
        >
          <img src={paperPlane} alt='paper plane' className='paper-plane' />
        </Col>
        <Col
          xl={10}
          lg={14}
          md={14}
          sm={15}
          offset={1}
          xs={{ span: 24, offset: 0 }}
          className='self-center'
        >
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
              Email us directly at <br />{' '}
              <a href={`mailto:info@criointeractive.com`}>info@criointeractive.com</a> and we can{' '}
              <br /> upgrade your account to “creator status.”
            </Text>
          </Row>
        </Col>
      </Row>
      <div className='custom-back'>
        <Row className='subscription container' justify='center'>
          <Col md={{ span: 24, offset: 0 }} xs={{ span: 20, offset: 1 }}>
            <Title className='title'>Community Subscription</Title>
            <Text level={4} color='dark25' className='desc-texts'>
              Fans can subscribe monthly to Crio and then follow any <br /> creator to support their
              work and efforts!
            </Text>
          </Col>
          <Col
            className='list'
            xl={{ span: 8, offset: 2 }}
            lg={{ span: 12, offset: 0 }}
            md={{ span: 20, offset: 2 }}
          >
            <List
              $type='disc'
              $listWidth='100%'
              $padding={10}
              items={listData.map((item) => (
                <Text>{item}</Text>
              ))}
            />
            <Row className='formula-text'>
              <Col xs={16}>
                <Text color='dark25'> # of fans following you </Text>
              </Col>
              <Col xs={24}>
                <Row>
                  <Col xs={16}>
                    <Divider margin={12} />
                  </Col>
                  <Col xs={8}>
                    <Text color='dark25'> &nbsp; x &nbsp; Creator Pool </Text>
                  </Col>
                </Row>
              </Col>
              <Col xs={16}>
                <Text color='dark25'> Total # of fans following all creators </Text>
              </Col>
            </Row>
            <List
              $type='disc'
              $listWidth='100%'
              $padding={10}
              items={subData.map((item) => (
                <Text>{item}</Text>
              ))}
            />
          </Col>
          <Col xl={12} lg={{ span: 12 }} md={10}>
            <img src={cashFlow} alt='cash flow' className='cash-flow' />
          </Col>
        </Row>
      </div>
      <Row className='follower-section container' align='middle' justify='center'>
        <Col
          md={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          xs={{ span: 22, offset: 1 }}
          className='title-section'
        >
          <Title className='title'>How to Get More Followers</Title>
          <Text level={4} color='dark25' className='desc-texts'>
            We have made it easier for anyone to support creators <br /> on Crio with just one
            monthly subscription
          </Text>
        </Col>
        <Col xl={10} lg={14} md={{ span: 8, offset: 0 }} sm={24}>
          <img src={follow} alt='follow' className='follow-img' />
        </Col>
        <Col
          xl={9}
          lg={{ span: 10 }}
          md={{ span: 14, offset: 0 }}
          sm={24}
          className='self-center followers'
        >
          <Row align='middle'>
            <div className='circled'>
              <Text level={4}>1</Text>
            </div>
            <Text level={4} className='text-options'>
              Ask your current fans to support <br /> you on Crio! All they have to do is <br />{' '}
              subscribe and follow your profile.
            </Text>
          </Row>
          <Row align='middle'>
            <div className='circled'>
              <Text level={4}>2</Text>
            </div>
            <Text level={4} className='text-options'>
              Attract more subscribers to follow <br /> your profile by setting certain <br />{' '}
              products/perks as “free” or offering <br /> exclusive content.
            </Text>
          </Row>
          <Row align='middle'>
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
      <div className='custom-back'>
        <Row className='container text-center eCommerce' align='middle' justify='center'>
          <Col md={24}>
            <Title className='title'>eCommerce</Title>
            <Text level={4} color='dark25' className='desc-texts'>
              Crio also gives creators the flexibility to monetize <br /> through a storefront
            </Text>
          </Col>
          <Col md={24}>
            <List
              className='eCommerce-info'
              $type='disc'
              $listWidth='70%'
              $padding={10}
              $columns={window.innerWidth >= 576 ? '2' : '1'}
              items={eCommerceData.map((item) => (
                <Text level={4} color='dark25' className='desc-texts text-left'>
                  {item}{' '}
                </Text>
              ))}
            />
          </Col>
          <Col
            md={{ span: 24, offset: 0 }}
            sm={{ span: 16 }}
            xs={{ span: 20, offset: 1 }}
            className='text-center'
          >
            <Carousel>
              <Image preview={false} src={commissions} />
              <Image preview={false} src={guides} />
              <Image preview={false} src={digitalAssets} />
              <Image preview={false} src={psd} />
            </Carousel>
          </Col>
        </Row>
      </div>
      <Row justify='center' align='middle'>
        <Col className='final-section'>
          <Title className='banner-title'>
            Thanks for joining Crio <br />
            Let’s build a great community!
          </Title>
          <Text level={4} color='dark25' className='info'>
            Check out our
            <Link to='/faq' className='faq'>
              {' '}
              FAQ{' '}
            </Link>
            guide or email us at <br />{' '}
            <a href={`mailto:info@criointeractive.com`} className='email'>
              info@criointeractive.com
            </a>
            <br /> and get more about how Crio works
          </Text>
        </Col>
      </Row>
      <Footer />
    </FeaturesWrapper>
  );
};

export default memo(FeaturesPage);
