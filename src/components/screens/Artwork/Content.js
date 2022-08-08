import { memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ARTWORKS } from '@configs/constants';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { getThumbnail, urlify } from '@utils/helpers';
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
    padding: 0 10px;
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
  @media screen and (max-width: 420px) {
    .flex-dir {
      flex-direction: column-reverse;
    }
    .widget {
      width: 334px;
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
  max-height: 538px;
  height: auto;
  img {
    width: 100%;
    height: auto;
    max-height: 538px;
    object-fit: cover;
    border-radius: 16px;
    &.default {
      object-fit: contain;
    }
  }
`;

export const Content = ({ info, content, isLocked }) => {
  const avatarUrl = useAvatarUrl(info.providerType, info.providerUserId, info.avatar);
  const { setInfo } = usePresentation();

  const source = useMemo(
    () =>
      info.isProduct || info.content?.startsWith('/videos/')
        ? info.thumbnail
        : getThumbnail(ARTWORKS, info.userId, `main-${info.content}`),
    [info.isProduct, info.userId, info.content, info.thumbnail],
  );

  const hide = useCallback(() => setInfo({}), [setInfo]);

  return (
    <Wrapper>
      <Row justify='center' gutter={[0, 40]}>
        <Col span={24}>
          <Row gutter={[0, 12]}>
            <Col span={24}>
              <Title level={1}>{info.title}</Title>
            </Col>
            <Col span={24}>
              <Row align='middle'>
                <Col>
                  {info.providerUserId && (
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
                    <Link to={`/profile/${info.username}`}>{info.username}</Link>
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        {isLocked && !info.isProduct ? (
          <Col span={24}>
            <div className='lock'>
              <LockState userId={info.userId} accessibility={info.accessibility} size='lg' />
              <ImageWrapper>
                <img
                  src={source}
                  alt='artwork'
                  className={info.content?.startsWith('/static/media/') ? 'default' : ''}
                />
              </ImageWrapper>
            </div>
          </Col>
        ) : (
          <Col span={24}>
            {info.isProduct || info.isImage ? (
              <ImageWrapper>
                <img
                  src={source}
                  alt='product'
                  className={info.thumbnail?.startsWith('/static/media/') ? 'default' : ''}
                />
              </ImageWrapper>
            ) : (
              <div className='video-view__player embed-responsive aspect-ratio-16/9'>
                <iframe
                  title={info.title || 'Crio video player'}
                  src={`https://player.vimeo.com/video/${content}?h=dc77330a55&color=ffffff&title=0&byline=0&portrait=0`}
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
            <Col max_width={info.isProduct ? 722 : undefined}>
              <Text level={4} color='dark25'>
                <div
                  dangerouslySetInnerHTML={{ __html: urlify(info.description) }}
                  style={{ whiteSpace: 'pre-line' }}
                />
              </Text>
            </Col>
            {info.isProduct && (
              <Col>
                <BuyWidget
                  userId={info.userId}
                  productId={info.productId}
                  price={info.price}
                  limit={info.limit}
                  accessibility={info.accessibility}
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
