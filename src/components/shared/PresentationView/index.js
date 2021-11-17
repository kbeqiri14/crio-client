import { Link } from 'react-router-dom';
import { Col, Modal, Row } from 'antd';
import { getPosters } from '@screens/LandingPage/posters';
import { defaultMockValue, usePresentation } from '@shared/PresentationView/PresentationContext';
import { PosterCard } from '@shared/PostersList';
import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as CloseIcon } from '@svgs/x.svg';
import './styles.less';

const posters = getPosters(3);

export { usePresentation, PresentationProvider, defaultMockValue } from './PresentationContext';

export const PresentationView = ({ visible, videoInfo, onCancel }) => {
  const { show } = usePresentation();

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
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
                <img src={videoInfo.author?.avatar} alt='Author avatar' />
              </Col>
              <Col>
                <Row>
                  <Col span={24}>
                    <Title level='10' color='white' inline>
                      {videoInfo.title}
                    </Title>
                  </Col>
                  <Col span={24}>
                    <Link>
                      <Title level='20' color='primary' inline>
                        {videoInfo.author?.name}
                      </Title>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={18} offset={3}>
            <div className='video-view__player embed-responsive aspect-ratio-16/9'>
              <iframe
                title={videoInfo.title || 'Crio video player'}
                src={`https://player.vimeo.com/video/${
                  videoInfo.id || 382975976
                }?h=dc77330a55&color=ffffff&title=0&byline=0&portrait=0`}
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
              />
            </div>
          </Col>
          <Col span={18} offset={3}>
            <Text level='10' color='white'>
              {videoInfo.description}
            </Text>
          </Col>
        </Row>
        <Row justify='start' className='video-player-more'>
          <Col span={18} offset={3} className='column'>
            <Row justify='space-between' align='middle'>
              <Col>
                <Text level='40' color='white'>
                  More by {videoInfo.author?.name}
                </Text>
              </Col>
              <Col>
                <Link>
                  <Text level='20' color='primary'>
                    View profile
                  </Text>
                </Link>
              </Col>
            </Row>
            <Row gutter={[22, 22]} justify='center' align='middle'>
              {posters.map((p, idx) => (
                <Col xl={8} md={12} sm={24} xs={24} key={idx}>
                  <PosterCard
                    onClick={() => show(defaultMockValue)}
                    poster={p}
                    author='Ann Bee'
                    title='Blah'
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
