import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { urlify } from '@utils/helpers';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Col, Row, Text, Title } from '@ui-kit';
import LockState from '@screens/ExplorePage/LockState';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  > div {
    min-width: 1040px;
    max-width: 1040px;
  }
`;

export const Content = ({ videoInfo, videoUri, isLocked }) => {
  const avatarUrl = useAvatarUrl(
    videoInfo.providerType,
    videoInfo.providerUserId,
    videoInfo.avatar,
  );
  const { setVideoInfo } = usePresentation();

  const hide = useCallback(() => setVideoInfo({}), [setVideoInfo]);

  return (
    <Wrapper>
      <Row justify='center' padding_bottom={52}>
        <Col span={24}>
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
                  <Text level={4} color='primary' onClick={hide}>
                    <Link to={`/profile/${videoInfo.name}`}>{videoInfo.name}</Link>
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        {isLocked ? (
          <Col span={24} margin_bottom={40}>
            <LockState
              userId={videoInfo.userId}
              accessibility={videoInfo.accessibility}
              size='lg'
            />
            <img
              src={videoInfo.thumbnailUri}
              alt='artwork'
              className='border-radius-30 fit-cover'
              width={1043}
              height={638}
            />
          </Col>
        ) : (
          <Col span={24}>
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
        )}
        <Col span={24}>
          <Title level={2}>
            <div dangerouslySetInnerHTML={{ __html: urlify(videoInfo.description) }} />
          </Title>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(Content);
