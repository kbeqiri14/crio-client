import { memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import PostersList from '@app/components/screens/ExplorePage/PostersList';
import { usePresentation } from '@shared/PresentationView/PresentationContext';
import { Col, Row, Text } from '@ui-kit';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  background-color: #202020;
  > div {
    max-width: 1040px;
  }
`;

export const MoreBySection = ({ videoInfo, postersList }) => {
  const { pathname } = useLocation();

  const { setVideoInfo } = usePresentation();
  const hide = useCallback(() => {
    setVideoInfo({});
    window.history.replaceState('', '', pathname);
  }, [pathname, setVideoInfo]);

  return (
    <Wrapper>
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <Row justify='space-between' align='middle'>
            <Col>
              <Text level={2}>More by {videoInfo.name}</Text>
            </Col>
            <Col>
              <Link to={`/profile/${videoInfo.name}`} onClick={hide}>
                <Text level={2} color='primary'>
                  View profile
                </Text>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col>
          <PostersList postersList={postersList} />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(MoreBySection);
