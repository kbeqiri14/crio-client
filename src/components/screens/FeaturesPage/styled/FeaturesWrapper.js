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
    left: -150px;
  }
  .half-bubble {
    position: absolute;
    right: -180px;
    top: 480px;
  }
  .banner-title {
    text-align: center;
    margin: 0 auto;
    font-size: 45px;
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
    margin-top: 80px;
    font-size: 30px;
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
    align-items: center;
    text-align: center;
  }
  .list {
    margin-top: 100px;
  }
  .followers {
    margin: 40px 0px 80px;
  }
  .text-options {
    text-align: left;
  }
  .followers .text-options {
    margin-top: 30px;
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
    margin-bottom: 80px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .info {
    padding-top: 20px;
  }
`;
export default FeaturesWrapper;
