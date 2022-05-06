import { useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Modal, Row } from 'antd';
import { useLazyQuery } from '@apollo/client';

import PostersList from '@app/components/screens/ExplorePage/PostersList';
import { isFollowing } from '@app/graphql/queries/users.query';
import { getRandomArtworks } from '@app/graphql/queries/artworks.query';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { urlify } from '@utils/helpers';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as CloseIcon } from '@svgs/x.svg';
import './styles.less';

export const PresentationView = () => {
  const { pathname } = useLocation();
  const { user } = useLoggedInUser();
  const { isVisible, videoInfo, setVideoInfo } = usePresentation();
  const hide = useCallback(() => {
    setVideoInfo({});
    window.history.replaceState('', '', pathname);
  }, [pathname, setVideoInfo]);

  const [requestMoreArtworks, { data }] = useLazyQuery(getRandomArtworks, {
    variables: { params: { userId: videoInfo.userId, artworkId: videoInfo.artworkId, limit: 3 } },
  });
  const [requestIsFollowing] = useLazyQuery(isFollowing, {
    variables: { followingUsername: videoInfo.name },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data?.isFollowing) {
        requestMoreArtworks();
      }
    },
  });

  useEffect(() => {
    if (!user.id || user.isCreator) {
      requestMoreArtworks();
    } else {
      requestIsFollowing();
    }
  }, [requestIsFollowing, requestMoreArtworks, user.id, user.isCreator]);

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
      <div className='video-view-container'>
        <Row className='video-view-column'>
          <Col span={18} offset={3} className='video-view-author'>
            <Row align='middle'>
              <Col className='author-avatar'>
                {videoInfo.providerUserId && <img src={videoInfo.avatar} alt='Author avatar' />}
              </Col>
              <Col>
                <Row>
                  <Col span={24}>
                    <Title level='10' color='white' inline>
                      {videoInfo.title}
                    </Title>
                  </Col>
                  <Col span={24}>
                    <Title level='20' color='primary' inline>
                      <Link to={`/profile/${videoInfo.name}`} onClick={hide}>
                        {videoInfo.name}
                      </Link>
                    </Title>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={18} offset={3}>
            <div className='video-view__player embed-responsive aspect-ratio-16/9'>
              <iframe
                title={videoInfo.title || 'Crio video player'}
                src={`https://player.vimeo.com/video/${videoInfo.id}?h=dc77330a55&color=ffffff&title=0&byline=0&portrait=0`}
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
              />
            </div>
          </Col>
          <Col span={18} offset={3}>
            <Text level='10' color='white'>
              <div dangerouslySetInnerHTML={{ __html: urlify(videoInfo.description) }} />
            </Text>
          </Col>
        </Row>
        {data?.getRandomArtworks?.length >= 3 && (
          <Row justify='start' className='video-player-more'>
            <Col span={18} className='column'>
              <Row justify='space-between' align='middle'>
                <Col>
                  <Text level='40' color='white'>
                    More by {videoInfo.name}
                  </Text>
                </Col>
                <Col>
                  <Link to={`/profile/${videoInfo.name}`} onClick={hide}>
                    <Text level='20' color='primary'>
                      View profile
                    </Text>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col>
              <PostersList postersList={data?.getRandomArtworks} />
            </Col>
          </Row>
        )}
      </div>
    </Modal>
  );
};
