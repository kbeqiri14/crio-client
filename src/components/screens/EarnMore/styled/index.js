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
  .ant-select-dropdown {
    display: none;
  }
  .ant-select-selection-item {
    background: #878c94;
    border: 1px solid #878c94;
    color: white !important;
    height: 32px;
    padding: 0 4px 0 10px;
    align-items: center;
  }
  .ant-select-selection-search-input,
  .ant-select-selection-item-remove {
    color: white !important;
  }
  .ant-select-selector {
    padding: 4px 16px !important;
  }
  .ant-select-multiple .ant-select-selection-search {
    margin-inline-start: -7px;
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

export default EarnMoreWrapper;
