import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import styled from 'styled-components';

import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { ReactComponent as CloseIcon } from '@svgs/x.svg';
import Content from '@screens/Artwork/Content';
import MoreProductsSection from '@screens/Product/MoreProductsSection';

const Wrapper = styled(Modal)`
  background-color: #2b2b2b !important;
  height: 100%;
  max-width: unset;
  margin: unset;
  padding: 0;
  top: 0;

  .ant-modal-content {
    background-color: #2b2b2b !important;
    padding-top: 40px;
    height: 100%;
  }
  .ant-modal-close {
    width: 34px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 41px;
    right: 82px;
    span {
      display: inline-block;
      line-height: 0;
      width: auto;
      height: auto;
    }
    @media (max-width: 767.98px) {
      top: 20px;
      right: 20px;
    }
  }
  .ant-modal-body {
    padding: 0;
    margin: 0;
    background-color: #2b2b2b !important;
  }

  .video-view-container {
    width: 100%;
    height: 100%;
    background-color: #2b2b2b;
    padding: 90px 0 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  .video-view__player {
    border-radius: 16px;
    overflow: hidden;
    width: 100%;
    height: auto;
    background-color: black;
  }
`;

export const PresentationView = () => {
  const { pathname } = useLocation();
  const { isVisible, info, setInfo } = usePresentation();
  const hide = useCallback(() => {
    setInfo({});
    window.history.replaceState('', '', pathname);
  }, [pathname, setInfo]);

  useEffect(() => {
    document.querySelector('.ant-modal-wrap')?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [info]);

  return (
    <Wrapper
      destroyOnClose
      onCancel={hide}
      visible={isVisible}
      maskClosable={false}
      footer={false}
      width='100%'
      closeIcon={<CloseIcon />}
    >
      <Content info={info} content={info.id} />
      <MoreProductsSection info={info} />
    </Wrapper>
  );
};
