import { memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { likeProduct } from '@app/graphql/mutations/product.mutation';
import { likeArtwork } from '@app/graphql/mutations/artwork.mutation';
import { Col, notification, Row, Text } from '@ui-kit';
import { ReactComponent as LikeIcon } from '@svgs/like-small.svg';
import { ReactComponent as LikedIcon } from '@svgs/liked-small.svg';

const Wrapper = styled('div')`
  div:first-child {
    height: 40px;
  }
  .ant-spin {
    .ant-spin-dot-spin {
      .ant-spin-dot-item {
        background-color: #ec455a;
      }
    }
  }
`;

const Author = ({
  isProduct,
  productId,
  artworkId,
  image,
  userId,
  username,
  likes = 0,
  hide = () => {},
}) => {
  const { user } = useLoggedInUser();
  const avatarUrl = useAvatarUrl(userId, image);
  const [like, { loading, data }] = useMutation(isProduct ? likeProduct : likeArtwork, {
    variables: isProduct ? { productId } : { artworkId },
  });
  const likeOrUnlike = useCallback(() => {
    if (user.id) {
      like();
    } else {
      notification.warningToast('Warning', 'Please sign in to get started.');
    }
  }, [user.id, like]);
  const likesCount = useMemo(() => {
    const count = data?.[isProduct ? 'likeProduct' : 'likeArtwork'];
    return count !== undefined ? count : likes;
  }, [isProduct, data, likes]);
  const liked = useMemo(() => {
    const isLiked = user[isProduct ? 'productLikes' : 'artworkLikes']?.includes(
      `${isProduct ? productId : artworkId}`,
    );
    const count = data?.[isProduct ? 'likeProduct' : 'likeArtwork'];
    return count !== undefined ? count > likes || (isLiked && likes === +count) : isLiked;
  }, [isProduct, productId, artworkId, user, data, likes]);

  return (
    <Wrapper>
      <Row justify='space-between' align='middle' padding_top={8}>
        <Col>
          <Link to={`/profile/${username}`} onClick={hide}>
            <Row gutter={12}>
              <Col>
                <img
                  src={avatarUrl}
                  width={30}
                  height={30}
                  alt='avatar'
                  className='fit-cover border-radius-100'
                />
              </Col>
              <Col>
                <Text level={3} ellipsis={{ tooltip: username }}>
                  {username}
                </Text>
              </Col>
            </Row>
          </Link>
        </Col>
        <Col>
          {loading ? (
            <Spin spinning={true} />
          ) : (
            <Row gutter={5} className='pointer'>
              <Col>
                {liked ? <LikedIcon onClick={likeOrUnlike} /> : <LikeIcon onClick={likeOrUnlike} />}
              </Col>
              <Col>
                <Text level={3}>{likesCount}</Text>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(Author);
