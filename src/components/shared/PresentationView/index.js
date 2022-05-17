import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import { useQuery } from '@apollo/client';

import { getRandomArtworks } from '@app/graphql/queries/artworks.query';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { ReactComponent as CloseIcon } from '@svgs/x.svg';
import Content from '../../screens/Artwork/Content';
import MoreBySection from '@screens/Product/MoreBySection';
import './styles.less';

export const PresentationView = () => {
  const { pathname } = useLocation();
  const { isVisible, videoInfo, setVideoInfo } = usePresentation();
  const hide = useCallback(() => {
    setVideoInfo({});
    window.history.replaceState('', '', pathname);
  }, [pathname, setVideoInfo]);

  const { data } = useQuery(getRandomArtworks, {
    variables: { params: { userId: videoInfo.userId, artworkId: videoInfo.artworkId, limit: 3 } },
  });

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
      {data?.getRandomArtworks?.length >= 3 && (
        <MoreBySection videoInfo={videoInfo} postersList={data?.getRandomArtworks} />
      )}
      <MoreBySection videoInfo={videoInfo} productsList={data?.getRandomArtworks} />
    </Modal>
  );
};
