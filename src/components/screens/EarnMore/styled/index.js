import styled from 'styled-components';

const Wrapper = styled('div')`
  margin-top: 150px;
  .inner {
    display: flex;
    justify-content: center;
    margin-bottom: 180px;
  }
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
    margin-right: 120px;
  }
  .works-title {
    margin-top: 155px;
    padding-bottom: 124px;
  }
  .circled {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: #202020;
    padding: 9px 18px;
    text-align: center;
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
    color: #2b2b2b !important;
    height: 32px;
    padding: 0 4px 0 10px;
    align-items: center;
  }
  .ant-select-selection-search-input {
    color: white !important;
  }
  .ant-select-selection-item-remove {
    color: #2b2b2b !important;
    padding-top: 2px;
  }
  .ant-select-selector {
    padding: 4px 16px !important;
  }
  .ant-select-multiple .ant-select-selection-search {
    margin-inline-start: -7px;
  }
  .works-image {
    max-width: 588px;
  }
  .works-content {
    max-width: 360px;
    .content-container {
      display: flex;
      align-items: center;
      .content {
        max-width: 304px;
      }
    }
  }

  @media (min-width: 1200px) {
    .image-section {
      margin-right: 150px;
    }
    .email-section {
      margin-left: 20px;
    }
    .works-image {
      margin-right: 205px;
      margin-top: 42px;
    }
  }
  @media (max-width: 1200px) {
    .text-options {
      margin-left: 15px;
    }
    .works-section {
      margin: 0 80px;
    }
  }
  @media (max-width: 992px) {
    .image-section {
      margin-right: 125px;
      margin-left: 70px;
      .paper-plane {
        width: 380px;
      }
    }
  }
  @media (max-width: 768px) {
    .earn-more-img {
      margin-bottom: 40px;
      width: 500px;
    }
    .works-section {
      margin: 0 40px;
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
    @media (max-width: 420px) {
      .earn-more-img {
        width: 320px;
        margin-bottom: 40px;
      }
    }
  }
`;

export default Wrapper;
