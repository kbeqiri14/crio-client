import styled from 'styled-components';

const FeaturesWrapper = styled('div')`
  .container {
    width: 1680px;
    margin: 0 auto;
  }
  .banner {
    height: 93vh;
    min-height: 950px;
    position: relative;
  }
  .bubble {
    position: absolute;
    top: 70px;
    left: -80px;
  }
  .half-bubble {
    position: absolute;
    right: -110px;
    top: 480px;
  }
  .banner-title {
    text-align: center;
    margin: 0 auto;
    font-size: ${(props) => props.theme.title[3].size}px;
  }
  .circled {
    border: 1px solid white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 20px;
  }
  .email {
    color: #04a0ff;
  }
  .desc-content,
  .desc-texts,
  .circled {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .desc-content .banner-title {
    z-index: 100;
  }
  .desc-texts {
    margin-top: 20px;
  }
  .title {
    margin-top: 40px;
    font-size: ${(props) => props.theme.title[6].size}px;
  }
  .creator-desc,
  .follower-section {
    text-align: center;
  }
  .custom-back {
    background: #202020 !important;
  }
  .subscription {
    height: 90vh;
    min-height: 950px;
    text-align: center;
  }
  .formula-text {
    margin: 30px 0;
  }
  .list {
    margin-top: 100px;
  }
  .followers {
    margin: 40px 0px 80px;
  }
  .text-options,
  .eCommerce {
    text-align: left;
  }
  .text-options {
    margin-top: 30px;
  }
  .eCommerce-info {
    margin: 20px auto 60px;
  }
  .faq {
    display: inline;
    color: white;
    border-bottom: 1px solid #fff;
  }
  .faq:hover {
    color: white !important;
  }
  .final-section {
    margin: 80px 0;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .info {
    padding-top: 20px;
  }
  @media (max-width: 1679px) {
    .container {
      max-width: 1200px !important;
    }
    .bubble {
      left: -220px;
    }
    .half-bubble {
      right: -220px;
    }
  }
  @media (max-width: 1200px) {
    .container {
      max-width: 800px !important;
    }
    .banner,
    .creator-desc,
    .eCommerce {
      max-width: 650px !important;
      .bubble {
        left: -270px;
      }
      .half-bubble {
        right: -320px;
      }
    }
    .desc-content {
      overflow: hidden;
    }
    .follower-section {
      max-width: 100% !important;
    }
  }
  @media (max-width: 992px) {
    .cash-flow {
      display: none;
    }
    .list {
      margin: 0;
    }
    .followers {
      margin-left: 50px;
    }
    .follower-section {
      max-width: 750px !important;
    }
    .follow-img {
      width: 300px;
    }
  }
  @media (max-width: 750px) {
    .follower-section {
      max-width: 100% !important;
    }
  }
  @media (max-width: 575px) {
    .container {
      min-height: 800px;
      max-width: 385px !important;
      .bubble {
        left: -280px;
      }
      .half-bubble {
        top: 500px;
        right: -270px;
      }
    }
    .paper-plane,
    .follow-img {
      width: 380px;
    }
    .list {
      margin-top: 20px;
    }
    .cash-flow {
      display: none;
    }
    .followers {
      margin: 0;
    }
    .follower-section {
      max-width: 100% !important;
    }
    .circled {
      margin: 10px;
    }
  }
`;
export default FeaturesWrapper;
