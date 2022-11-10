import { memo, useCallback, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import history from '@configs/history';
import { ARTWORKS } from '@configs/constants';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useCategories from '@app/hooks/useCategories';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import Actions from '@screens/Video/Actions';
import { getThumbnail } from '@utils/helpers';
import { Col, Row, Tag, Text } from '@ui-kit';
import { ReactComponent as VideoIcon } from '@svgs/video.svg';
import Author from '../Author';
import LockState from '../LockState';
import { Wrapper } from './styled';

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
  likes,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { user } = useLoggedInUser();
  const { categories } = useCategories();
  const { pathname } = useLocation();
  const { setInfo } = usePresentation();

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
        {isHovering && categoryId && !isLocked && (
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
      <Author
        artworkId={artworkId}
        providerType={providerType}
        providerUserId={providerUserId}
        avatar={avatar}
        username={username}
        likes={likes}
      />
    </>
  );
};

export default memo(Artwork);
