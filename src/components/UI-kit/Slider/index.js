import { Children, useLayoutEffect, useRef } from 'react';
import Swiper, { Navigation, Scrollbar } from 'swiper';
import cc from 'classcat';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import './styles.less';

export const SliderScroll = () => <div className='swiper-scrollbar' />;

export const Slider = ({
  children,
  withScroll = false,
  slidesPerView = 4,
  slidesPerGroup = 4,
  gap = 22,
  breakpoints,
}) => {
  const swiper = useRef();

  useLayoutEffect(() => {
    const modules = [Navigation];
    if (withScroll) {
      modules.push(Scrollbar);
      import('swiper/components/scrollbar/scrollbar.min.css');
    }
    Swiper.use(modules);

    const swiperParameters = {
      slidesPerView,
      slidesPerGroup,
      grabCursor: true,
      spaceBetween: gap,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
      },
      breakpoints,
    };

    if (!swiper.current) {
      swiper.current = new Swiper('.swiper-container', swiperParameters);
    } else {
      swiper.current.update();
    }

    return () => swiper.current.destroy();
  }, [breakpoints, gap, slidesPerGroup, slidesPerView, withScroll]);

  return (
    <div className={cc(['crio-slider', { 'with-scroll': withScroll }])}>
      <div className={cc(['swiper-container'])}>
        <div className='swiper-wrapper'>
          {Children.map(children, (child) => (
            <div className='swiper-slide'>{child}</div>
          ))}
        </div>
        <button className='swiper-button-prev' />
        <button className='swiper-button-next' />
      </div>
      <SliderScroll />
    </div>
  );
};
