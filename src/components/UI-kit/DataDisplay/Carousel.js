import { Carousel as antCarousel } from 'antd';
import styled from 'styled-components';

const Carousel = styled(antCarousel)`
  .slick-dots li {
    width: 16px !important;
  }
  .slick-dots li button {
    width: 9px;
    height: 9px;
    background-color: ${(props) => props.theme.colors.dark25};
    border-radius: 100%;
  }
`;

export default Carousel;
