import { memo } from 'react';
import { Collapse, Col, Row, Title } from '@ui-kit';

import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { questions } from './_partials/questions';
const { Panel } = Collapse;

const Wrapper = styled('div')`
  padding-top: 40px;
  color: white;
  .title {
    margin-bottom: 40px !important;
    font-size: 22px;
    text-align: center;
  }
  .email {
    color: #04a0ff;
    border-bottom: 1px solid #04a0ff;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    left: auto;
    right: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
  }
  .formula-text {
    margin: 30px 0;
    align-items: center;
    text-align: center;
  }
  .formula-text .ant-typography {
    color: red;
    font-size: 14px;
  }
  @media (max-width: 420px) {
    .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
      left: auto;
      right: 5px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin: 0;
    }
  }
`;

export const FAQ = () => {
  return (
    <Wrapper>
      <Title className='title'>Frequently asked questions</Title>
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
    </Wrapper>
  );
};

export default memo(FAQ);
