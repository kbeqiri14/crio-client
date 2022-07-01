import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { signIn } from '@app/auth';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Button, Col, Row, Text, Title } from '@ui-kit';
import { ReactComponent as GoogleIcon } from '@svgs/google-sign-in.svg';

const Wrapper = styled('div')`
  .absolute-center {
    position: absolute;
    left: 140px;
    top: 50%;
    transform: translateY(-50%);
    @media (max-width: 767.98px) {
      left: 10px;
    }
  }
  .absolute-bottom {
    position: absolute;
    bottom: 20px;
    right: 40px;
  }
  .darken-background {
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 103.09%);
  }

  @media (max-width: 767.98px) {
    .absolute-center {
      padding: 0 15px;
      top: 40%;
    }
    .absolute-bottom {
      bottom: 50px;
      left: 30px;
    }
    .title {
      font-size: 35px !important;
    }
  }
`;

const TopArtwork = ({ username, thumbnail }) => {
  const { user } = useLoggedInUser();
  const googleSignIn = useCallback(() => signIn('Google'), []);

  return (
    <Wrapper>
      <div className='darken-background' />
      <Row gutter={[0, 12]} className='absolute-center'>
        <Col span={24}>
          <Title level={3} className='title'>
            Crio: The Creative Marketplace
          </Title>
        </Col>
        <Col span={24}>
          <Text level={4} max_width={555}>
            Shop thousands of products and see the best artwork from the entire community of
            creators on Crio
          </Text>
        </Col>
        <Col xs={0} lg={24}>
          <Link to={`/profile/${username}`}>
            <Button type='primary' size='large'>
              VISIT FEATURED CREATOR
            </Button>
          </Link>
        </Col>
        {user.id && (
          <Col lg={0}>
            <Button type='google' icon={<GoogleIcon />} onClick={googleSignIn}>
              SIGN UP WITH GOOGLE
            </Button>
          </Col>
        )}
      </Row>
      <Text level={3} className='absolute-bottom'>
        Artwork by {username}
      </Text>
      <img alt='artwork' height={380} width='100%' className='fit-cover' src={thumbnail} />
    </Wrapper>
  );
};

export default memo(TopArtwork);
