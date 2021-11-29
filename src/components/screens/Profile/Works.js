import { memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useQuery } from '@apollo/client';

import history from '@app/configs/history';
import { getUserArtworks } from '@app/graphql/queries/artworks.query';
import { PosterCard } from '@shared/PostersList';
import { Spinner } from '@ui-kit/Spinner';
import { Text } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import emptyArtworks from '@images/empty-artworks.png';

const Works = ({ isProfile, name, isLock }) => {
  const { pathname } = useLocation();
  const [works, setWorks] = useState([]);

  const { loading } = useQuery(getUserArtworks, {
    variables: { id: +pathname.split('/').slice(-1)[0] || undefined },
    onCompleted: ({ getUserArtworks }) => {
      setWorks(getUserArtworks);
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    pollInterval: 30000,
  });

  const upload = useCallback(() => history.push('/upload'), []);

  return (
    <Spinner spinning={loading && !works?.length} color='white'>
      {!loading && !works?.length ? (
        <Row justify='center' gutter={[0, 30]} className='empty-artworks'>
          <Col span={24}>
            <img alt='no artworks' src={emptyArtworks} width={301} height={216} />
          </Col>
          <Col span={24}>
            <Text level={20} color='white'>
              {isProfile ? `${name} hasn’t added an artwork yet` : 'Upload your first artwork'}
            </Text>
          </Col>
          {!isProfile && (
            <Col span={24}>
              <SecondaryButton filled textColor='white' onClick={upload}>
                UPLOAD
              </SecondaryButton>
            </Col>
          )}
        </Row>
      ) : (
        <div className='cr-feed__posters-list cr-landing__video-grid profile-artworks-list'>
          <Row
            style={{ width: '100%' }}
            gutter={[22, 35]}
            justify='start'
            className='cr-landing__video-grid__container'
          >
            {works.map((poster, index) => (
              <Col key={index} xl={6} lg={8} md={12} sm={24} xs={24} className='video-grid__item'>
                <PosterCard {...poster} isLock={index === 0 ? false : isLock} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Spinner>
  );
};

export default memo(Works);
