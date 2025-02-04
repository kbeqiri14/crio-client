import styled from 'styled-components';

export const ProductWrapper = styled('div')`
  width: 332px;
  height: 332px;
  max-width: 332px;
  &.large {
    width: 686px;
    height: 723px;
    max-width: 686px;
    .tooltip {
      top: 200px;
    }
  }
  border: 1px solid ${(props) => props.theme.colors.dark50};
  box-sizing: border-box;
  border-radius: 30px;
  cursor: pointer;
  img {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    object-fit: cover;
  }
  .info {
    position: absolute;
    right: 32px;
  }
  .info,
  .tooltip,
  .actions:not(.hover) {
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

  .ant-carousel {
    .slick-list {
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
    }
  }
`;

export const ImageWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 330px;
  height: 245px;
  img {
    width: inherit;
    height: inherit;
    border-bottom: 1px solid transparent;
  }

  .ant-image {
    height: 100%;
    width: 100%;
  }
  .actions {
    width: 330px;
    height: 145px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 103.09%);
    border-bottom: 1px solid ${(props) => props.theme.colors.dark50};
    position: absolute;
    top: 101px;
    svg {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
  &.no-thumbnail {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: #182024;
  }
  &.large {
    width: 684px;
    height: 636px;
    img {
      width: inherit;
      height: inherit;
      // height: auto;
      // height: 100%;
    }
    &.no-thumbnail {
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      background: #182024;
    }
    .actions {
      width: 684px;
      top: 492px;
    }
  }
  border-bottom: 1px solid ${(props) => props.theme.colors.dark50};
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
      height: 245px;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      border-bottom: 1px solid ${(props) => props.theme.colors.dark50};
      background: transparent;
      svg {
        display: none;
      }
    }
    .ant-skeleton-content {
      padding: 0 20px;
      .ant-skeleton-paragraph {
        margin: 10px 0 0;
      }
    }
  }
`;
