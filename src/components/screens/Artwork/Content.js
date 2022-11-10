import { memo, useCallback, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';

import { ARTWORKS } from '@configs/constants';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { getProductLikes } from '@app/graphql/queries/products.query';
import { getArtworkLikes } from '@app/graphql/queries/artworks.query';
import { likeProduct } from '@app/graphql/mutations/product.mutation';
import { likeArtwork } from '@app/graphql/mutations/artwork.mutation';
import { getThumbnail, urlify } from '@utils/helpers';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Col, notification, Row, Text, Title } from '@ui-kit'; //notification
import LockState from '@shared/CreatorContent/LockState';
import BuyWidget from '../Product/BuyWidget';
import { loggedInUserLoadingVar } from '@configs/client-cache';
// import { ReactComponent as ShareIcon } from '@svgs/share.svg';
import { ReactComponent as LikeIcon } from '@svgs/like.svg';
import { ReactComponent as LikedIcon } from '@svgs/liked.svg';

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
  .like {
    width: 54px;
    height: 54px;
    position: absolute;
    top: 0;
    right: -85px;
    cursor: pointer;
    text-align: center;
    div:not(.ant-spin) {
      position: absolute;
      top: 25px;
      width: 100%;
    }
    .ant-spin {
      position: absolute;
      top: 17px;
      width: 100%;
      .ant-spin-dot-spin {
        .ant-spin-dot-item {
          background-color: #ec455a;
        }
      }
    }
  }
  @media (max-width: 1200px) {
    .like {
      top: -74px;
      left: 75px;
      text-align: center;
    }
    .bottom-push {
      margin-bottom: 50px;
    }
  }
  @media (max-width: 420px) {
    .flex-dir {
      flex-direction: column-reverse;
    }
    .widget {
      width: 334px;
    }
    .text-content {
      margin-top: 44px;
    }
  }
`;

const ImageWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #182024;
  max-width: 1040px;
  min-height: 538px;
  height: auto;
  @media (min-width: 575px) {
    border-radius: 16px;
  }
  img {
    height: auto;
    max-width: 100%;
    max-height: 538px;
    &.default {
      object-fit: contain;
    }
  }
`;

export const Content = ({ info, content, isLocked }) => {
  const { user } = useLoggedInUser();
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);
  const [loading, setLoading] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(user.id && !user.helpSeen);
  const avatarUrl = useAvatarUrl(info.providerType, info.providerUserId, info.avatar);
  const { setInfo } = usePresentation();

  const [requestProductLikes, { data: productLikes, refetch: refetchProductLikes }] = useLazyQuery(
    getProductLikes,
    {
      variables: {
        productId: info.productId,
      },
      onCompleted: () => setLoading(false),
    },
  );

  const [requestArtworkLikes, { data: artworkLikes, refetch: refetchArtworkLikes }] = useLazyQuery(
    getArtworkLikes,
    {
      variables: {
        artworkId: info.artworkId,
      },
      onCompleted: () => setLoading(false),
    },
  );

  useEffect(() => {
    if (info.isProduct) {
      requestProductLikes();
    } else {
      requestArtworkLikes();
    }
  }, [info.isProduct, requestArtworkLikes, requestProductLikes]);

  const [likeProductMutation] = useMutation(likeProduct, {
    variables: {
      productId: info.productId,
    },
    onCompleted: refetchProductLikes,
  });

  const [likeArtworkMutation] = useMutation(likeArtwork, {
    variables: {
      artworkId: info.artworkId,
    },
    onCompleted: refetchArtworkLikes,
  });

  const likeOrUnlike = useCallback(() => {
    if (user.id) {
      setLoading(true);
      if (info.isProduct) {
        likeProductMutation();
      } else {
        likeArtworkMutation();
      }
    } else {
      notification.warningToast('Warning', 'Please sign in to get started.');
    }
  }, [user.id, info.isProduct, likeProductMutation, likeArtworkMutation]);

  const likes = useMemo(
    () =>
      (info.isProduct ? productLikes?.getProductLikes : artworkLikes?.getArtworkLikes)?.map(
        ({ userId }) => userId,
      ),
    [info.isProduct, productLikes?.getProductLikes, artworkLikes?.getArtworkLikes],
  );

  const showLikes = useMemo(
    () => info.userId === user.id || likes?.includes(+user.id),
    [user.id, info.userId, likes],
  );

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
      {!loggedInUserLoading && (
        <Row justify='center' gutter={[0, 40]}>
          <Col span={24} className='bottom-push'>
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
              {/* <ShareIcon
                className='share'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  notification.infoToast('Copied');
                }}
              /> */}
              <div className='like' onClick={likeOrUnlike}>
                <Spin spinning={loading} />
                {showLikes ? <LikedIcon /> : <LikeIcon />}
                {!loading && showLikes && (
                  <div>
                    <Text level={5} color='like'>
                      {likes?.length}
                    </Text>
                  </div>
                )}
              </div>
            </Col>
          )}
          <Col span={24}>
            <Row className='flex-dir' justify='space-between'>
              <Col
                max_width={info.isProduct ? 722 : undefined}
                className={openTooltip || (user.id && !user.helpSeen) ? 'text-content' : ''}
              >
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
                    categoryId={info.categoryId}
                    file={info.file}
                    price={info.price}
                    limit={info.limit}
                    accessibility={info.accessibility}
                    onOpenChange={(value) => setOpenTooltip(value)}
                  />
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      )}
    </Wrapper>
  );
};

export default memo(Content);
