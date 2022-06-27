import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from 'antd';

import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { ReactComponent as CloseIcon } from '@svgs/x.svg';
import Content from '../../screens/Artwork/Content';
import MoreProductsSection from '@root/src/components/screens/Product/MoreProductsSection';
import './styles.less';

export const PresentationView = () => {
  const { pathname } = useLocation();
  const { isVisible, videoInfo, setVideoInfo } = usePresentation();
  const hide = useCallback(() => {
    setVideoInfo({});
    window.history.replaceState('', '', pathname);
  }, [pathname, setVideoInfo]);

  useEffect(() => {
    document.querySelector('.video-view-modal__wrapper')?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [videoInfo]);

  return (
    <Modal
      destroyOnClose
      onCancel={hide}
      visible={isVisible}
      maskClosable={false}
      footer={false}
      width='100%'
      closeIcon={<CloseIcon />}
      wrapClassName='video-view-modal__wrapper'
      className='video-view-modal'
    >
      <Content videoInfo={videoInfo} videoUri={videoInfo.id} />
      <MoreProductsSection videoInfo={videoInfo} />
    </Modal>
  );
};
