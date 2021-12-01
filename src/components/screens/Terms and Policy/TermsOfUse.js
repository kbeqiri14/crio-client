import { Text, Title } from '@ui-kit/Text';
import { Col, Row } from 'antd';

export const TermsOfUse = () => {
  return (
    <section className='cr-privacy-policy'>
      <div className='pp--wrapper'>
        <Row justify='center'>
          <Title level='10' color='white'>
            TERMS OF USE
          </Title>
        </Row>
        <Row>
          <Col span={24}>
            <Text color='white' level='20'>
              Version 1.0
            </Text>
            <Text color='white' level='20'>
              The CrioInteractive website located at https://criointeractive.com is a copyrighted
              work belonging to Crio Interactive. Certain features of the Site may be subject to
              additional guidelines, terms, or rules, which will be posted on the Site in connection
              with such features.
            </Text>
            <Text color='white' level='20'>
              All such additional terms, guidelines, and rules are incorporated by reference into
              these Terms.
            </Text>
            <Text color='white' level='20'>
              These Terms of Use described the legally binding terms and conditions that oversee
              your use of the Site. BY LOGGING INTO THE SITE, YOU ARE BEING COMPLIANT THAT THESE
              TERMS and you represent that you have the authority and capacity to enter into these
              Terms. YOU SHOULD BE AT LEAST 18 YEARS OF AGE TO ACCESS THE SITE. IF YOU DISAGREE WITH
              ALL OF THE PROVISION OF THESE TERMS, DO NOT LOG INTO AND/OR USE THE SITE.
            </Text>
            <Text color='white' level='20'>
              These terms require the use of arbitration Section 10.2 on an individual basis to
              resolve disputes and also limit the remedies available to you in the event of a
              dispute.
            </Text>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default TermsOfUse;
