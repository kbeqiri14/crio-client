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
  const { isVisible, info, setInfo } = usePresentation();
  const hide = useCallback(() => {
    setInfo({});
    window.history.replaceState('', '', pathname);
  }, [pathname, setInfo]);

  useEffect(() => {
    document.querySelector('.video-view-modal__wrapper')?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [info]);

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
      <Content info={info} videoUri={info.id} />
      <MoreProductsSection info={info} />
    </Modal>
  );
};
