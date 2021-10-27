import { Children, useLayoutEffect, useRef } from 'react';
import Swiper, { Navigation, Scrollbar } from 'swiper';
import cc from 'classcat';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import './styles.less';

window.swipersCount = 0;

export const Slider = ({
  children,
  withScroll = false,
  slidesPerView = 4,
  slidesPerGroup = 4,
  gap = 22,
  breakpoints,
}) => {
  const swiper = useRef();
  const { current: classNames } = useRef({
    scrollClass: `swiper-scrollbar-${window.swipersCount}`,
    nextBtnClass: `swiper-button-next-${window.swipersCount}`,
    prevBtnClass: `swiper-button-prev-${window.swipersCount}`,
    containerClass: `instance-${window.swipersCount}`,
  });

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
        nextEl: `.${classNames.nextBtnClass}`,
        prevEl: `.${classNames.prevBtnClass}`,
      },
      scrollbar: {
        el: `.${classNames.scrollClass}`,
        hide: false,
      },
      breakpoints,
    };

    if (!swiper.current) {
      swiper.current = new Swiper(`.${classNames.containerClass}`, swiperParameters);
      window.swipersCount++;
    } else {
      swiper.current.update();
    }
  }, [breakpoints, classNames, gap, slidesPerGroup, slidesPerView, withScroll]);

  return (
    <div className={cc(['crio-slider', { 'with-scroll': withScroll }])}>
      <div className={cc(['swiper-container', classNames.containerClass])}>
        <div className='swiper-wrapper'>
          {Children.map(children, (child) => (
            <div className='swiper-slide'>{child}</div>
          ))}
        </div>
        <button className={cc([classNames.prevBtnClass, 'swiper-button-prev'])} />
        <button className={cc([classNames.nextBtnClass, 'swiper-button-next'])} />
      </div>
      <div className={cc([classNames.scrollClass, 'swiper-scrollbar'])} />
    </div>
  );
};
