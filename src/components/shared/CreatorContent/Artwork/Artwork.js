import { memo, useCallback, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import history from '@configs/history';
import { ARTWORKS } from '@configs/constants';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import Actions from '@screens/Video/Actions';
import { getThumbnail } from '@utils/helpers';
import { Col, Row, Tag, Text } from '@ui-kit';
import { ReactComponent as VideoIcon } from '@svgs/video.svg';
import LockState from '../LockState';
import { Wrapper } from './styled';
import useCategories from '@app/hooks/useCategories';

const Artwork = ({
  providerType,
  providerUserId,
  avatar,
  userId,
  username,
  artworkId,
  categoryId,
  title,
  description,
  content,
  thumbnail,
  accessibility,
  status,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { user } = useLoggedInUser();
  const { categories } = useCategories('content');
  const { pathname } = useLocation();
  const { setInfo } = usePresentation();
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);

  const handleMouseOver = useCallback(() => setIsHovering(true), []);
  const handleMouseOut = useCallback(() => setIsHovering(false), []);

  const isVideo = useMemo(() => content.startsWith('/videos/'), [content]);
  const source = useMemo(
    () =>
      isVideo
        ? thumbnail
        : getThumbnail(
            ARTWORKS,
            userId,
            `${thumbnail === content ? 'main' : 'thumbnail'}-${thumbnail}`,
          ),
    [isVideo, userId, thumbnail, content],
  );

  const showActions = useMemo(() => {
    const username = pathname.split('/').slice(-1)[0];
    return username === user.username;
  }, [user.username, pathname]);

  const isLocked = useMemo(() => {
    if (user.isCreator || accessibility === 'everyone') {
      return false;
    }
    return user.isSubscribed ? !user.followings?.includes(userId) : true;
  }, [user.isCreator, user.isSubscribed, user.followings, accessibility, userId]);

  const showArtwork = useCallback(() => {
    if (pathname.includes('/artwork/')) {
      history.push(`/artwork/${artworkId}`);
      return;
    }
    window.history.replaceState('', '', `/artwork/${artworkId}`);
    setInfo({
      title,
      description,
      id: content?.substring(content?.lastIndexOf('/') + 1),
      artworkId,
      categoryId,
      userId,
      providerType,
      providerUserId,
      username,
      avatar,
      content,
      thumbnail,
      isImage: !content.startsWith('/videos/'),
    });
  }, [
    providerType,
    providerUserId,
    avatar,
    userId,
    username,
    artworkId,
    categoryId,
    title,
    description,
    content,
    thumbnail,
    pathname,
    setInfo,
  ]);

  return (
    <>
      <Wrapper
        className={isLocked ? 'is-locked' : ''}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        <LockState userId={userId} accessibility={accessibility} status={status} />
        {isVideo && <VideoIcon className='video' />}
        <img src={source} alt='artwork' width={330} height={330} onClick={showArtwork} />
        {isHovering && !isLocked && categoryId && (
          <Tag>{categories.contents.find(({ id }) => id === categoryId)?.name}</Tag>
        )}
        <div className={`info ${isHovering ? 'hover' : ''}`}>
          <Row justify='space-between'>
            <Col span={showActions ? 19 : 24}>
              <Text level={4} ellipsis={{ rows: 1, tooltip: title }}>
                {title}
              </Text>
            </Col>
            {showActions && (
              <Col span={3}>
                <Actions
                  userId={userId}
                  username={username}
                  artworkId={artworkId}
                  categoryId={categoryId}
                  content={content}
                  title={title}
                  description={description}
                  accessibility={accessibility}
                />
              </Col>
            )}
          </Row>
        </div>
      </Wrapper>
      <Link to={`/profile/${username}`}>
        <Row gutter={12} align='middle' padding_top={8}>
          <Col>
            <img
              src={avatarUrl}
              width={30}
              height={30}
              alt='avatar'
              className='border-radius-100'
            />
          </Col>
          <Col max_width={309}>
            <Text level={3} ellipsis={{ tooltip: username }}>
              {username}
            </Text>
          </Col>
        </Row>
      </Link>
    </>
  );
};

export default memo(Artwork);
