import { memo } from 'react';
import { Col, Collapse, Row, Title } from '@ui-kit';

import styled from 'styled-components';
import { ReactComponent as ArrowDownIcon } from '@svgs/arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '@svgs/arrow-up.svg';

import { questions } from './_partials/questions';

const { Panel } = Collapse;

const Wrapper = styled('div')`
  padding-top: 40px;
  color: white;

  .email {
    color: #04a0ff;
    border-bottom: 1px solid #04a0ff;
  }
  .ant-collapse-header-text {
    padding-right: 52px;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    left: auto;
    right: 20px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
  }
  @media (max-width: 420px) {
    .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
      right: 20px !important;
      position: absolute !important;
    }
  }
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
            accordion
            expandIconPosition='end'
            expandIcon={({ isActive }) => (isActive ? <ArrowDownIcon /> : <ArrowUpIcon />)}
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
    </Wrapper>
  );
};

export default memo(FAQ);
