import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { urlify } from '@utils/helpers';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Col, Row, Text, Title } from '@ui-kit';
import LockState from '@shared/CreatorContent/LockState';
import BuyWidget from '../Product/BuyWidget';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  > div {
    width: 1040px;
  }
  .lock {
    .tooltip {
      opacity: 0;
      visibility: hidden;
      transition: visibility 0s, opacity 0.2s linear;
      top: 190px;
    }
    &:hover {
      .tooltip {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  @media screen and (max-width: 1050px) {
    .flex-dir {
      flex-direction: column-reverse;
    }
    .widget {
      width: 350px;
    }
  }
`;

const ImageWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #182024;
  border-radius: 16px;
  max-width: 1040px;
  max-height: 638px;
  height: auto;
  img {
    width: 100%;
    height: auto;
    max-height: 638px;
    object-fit: cover;
    border-radius: 16px;
    &.default {
      width: 409px;
      height: 309px;
      object-fit: contain;
    }
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
      <Row justify='center' gutter={[0, 20]}>
        <Col span={24}>
          <Row gutter={[0, 12]}>
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
                    <Link to={`/profile/${videoInfo.username}`}>{videoInfo.username}</Link>
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        {isLocked ? (
          <Col span={24}>
            <div className='lock'>
              <LockState
                userId={videoInfo.userId}
                accessibility={videoInfo.accessibility}
                size='lg'
              />
              <ImageWrapper>
                <img
                  src={videoInfo.isProduct ? videoInfo.thumbnail : videoInfo.thumbnailUri}
                  alt='artwork'
                  className={videoInfo.thumbnail?.startsWith('/static/media/') ? 'default' : ''}
                />
              </ImageWrapper>
            </div>
          </Col>
        ) : (
          <Col span={24}>
            {videoInfo.isProduct ? (
              <ImageWrapper>
                <img
                  src={videoInfo.thumbnail}
                  alt='product'
                  className={videoInfo.thumbnail?.startsWith('/static/media/') ? 'default' : ''}
                />
              </ImageWrapper>
            ) : (
              <div className='video-view__player embed-responsive aspect-ratio-16/9'>
                <iframe
                  title={videoInfo.title || 'Crio video player'}
                  src={`https://player.vimeo.com/video/${videoUri}?h=dc77330a55&color=ffffff&title=0&byline=0&portrait=0`}
                  frameBorder='0'
                  allow='autoplay; fullscreen; picture-in-picture'
                  allowFullScreen
                />
              </div>
            )}
          </Col>
        )}
        <Col span={24}>
          <Row className='flex-dir' justify='space-between'>
            <Col max_width={videoInfo.isProduct ? 722 : undefined}>
              <Text level={4} color='dark25'>
                <div
                  dangerouslySetInnerHTML={{ __html: urlify(videoInfo.description) }}
                  style={{ whiteSpace: 'pre-line' }}
                />
              </Text>
            </Col>
            {videoInfo.isProduct && (
              <Col>
                <BuyWidget
                  userId={videoInfo.userId}
                  username={videoInfo.username}
                  productId={videoInfo.productId}
                  price={videoInfo.price}
                  limit={videoInfo.limit}
                  accessibility={videoInfo.accessibility}
                />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(Content);
