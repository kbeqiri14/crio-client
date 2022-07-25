import { memo, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@configs/history';
import { ARTWORKS } from '@configs/constants';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import Actions from '@screens/Video/Actions';
import { getThumbnail } from '@utils/helpers';
import { Col, Row, Text } from '@ui-kit';
import { ReactComponent as VideoIcon } from '@svgs/video.svg';
import LockState from '../LockState';

const Wrapper = styled('div')`
  width: 332px;
  height: 332px;
  border: 1px solid ${(props) => props.theme.colors.dark50};
  box-sizing: border-box;
  border-radius: 30px;
  cursor: pointer;
  img {
    border-radius: 30px;
    object-fit: cover;
  }
  .video {
    position: absolute;
    top: 20px;
    right: 35px;
  }
  .info {
    position: absolute;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 103.09%);
    bottom: 39px;
    padding: 26px 20px;
    width: 330px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.4s linear;
  }
  .tooltip {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.2s linear;
  }
  &:hover {
    .tooltip {
      opacity: 1;
      visibility: visible;
    }
  }
  &:hover:not(.is-locked) {
    .info,
    .tooltip {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Artwork = ({
  providerType,
  providerUserId,
  avatar,
  userId,
  username,
  artworkId,
  title,
  description,
  content,
  thumbnail,
  accessibility,
  status,
}) => {
  const { user } = useLoggedInUser();
  const { pathname } = useLocation();
  const { setInfo } = usePresentation();
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);

  const isVideo = useMemo(() => content.startsWith('/videos/'), [content]);
  const source = useMemo(
    () => (isVideo ? thumbnail : getThumbnail(ARTWORKS, userId, `main-${thumbnail}`)),
    [isVideo, userId, thumbnail],
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
    title,
    description,
    content,
    thumbnail,
    pathname,
    setInfo,
  ]);

  return (
    <>
      <Wrapper className={isLocked ? 'is-locked' : ''}>
        <div className='info'>
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
                  content={content}
                  title={title}
                  description={description}
                  accessibility={accessibility}
                />
              </Col>
            )}
          </Row>
        </div>
        <LockState userId={userId} accessibility={accessibility} status={status} />
        {isVideo && <VideoIcon className='video' />}
        <img src={source} alt='artwork' width={330} height={330} onClick={showArtwork} />
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
