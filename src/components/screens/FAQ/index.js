import { memo } from 'react';
import { Collapse, Col, Row, Title } from '@ui-kit';

import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { questions } from './_partials/questions';
import { Footer } from '@shared/Footer';

const { Panel } = Collapse;

const Wrapper = styled('div')`
  padding-top: 40px;
  color: white;

  .email {
    color: #04a0ff;
    border-bottom: 1px solid #04a0ff;
  }
  /* .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    left: auto;
    right: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
  } */
`;

export const FAQ = () => {
  return (
    <Wrapper>
      <Title level={1} align='center'>
        Frequently asked questions
      </Title>
      <Row className='faq' justify='center'>
        <Col lg={14} md={16} sm={18} xs={20}>
          <Collapse
            bordered={false}
            defaultActiveKey={['0']}
            expandIconPosition='end'
            expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
          >
            {questions?.map(({ key, question, answer }) => {
              return (
                <Panel header={question} key={key} className='question'>
                  <ul>{answer}</ul>
                </Panel>
              );
            })}
          </Collapse>
        </Col>
      </Row>
      <Footer />
    </Wrapper>
  );
};

export default memo(FAQ);
