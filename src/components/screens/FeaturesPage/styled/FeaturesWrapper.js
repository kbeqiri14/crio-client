import styled from 'styled-components';

const FeaturesWrapper = styled('div')`
  .banner {
    display: flex;
    justify-content: center;
    min-height: 920px;
  }
  .half-bubble {
    position: absolute;
    right: -70px;
    top: 420px;
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
    background: #202020;
    padding: 16px 18px;
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
    max-width: 1070px;
    margin: 0 20px;
  }
  .desc-texts {
    max-width: 505px;
    margin: 20px auto 0;
  }
  .title {
    font-size: ${(props) => props.theme.title[6].size}px;
  }
  .paper-plane {
    max-width: 514px;
  }
  .creator-desc,
  .follower-section {
    text-align: center;
  }
  .custom-back {
    background: #1a1e24 !important;
  }
  .custom-back-2 {
    background: #000000 !important;
  }
  .subscription {
    min-height: 950px;
    text-align: center;
  }
  .list {
    padding-bottom: 105px;
    ol {
      padding-inline-start: 25px;
    }
    li {
      padding: 0 10px;
    }
  }
  .formula-text {
    max-width: 581px;
    height: 111px;
    border-radius: 12px;
    background: #ffffff;
    text-align: center;
    margin-left: 25px;
    margin-bottom: 23px;
    opacity: 80%;
    padding: 0 10px;
    .formula-divider {
      display: flex;
      justify-content: center;
    }
  }

  .title-section {
    margin: 0 15px;
  }
  .text-options,
  .eCommerce {
    text-align: left;
  }

  .eCommerce-info {
    margin: 20px auto 60px;
    li:first-child {
      max-width: 365px;
    }
    li:last-child {
      max-width: 486px;
    }
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
    margin: 120px 0;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .info {
    padding-top: 20px;
  }
  @media (max-width: 1300px) {
    .banner-title {
      font-size: 55px !important;
      line-height: 70px !important;
    }
    .half-bubble {
      width: 230px;
      right: 60px;
      top: 320px;
    }
    .desc-content {
      height: 680px;
    }
  }
  @media (max-width: 575px) {
    .followers {
      margin: 0 20px 0 25px;
    }
    .follower-section {
      max-width: 100% !important;
    }
    .follow-img {
      padding: 0 10px;
    }
    .creator-desc-block {
      margin: 0 20px 20px 30px;
    }
    .formula-text {
      height: 130px;
      margin-right: 20px;
    }
    .half-bubble {
      right: 40px;
      top: 395px;
    }
  }
`;
export default FeaturesWrapper;
