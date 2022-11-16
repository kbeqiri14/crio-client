import styled from 'styled-components';

export const Wrapper = styled('div')`
  width: 332px;
  height: 332px;
  border: 1px solid ${(props) => props.theme.colors.dark50};
  box-sizing: border-box;
  border-radius: 30px;
  cursor: pointer;
  img {
    border-radius: 30px;
    object-fit: cover;
  }
  .video {
    position: absolute;
    top: 20px;
    right: 35px;
  }
  .info {
    position: absolute;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 103.09%);
    bottom: 39px;
    padding: 26px 20px;
    width: 330px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.4s linear;
  }
  .tooltip {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.2s linear;
  }
  &:hover {
    .info,
    .tooltip {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const SkeletonWrapper = styled('div')`
  width: 332px;
  height: 332px;
  border: 1px solid ${(props) => props.theme.colors.dark50};
  border-radius: 30px;
  margin-bottom: 8px;
  .ant-skeleton {
    width: 100%;
    .ant-skeleton-image {
      width: 330px;
      height: 330px;
      border-radius: 30px;
      background: transparent;
      svg {
        display: none;
      }
    }
  }
`;
