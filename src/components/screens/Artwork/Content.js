import { memo } from 'react';
import { Link } from 'react-router-dom';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { urlify } from '@utils/helpers';
import { Col, Row, Text, Title } from '@ui-kit';

export const Content = ({ videoInfo, videoUri }) => {
  const avatarUrl = useAvatarUrl(
    videoInfo.providerType,
    videoInfo.providerUserId,
    videoInfo.avatar,
  );

  return (
    <Row className='full-width' padding_bottom={52}>
      <Col span={18} offset={3}>
        <Row gutter={[0, 12]} padding_bottom={30}>
          <Col span={24}>
            <Title level={1}>{videoInfo.title}</Title>
          </Col>
          <Col span={24}>
            <Row align='middle'>
              <Col>
                {videoInfo.providerUserId && (
                  <img
                    src={avatarUrl}
                    height='33'
                    width='33'
                    alt='Author avatar'
                    className='border-radius-100'
                  />
                )}
              </Col>
              <Col margin_left={20}>
                <Text level={4} color='primary' inline>
                  <Link to={`/profile/${videoInfo.name}`}>{videoInfo.name}</Link>
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={18} offset={3}>
        <div className='video-view__player embed-responsive aspect-ratio-16/9'>
          <iframe
            title={videoInfo.title || 'Crio video player'}
            src={`https://player.vimeo.com/video/${videoUri}?h=dc77330a55&color=ffffff&title=0&byline=0&portrait=0`}
            frameBorder='0'
            allow='autoplay; fullscreen; picture-in-picture'
            allowFullScreen
          />
        </div>
      </Col>
      <Col span={18} offset={3}>
        <Title level={2}>
          <div dangerouslySetInnerHTML={{ __html: urlify(videoInfo.description) }} />
        </Title>
      </Col>
    </Row>
  );
};

export default memo(Content);
