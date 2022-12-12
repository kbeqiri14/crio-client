import { Spin, Image } from 'antd';
import { Link } from 'react-router-dom';
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import { memo, useCallback, useState, useMemo, useEffect, useRef } from 'react';

import { ARTWORKS, PRODUCTS } from '@configs/constants';
import { loggedInUserLoadingVar } from '@configs/client-cache';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { getProductLikes } from '@app/graphql/queries/products.query';
import { getArtworkLikes } from '@app/graphql/queries/artworks.query';
import { likeProduct } from '@app/graphql/mutations/product.mutation';
import { likeArtwork } from '@app/graphql/mutations/artwork.mutation';
import { getThumbnail, urlify } from '@utils/helpers';
import { Carousel, Col, notification, Row, Text, Title } from '@ui-kit';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import LockState from '@shared/CreatorContent/LockState';
import BuyWidget from '@screens/Product/BuyWidget';
import product from '@images/product.png';
// import { ReactComponent as ShareIcon } from '@svgs/share.svg';
import { ReactComponent as LikeIcon } from '@svgs/like.svg';
import { ReactComponent as LikedIcon } from '@svgs/liked.svg';
import { ReactComponent as ArrowRight } from '@svgs/arrow-right.svg';
import { ReactComponent as ArrowLeft } from '@svgs/arrow-left.svg';
import Wrapper from './styled/Wrapper';
import ImageWrapper from './styled/ImageWrapper';

export const Content = ({ info, content, isLocked }) => {
  const { user } = useLoggedInUser();
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);
  const [liked, setLiked] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(user.id && !user.helpSeen);
  const avatarUrl = useAvatarUrl(info.providerType, info.providerUserId, info.avatar);
  const { setInfo } = usePresentation();
  const slider = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [requestProductLikes, { loading: loadingProductLikes, data: productLikes }] = useLazyQuery(
    getProductLikes,
    {
      fetchPolicy: 'no-cache',
      variables: {
        productId: info.productId,
      },
      onCompleted: ({ getProductLikes }) =>
        setLiked(getProductLikes.some(({ userId }) => userId === +user.id)),
    },
  );

  const [requestArtworkLikes, { loading: loadingArtworkLikes, data: artworkLikes }] = useLazyQuery(
    getArtworkLikes,
    {
      fetchPolicy: 'no-cache',
      variables: {
        artworkId: info.artworkId,
      },
      onCompleted: ({ getArtworkLikes }) =>
        setLiked(getArtworkLikes.some(({ userId }) => userId === +user.id)),
    },
  );

  useEffect(() => {
    info.isProduct ? requestProductLikes() : requestArtworkLikes();
  }, [info.isProduct, requestArtworkLikes, requestProductLikes]);

  const [likeProductMutation, { loading: likingProduct, data: productLikesCount }] = useMutation(
    likeProduct,
    {
      variables: {
        productId: info.productId,
      },
      onCompleted: () => setLiked(!liked),
    },
  );

  const [likeArtworkMutation, { loading: likingArtwork, data: artworkLikesCount }] = useMutation(
    likeArtwork,
    {
      variables: {
        artworkId: info.artworkId,
      },
      onCompleted: () => setLiked(!liked),
    },
  );
  const likeOrUnlike = useCallback(() => {
    if (user.id) {
      info.isProduct ? likeProductMutation() : likeArtworkMutation();
    } else {
      notification.warningToast('Warning', 'Please sign in to get started.');
    }
  }, [user.id, info.isProduct, likeProductMutation, likeArtworkMutation]);

  const loading = useMemo(
    () => likingProduct || likingArtwork || loadingProductLikes || loadingArtworkLikes,
    [likingProduct, likingArtwork, loadingProductLikes, loadingArtworkLikes],
  );
  const likes = useMemo(
    () =>
      (info.isProduct ? productLikes?.getProductLikes : artworkLikes?.getArtworkLikes)?.map(
        ({ userId }) => userId,
      ),
    [info.isProduct, productLikes?.getProductLikes, artworkLikes?.getArtworkLikes],
  );
  const likesCount = useMemo(() => {
    const count = info.isProduct ? productLikesCount?.likeProduct : artworkLikesCount?.likeArtwork;
    return count !== undefined ? count : likes?.length;
  }, [
    info.isProduct,
    productLikesCount?.likeProduct,
    artworkLikesCount?.likeArtwork,
    likes?.length,
  ]);
  const showLikes = useMemo(() => info.userId === user.id || liked, [user.id, info.userId, liked]);

  // const source = useMemo(
  //   () =>
  //     info.isProduct || info.content?.startsWith('/videos/')
  //       ? info.thumbnail
  //       : getThumbnail(ARTWORKS, info.userId, `main-${info.content}`),
  //   [info.isProduct, info.userId, info.content, info.thumbnail],
  // );
  const source = useMemo(() => {
    if (info.content?.startsWith('/videos/')) {
      return info.thumbnail;
    }
    if (info.isProduct) {
      return info.thumbnails?.[0]
        ? getThumbnail(PRODUCTS, info.userId, `thumbnail-${info.thumbnails?.[0]}`)
        : product;
    }
    return getThumbnail(ARTWORKS, info.userId, `main-${info.content}`);
  }, [info.content, info.isProduct, info.userId, info.thumbnail, info.thumbnails]);

  const sources = useMemo(() => {
    if (info.content?.startsWith('/videos/')) {
      console.log(info?.thumbnail, 'thumbnail__');
      return info.thumbnail;
    }
    if (info.isProduct) {
      return info.thumbnails?.length > 1
        ? info.thumbnails.map((item) => getThumbnail(PRODUCTS, info.userId, `thumbnail-${item}`))
        : info.thumbnails?.length
        ? [getThumbnail(PRODUCTS, info.userId, `thumbnail-${info.thumbnails[0]}`)]
        : [product];
    }
    return getThumbnail(ARTWORKS, info.userId, `main-${info.content}`);
  }, [info.content, info.isProduct, info.userId, info.thumbnail, info.thumbnails]);

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
                    src={sources[0]}
                    alt='artwork'
                    className={info.content?.startsWith('/static/media/') ? 'default' : ''}
                  />
                </ImageWrapper>
              </div>
            </Col>
          ) : (
            <Col span={24}>
              {info.isProduct && sources.length > 1 ? (
                <div style={{ position: 'relative' }}>
                  {currentSlide !== 0 && (
                    <ArrowLeft
                      onClick={() => {
                        slider.current.prev();
                        setCurrentSlide((prev) => --prev);
                      }}
                      className='arrow-left'
                    />
                  )}
                  {currentSlide !== sources.length - 1 && (
                    <ArrowRight
                      onClick={() => {
                        slider.current.next();
                        setCurrentSlide((prev) => ++prev);
                      }}
                      className='arrow-right'
                    />
                  )}
                  <Carousel ref={slider} autoplay={false} dots={false}>
                    {sources.map((source, index) => (
                      <ImageWrapper key={index}>
                        <Image preview={false} src={source} alt='product' />
                      </ImageWrapper>
                    ))}
                  </Carousel>
                </div>
              ) : info.isProduct || info.isImage ? (
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
              {!loadingProductLikes && !loadingArtworkLikes && (
                <div className='like' onClick={likeOrUnlike}>
                  <Spin spinning={loading} />
                  {showLikes ? <LikedIcon /> : <LikeIcon />}
                  {!loading && showLikes && (
                    <div>
                      <Text level={5} color='like'>
                        {likesCount}
                      </Text>
                    </div>
                  )}
                </div>
              )}
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
