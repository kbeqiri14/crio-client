import { memo, useCallback, useState } from 'react';
import axios from 'axios';
import { Col, Row, Upload } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { getUploadImageLink } from '@app/graphql/queries/artworks.query';
import { updateMetadata } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import { errorToast } from '@ui-kit/Notification';
import coverImage from '@images/cover-image.png';

const { Dragger } = Upload;

const CoverImage = ({ visible, artworkId }) => {
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const props = {
    name: 'file',
    accept: 'image/*',
    showUploadList: false,
    listType: 'picture',
    beforeUpload(file) {
      const getSource = async () => {
        const src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        });
        setImage({ file, src });
      };
      getSource();
    },
  };

  const [updateArtwork] = useMutation(updateMetadata, {
    onCompleted: () => history.push('/account'),
  });
  const [requestUploadUrl] = useLazyQuery(getUploadImageLink, {
    fetchPolicy: 'no-cache',
    variables: { artworkId },
    onCompleted: async ({ getUploadImageLink }) => {
      const { status } = await axios.put(getUploadImageLink.link, image.file, {
        headers: { 'Content-Type': 'image/png' },
      });
      if (status === 200) {
        updateArtwork({
          variables: { params: { artworkId, uri: getUploadImageLink.uri } },
          onCompleted: () => setLoading(false),
        });
      }
    },
    onError: () => {
      setLoading(false);
      errorToast('Uploading Image Error', 'Something went wrong. Please try later.');
    },
  });

  const onCancel = useCallback(() => history.push('/account'), []);
  const onSave = useCallback(() => {
    setLoading(true);
    requestUploadUrl();
  }, [requestUploadUrl]);

  return (
    <BlurredModal blurred maskClosable={false} visible={visible} width={686} onCancel={onCancel}>
      <Row justify='center' gutter={[0, 40]} className='cover-image'>
        <Col span={24}>
          <Title inline level='10' color='white'>
            Upload cover image
          </Title>
        </Col>
        <Col span={24} className='desc'>
          <Text inline level='10' color='white'>
            If skipped we will generate a cover image from video.
          </Text>
        </Col>
        <Col span={24}>
          {image.src ? (
            <img alt='uploaded file' src={image.src} className='uploaded-image' />
          ) : (
            <Dragger {...props}>
              <Row justify='center' align='center' gutter={[0, 11]} className='drag-and-drop'>
                <Col span={24}>
                  <img alt='cover' src={coverImage} />
                </Col>
                <Col span={24}>
                  <Text inline level='10' color='white'>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    Drag and drop an image, or <a>Upload</a>
                  </Text>
                </Col>
              </Row>
            </Dragger>
          )}
        </Col>
        <Col span={24}>
          <ActionButtons
            cancelText='SKIP'
            saveText='PUBLISH'
            loading={loading}
            disabled={!image.file}
            onCancel={onCancel}
            onSave={onSave}
          />
        </Col>
      </Row>
    </BlurredModal>
  );
};

export default memo(CoverImage);
