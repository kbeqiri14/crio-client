import styled from 'styled-components';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  > div {
    width: 1040px;
    padding: 0 10px;
  }
  .lock {
    .tooltip {
      opacity: 0;
      visibility: hidden;
      transition: visibility 0s, opacity 0.2s linear;
      top: 190px;
    }
    &:hover {
      .tooltip {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  .like {
    width: 54px;
    height: 54px;
    position: absolute;
    top: 0;
    right: -85px;
    cursor: pointer;
    text-align: center;
    div:not(.ant-spin) {
      position: absolute;
      top: 25px;
      width: 100%;
    }
    .ant-spin {
      position: absolute;
      top: 17px;
      width: 100%;
      .ant-spin-dot-spin {
        .ant-spin-dot-item {
          background-color: #ec455a;
        }
      }
    }
  }

  .arrow-right {
    position: absolute;
    z-index: 10;
    top: 48%;
    right: 0;
    cursor: pointer;
  }
  .arrow-left {
    position: absolute;
    z-index: 10;
    top: 48%;
    left: 0;
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    .like {
      top: -74px;
      left: 75px;
      text-align: center;
    }
    .bottom-push {
      margin-bottom: 50px;
    }
  }
  @media (max-width: 420px) {
    .flex-dir {
      flex-direction: column-reverse;
    }
    .widget {
      width: 334px;
    }
    .text-content {
      margin-top: 44px;
    }
  }
`;

export default Wrapper;
