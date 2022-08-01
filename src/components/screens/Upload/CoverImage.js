import { memo, useCallback, useState } from 'react';
import axios from 'axios';
import { Col, Row, Upload } from 'antd';
import imageCompression from 'browser-image-compression';
import { useLazyQuery, useMutation } from '@apollo/client';

import { getUploadImageLink } from '@app/graphql/queries/artworks.query';
import { updateMetadata } from '@app/graphql/mutations/artwork.mutation';
import { ARTWORKS } from '@configs/constants';
import ActionButtons from '@shared/ActionButtons';
import { formItemContent } from '@utils/upload.helper';
import { Badge, Modal, Text, Title } from '@ui-kit';
import { errorToast } from '@ui-kit/Notification';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import coverImage from '@images/cover-image.png';

const { Dragger } = Upload;

const CoverImage = ({ visible, userId, artworkId, isImage, goToProfile }) => {
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
      return false;
    },
  };

  const [updateArtwork] = useMutation(updateMetadata, {
    onCompleted: goToProfile,
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
      errorToast('Something went wrong!', 'Please, try again later!');
    },
  });

  const onSave = useCallback(async () => {
    setLoading(true);
    if (isImage) {
      const compressionFile = await imageCompression(image.file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
      const content = await formItemContent({
        userId,
        image: compressionFile,
        type: ARTWORKS,
        prefix: 'thumbnail',
      });
      const thumbnail = content?.image?.split('/')?.slice(-1)[0].slice('thumbnail-'.length);
      updateArtwork({
        variables: { params: { artworkId, thumbnail } },
        onCompleted: () => setLoading(false),
      });
    } else {
      requestUploadUrl();
    }
  }, [isImage, userId, artworkId, image.file, requestUploadUrl, updateArtwork]);

  return (
    <Modal
      centered
      footer={null}
      closeIcon={<CloseIcon />}
      maskClosable={false}
      visible={visible}
      width={733}
      onCancel={goToProfile}
    >
      <Row justify='center' gutter={[0, 40]} className='cover-image'>
        <Col className='textContent' span={24}>
          <Title level={1}>Upload cover image</Title>
        </Col>
        <Col span={24} className='textContent'>
          <Text level={4}>
            {isImage
              ? 'If skipped uploaded image will also be used as the thumbnail.'
              : 'If skipped we will generate a cover image from video.'}
          </Text>
        </Col>
        <Col className='imageContent' span={24}>
          {image.src ? (
            <img alt='uploaded file' src={image.src} className='uploaded-image' />
          ) : (
            <Dragger {...props}>
              <Row justify='center' align='center' gutter={[0, 18]} className='drag-and-drop'>
                <Col span={24}>
                  <img alt='cover' src={coverImage} />
                </Col>
                <Col span={24}>
                  <Text level={4}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    Drag and drop an image, or <a>Upload</a>
                  </Text>
                </Col>
                <Col span={24}>
                  <Badge status='default' text='HI-Res images (png, jpg, gif)' />
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
            onCancel={goToProfile}
            onSave={onSave}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(CoverImage);
