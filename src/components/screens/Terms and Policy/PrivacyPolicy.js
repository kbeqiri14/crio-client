import { memo } from 'react';

import { Meta } from '@shared/Meta';
import { Col, Row, Text, Title } from '@ui-kit';
import './styles.less';

const PrivacyPolicy = () => {
  return (
    <section className='cr-privacy-policy'>
      <Meta title='Privacy Policy' description='Crio - Privacy Policy' />
      <div className='pp--wrapper'>
        <Row justify='center'>
          <Title level={1} margin_bottom={30}>
            PRIVACY POLICY FOR CRIO INTERACTIVE
          </Title>
        </Row>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Text level={3}>
              At Crio Interactive, accessible from{' '}
              <a href='https://criointeractive.com'>https://criointeractive.com</a>, one of our main
              priorities is the privacy of our visitors. This Privacy Policy document contains types
              of information that is collected and recorded by Crio Interactive and how we use it.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              If you have additional questions or require more information about our Privacy Policy,
              do not hesitate to contact us.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              This Privacy Policy applies only to our online activities and is valid for visitors to
              our website with regards to the information that they shared and/or collect in Crio
              Interactive. This policy is not applicable to any information collected offline or via
              channels other than this website.
            </Text>
          </Col>
          <Col span={24}>
            <Title level={2} margin_bottom={10}>
              Consent
            </Title>
            <Text level={3}>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </Text>
          </Col>
          <Col span={24}>
            <Title level={2} margin_bottom={10}>
              Information we collect
            </Title>
            <Text level={3}>
              The personal information that you are asked to provide, and the reasons why you are
              asked to provide it, will be made clear to you at the point we ask you to provide your
              personal information.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              If you contact us directly, we may receive additional information about you such as
              your name, email address, phone number, the contents of the message and/or attachments
              you may send us, and any other information you may choose to provide.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              When you register for an Account, we may ask for your contact information, including
              items such as name, company name, address, email address, and telephone number.
            </Text>
          </Col>
          <Col span={24}>
            <Title level={2} margin_bottom={10}>
              How we use your information
            </Title>
            <Text level={3}>We use the information we collect in various ways, including to:</Text>
            <ul style={{ color: 'white' }}>
              <li>
                <Text level={3}>Provide, operate, and maintain our website</Text>
              </li>
              <li>
                <Text level={3}>Improve, personalize, and expand our website</Text>
              </li>
              <li>
                <Text level={3}>Understand and analyze how you use our website</Text>
              </li>
              <li>
                <Text level={3}>Develop new products, services, features, and functionality</Text>
              </li>
              <li>
                <Text level={3}>
                  Communicate with you, either directly or through one of our partners, including
                  for customer service, to provide you with updates and other information relating
                  to the website, and for marketing and promotional purposes
                </Text>
              </li>
              <li>
                <Text level={3}>Send you emails</Text>
              </li>
              <li>
                <Text level={3}>Find and prevent fraud</Text>
              </li>
            </ul>
          </Col>
          <Col span={24}>
            <Title level={2} margin_bottom={10}>
              Log Files
            </Title>
            <Text level={3}>
              Crio Interactive follows a standard procedure of using log files. These files log
              visitors when they visit websites. All hosting companies do this and a part of hosting
              services' analytics. The information collected by log files include internet protocol
              (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp,
              referring/exit pages, and possibly the number of clicks. These are not linked to any
              information that is personally identifiable. The purpose of the information is for
              analyzing trends, administering the site, tracking users' movement on the website, and
              gathering demographic information.
            </Text>
          </Col>
          <Col span={24}>
            <Title level={2} margin_bottom={10}>
              Cookies and Web Beacons
            </Title>
            <Text level={3}>
              Like any other website, Crio Interactive uses 'cookies'. These cookies are used to
              store information including visitors' preferences, and the pages on the website that
              the visitor accessed or visited. The information is used to optimize the users'
              experience by customizing our web page content based on visitors' browser type and/or
              other information.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              For more general information on cookies, please read{' '}
              <a href='https://www.cookieconsent.com/'>more on the Cookie Consent website.</a>
            </Text>
          </Col>
          <Col span={24}>
            <Title level={2} margin_bottom={10}>
              Advertising Partners Privacy Policies
            </Title>
            <Text level={3}>
              You may consult this list to find the Privacy Policy for each of the advertising
              partners of Crio Interactive.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or
              Web Beacons that are used in their respective advertisements and links that appear on
              Crio Interactive, which are sent directly to users' browser. They automatically
              receive your IP address when this occurs. These technologies are used to measure the
              effectiveness of their advertising campaigns and/or to personalize the advertising
              content that you see on websites that you visit.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              Note that Crio Interactive has no access to or control over these cookies that are
              used by third-party advertisers.
            </Text>
          </Col>
          <Col span={24}>
            <Title level={2} margin_bottom={10}>
              Third Party Privacy Policies
            </Title>
            <Text level={3}>
              Crio Interactive's Privacy Policy does not apply to other advertisers or websites.
              Thus, we are advising you to consult the respective Privacy Policies of these
              third-party ad servers for more detailed information. It may include their practices
              and instructions about how to opt-out of certain options.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              You can choose to disable cookies through your individual browser options. To know
              more detailed information about cookie management with specific web browsers, it can
              be found at the browsers' respective websites.
            </Text>
          </Col>
          <Col span={24}>
            <Title level={2} margin_bottom={10}>
              CCPA Privacy Rights (Do Not Sell My Personal Information)
            </Title>
            <Text level={3}>
              Under the CCPA, among other rights, California consumers have the right to:
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              Request that a business that collects a consumer's personal data disclose the
              categories and specific pieces of personal data that a business has collected about
              consumers.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              Request that a business delete any personal data about the consumer that a business
              has collected.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              Request that a business that sells a consumer's personal data, not sell the consumer's
              personal data.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              If you make a request, we have one month to respond to you. If you would like to
              exercise any of these rights, please contact us.
            </Text>
          </Col>
          <Col span={24}>
            <Title level={2} margin_bottom={10}>
              GDPR Data Protection Rights
            </Title>
            <Text level={3}>
              We would like to make sure you are fully aware of all of your data protection rights.
              Every user is entitled to the following:
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              The right to access – You have the right to request copies of your personal data. We
              may charge you a small fee for this service.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              The right to rectification – You have the right to request that we correct any
              information you believe is inaccurate. You also have the right to request that we
              complete the information you believe is incomplete.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              The right to erasure – You have the right to request that we erase your personal data,
              under certain conditions.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              The right to restrict processing – You have the right to request that we restrict the
              processing of your personal data, under certain conditions.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              The right to object to processing – You have the right to object to our processing of
              your personal data, under certain conditions.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              The right to data portability – You have the right to request that we transfer the
              data that we have collected to another organization, or directly to you, under certain
              conditions.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              If you make a request, we have one month to respond to you. If you would like to
              exercise any of these rights, please contact us.
            </Text>
          </Col>
          <Col span={24}>
            <Title level={2} margin_bottom={10}>
              Children's Information
            </Title>
            <Text level={3}>
              Another part of our priority is adding protection for children while using the
              internet. We encourage parents and guardians to observe, participate in, and/or
              monitor and guide their online activity.
            </Text>
          </Col>
          <Col span={24}>
            <Text level={3}>
              Crio Interactive does not knowingly collect any Personal Identifiable Information from
              children under the age of 13. If you think that your child provided this kind of
              information on our website, we strongly encourage you to contact us immediately and we
              will do our best efforts to promptly remove such information from our records.
            </Text>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default memo(PrivacyPolicy);
