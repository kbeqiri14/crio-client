import { Link } from 'react-router-dom';
import { Col, Modal, Row } from 'antd';
import ReactPlayer from 'react-player/vimeo';
import { getPosters } from '@screens/LandingPage/posters';
import { PosterCard } from '@shared/PostersList';
import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as CloseIcon } from '@svgs/x.svg';
import './styles.less';

const posters = getPosters(3);

export { usePresentation, PresentationProvider } from './PresentationContext';

export const PresentationView = ({ visible, videoInfo, onCancel }) => {
  if (!videoInfo.author || !videoInfo.url) {
    return null;
  }
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
        <div className='video-view-column'>
          <Row justify='start' align='middle' className='video-view-author'>
            <Col>
              <img src={videoInfo.author.avatar} alt='Author avatar' />
            </Col>
            <Col>
              <div>
                <Title level='10' color='white' inline>
                  {videoInfo.title}
                </Title>
              </div>
              <div>
                <Link>
                  <Title level='20' color='primary' inline>
                    {videoInfo.author.name}
                  </Title>
                </Link>
              </div>
            </Col>
          </Row>
          <Row className='video-view__player'>
            <ReactPlayer
              style={{
                borderRadius: '16px',
              }}
              className='cr-video-player'
              width='100%'
              height='100%'
              controls
              url={videoInfo?.url}
            />
          </Row>
          <Row>
            <Text level='10' color='white'>
              {videoInfo.description}
            </Text>
          </Row>
        </div>
        <div className='video-player-more'>
          <div className='column'>
            <Row justify='space-between' align='middle'>
              <Col>
                <Text level='40' color='white'>
                  More by {videoInfo.author.name}
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
            <Row justify='center' align='middle'>
              <Row gutter={[22, 0]} justify='center' align='middle'>
                {posters.map((p, idx) => (
                  <Col span={8} key={idx}>
                    <PosterCard poster={p} author='Ann Bee' title='Blah' />
                  </Col>
                ))}
              </Row>
            </Row>
          </div>
        </div>
      </div>
    </Modal>
  );
};
