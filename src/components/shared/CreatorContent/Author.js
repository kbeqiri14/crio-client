import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import useAvatarUrl from '@app/hooks/useAvatarUrl';
import { likeProduct } from '@app/graphql/mutations/product.mutation';
import { likeArtwork } from '@app/graphql/mutations/artwork.mutation';
import { Col, Row, Text } from '@ui-kit';
import { ReactComponent as LikeIcon } from '@svgs/like-small.svg';
import { ReactComponent as LikedIcon } from '@svgs/liked-small.svg';

const Wrapper = styled('div')`
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
  providerType,
  providerUserId,
  avatar,
  username,
  liked,
  likes = 0,
  hide = () => {},
}) => {
  const avatarUrl = useAvatarUrl(providerType, providerUserId, avatar);
  const [like, { loading, data }] = useMutation(isProduct ? likeProduct : likeArtwork, {
    variables: isProduct ? { productId } : { artworkId },
  });
  const likesCount = useMemo(
    () => data?.[isProduct ? 'likeProduct' : 'likeArtwork'] || likes,
    [isProduct, data, likes],
  );
  const isLiked = useMemo(() => {
    const count = data?.[isProduct ? 'likeProduct' : 'likeArtwork'];
    return count ? count > likes || (liked && likes === +count) : liked;
  }, [isProduct, data, likes, liked]);

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
                  className='border-radius-100'
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
            <Row gutter={5}>
              <Col>{isLiked ? <LikedIcon onClick={like} /> : <LikeIcon onClick={like} />}</Col>
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
