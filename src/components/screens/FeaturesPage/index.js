import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';
import { useMutation, useReactiveVar } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { me } from '@app/graphql/queries/users.query';
import { updateUser } from '@app/graphql/mutations/user.mutation';
// import history from '@configs/history';
import { loggedInUserLoadingVar } from '@configs/client-cache';
import { Meta } from '@shared/Meta';
import { Footer } from '@shared/Footer';
import { Carousel, Col, Divider, List, Row, Text, Title } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import Circle from '@ui-kit/Custom/Circle';
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
  <>Crio puts [80%] of all subscription revenue from fans into a “Creator Pool.”</>,
  <>Creators are paid from the “Creator Pool” each month based on the below formula.</>,
];
const subData = [
  <>Creators can immediately make monthly income everytime they get new followers!</>,
  <Text>Note: Only subscribers can follow creators on Crio.</Text>,
];
const eCommerceData = [
  <Text>
    Creators can sell individual digital products or services to anyone, including free users and
    subscribers.
  </Text>,
  <Text>
    Creators keep 90% of each transaction. 10% is kept by Crio to cover the costs of operations
    (e.g., transaction fees, paying our employees, server costs).
  </Text>,
];

export const FeaturesPage = () => {
  const { user } = useLoggedInUser();
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);
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

  // useEffect(() => {
  //   if (!loggedInUserLoading && (!user.id || (user.id && !user.isCreator))) {
  //     history.push('/');
  //   }
  // }, [loggedInUserLoading, user.id, user.isCreator]);

  useEffect(() => {
    if (user.id && !user.featuresSeen) {
      updateUserInfo();
    }
  }, [user.id, user.featuresSeen, updateUserInfo]);

  if (loggedInUserLoading) {
    return <GlobalSpinner />;
  }

  return (
    <FeaturesWrapper>
      <Meta title='Features' description='Crio - Features' />
      <div className='custom-back'>
        <Row className='banner'>
          <Col className='desc-content'>
            <img alt='half bubble background' className='half-bubble' src={halfBubble} />
            <Title level={9} className='banner-title'>
              Let’s discover Crio the Creative marketplace
            </Title>
          </Col>
        </Row>
      </div>
      <div className='custom-back-2'>
        <Row className='creator-desc' justify='center'>
          <Col padding_top={93} className='title-section'>
            <Title level={8} className='title'>
              How to Get Started as a Creator
            </Title>
            <Text level={4} color='dark25' className='desc-texts'>
              There are two ways to become a creator
            </Text>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24} padding_top={93} padding_bottom={80} className='title-section1'>
                <Row justify='center' align='middle' gutter={[177, 80]}>
                  <Col max_width='100%'>
                    <img src={paperPlane} alt='paper plane' width='100%' />
                  </Col>
                  <Col max_width={615} className='self-center creator-desc-block'>
                    <Row gutter={[0, 40]}>
                      <Col span={3} margin_right={18}>
                        <Circle border='none'>
                          <Text level={4}>1</Text>
                        </Circle>
                      </Col>
                      <Col max_width={327} className='text-options'>
                        <Text level={4}>
                          Ask a current creator on Crio to invite you by emailing us.
                        </Text>
                      </Col>
                      <Col span={3} margin_right={18}>
                        <Circle border='none'>
                          <Text level={4}>2</Text>
                        </Circle>
                      </Col>
                      <Col max_width={449} className='text-options'>
                        <Text level={4}>
                          Email us directly at
                          <br />
                          <a href={`mailto:info@criointeractive.com`}>
                            info@criointeractive.com
                          </a>{' '}
                          and we can
                          <br />
                          upgrade your account to "creator status."
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className='custom-back'>
        <Row className='subscription' justify='center' align='middle'>
          <Col padding_top={75} className='title-section'>
            <Title level={8} className='title'>
              Community Subscription
            </Title>
            <Text level={4} color='dark25' className='desc-texts'>
              Fans can subscribe monthly to Crio and then follow any creator to support their work
              and efforts!
            </Text>
          </Col>
          <Col span={22}>
            <Row>
              <Col span={24} padding_top={70}>
                <Row justify='center' align='middle' gutter={[114, 20]}>
                  <Col className='list'>
                    <List
                      $type='disc'
                      $listWidth='100%'
                      $padding={10}
                      items={listData.map((item) => (
                        <Text level={4}>{item}</Text>
                      ))}
                    />
                    <Row className='formula-text' align='middle' justify='center'>
                      <Col span={16}>
                        <Row className='formula-divider'>
                          <Col span={16} max_width={214}>
                            <Text level={4} color='dark200'>
                              {' '}
                              # of fans following you{' '}
                            </Text>
                          </Col>
                          <Col span={22} max_width={343}>
                            <Divider margin={4} />
                          </Col>
                          <Col>
                            <Text level={4} color='dark200'>
                              Total # of fans following all creators
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={8}>
                        <Row>
                          <Col max_width={172}>
                            <Text level={4} color='dark200'>
                              x &nbsp; Creator Pool{' '}
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <List
                      $type='disc'
                      $listWidth='100%'
                      $padding={10}
                      items={subData.map((item) => (
                        <Text level={4}>{item}</Text>
                      ))}
                    />
                  </Col>
                  <Col max-width='100%'>
                    <img src={cashFlow} alt='cash flow' width='100%' className='cash-flow' />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className='custom-back-2'>
        <Row className='follower-section' align='middle' justify='center'>
          <Col max_width={480} className='title-section' padding_top={104}>
            <Title level={8} className='title'>
              How to Get More Followers
            </Title>
            <Text level={4} color='dark25' className='desc-texts'>
              We have made it easier for anyone to support creators on Crio with just one monthly
              subscription
            </Text>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24} padding_bottom={167} padding_top={140}>
                <Row justify='center' align='middle' gutter={[147, 80]}>
                  <Col max_width='100%' padding_bottom={45}>
                    <img
                      src={follow}
                      alt='follow'
                      width='100%'
                      height={150}
                      className='follow-img'
                    />
                  </Col>
                  <Col max_width={660} className='self-center followers'>
                    <Row gutter={[0, 30]}>
                      <Col span={3} margin_right={10}>
                        <Circle border='none'>
                          <Text level={4}>1</Text>
                        </Circle>
                      </Col>
                      <Col max_width={400} className='text-options'>
                        <Text level={4}>
                          Ask your current fans to support you on Crio! All they have to do is{' '}
                          subscribe and follow your profile.
                        </Text>
                      </Col>
                      <Col span={3} margin_right={10}>
                        <Circle border='none'>
                          <Text level={4}>2</Text>
                        </Circle>
                      </Col>
                      <Col max_width={435} className='text-options'>
                        <Text level={4}>
                          Attract more subscribers to follow your profile by setting certain{' '}
                          products/perks as “free” or offering exclusive content.
                        </Text>
                      </Col>
                      <Col span={3} margin_right={10}>
                        <Circle border='none'>
                          <Text level={4}>3</Text>
                        </Circle>
                      </Col>
                      <Col max_width={405} className='text-options'>
                        <Text level={4}>
                          The more followers you have, the more subscription revenue you can make
                          monthly!
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className='custom-back'>
        <Row className='text-center eCommerce' align='middle' justify='center'>
          <Col md={24} padding_bottom={30} padding_top={80}>
            <Title level={8} className='title'>
              eCommerce
            </Title>
            <Text level={4} color='dark25' className='desc-texts'>
              Crio also gives creators the flexibility to
              <br /> monetize through a storefront
            </Text>
          </Col>
          <Col>
            <Row>
              <List
                className='eCommerce-info'
                $type='disc'
                $listWidth='100%'
                $padding={10}
                $columns='2'
                items={eCommerceData.map((item) => (
                  <Text level={4}>{item}</Text>
                ))}
              />
            </Row>
          </Col>
          <Col span={20} className='text-center' padding_bottom={40}>
            <Carousel autoplay>
              <Image preview={false} src={commissions} />
              <Image preview={false} src={psd} />
              <Image preview={false} src={digitalAssets} />
              <Image preview={false} src={guides} />
            </Carousel>
          </Col>
        </Row>
      </div>
      <div className='custom-back-2'>
        <Row justify='center' align='middle' className='title-section'>
          <Col className='final-section'>
            <Title className='banner-title'>
              Thanks for joining Crio <br />
              Let’s build a great community!
            </Title>
            <Text level={4} className='info'>
              Check out our
              <Link to='/faq' className='faq'>
                {' '}
                FAQ{' '}
              </Link>
              guide or email us at <br />{' '}
              <a href={`mailto:info@criointeractive.com`}>info@criointeractive.com</a>
              <br /> and get more about how Crio works
            </Text>
          </Col>
        </Row>
      </div>
      <Footer />
    </FeaturesWrapper>
  );
};

export default memo(FeaturesPage);
