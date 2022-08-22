import { memo, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';

import { getUploadImageLink } from '@app/graphql/queries/artworks.query';
import { updateMetadata } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Badge, Modal, Text, Title, Upload } from '@ui-kit';
import { errorToast } from '@ui-kit/Notification';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import coverImage from '@images/cover-image.png';

const { Dragger } = Upload;

const Wrapper = styled('div')`
  padding: 0 35px 7px;
  text-align: left;
  .cover-image {
    img {
      min-height: 127px;
      max-width: 184px;
    }
    .drag-and-drop {
      padding: 20px 0;
    }
    .uploaded-image {
      margin: auto;
      max-width: 568px;
      max-height: 259px;
      border-radius: 43px;
    }
    .image-content {
      display: flex;
      justify-content: center;
      padding: 0 68px;
    }
    .text-content {
      margin-right: 55px;
    }
  }
`;

const CoverImage = ({ visible, artworkId, goToProfile }) => {
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

  return (
    <Modal
      centered
      footer={null}
      closeIcon={<CloseIcon />}
      maskClosable={false}
      visible={visible}
      width={713}
      onCancel={goToProfile}
    >
      <Wrapper>
        <Row justify='center' gutter={[0, 40]} className='cover-image'>
          <Col className='text-content' span={24}>
            <Title level={1}>Upload cover image</Title>
          </Col>
          <Col span={24} className='text-content'>
            <Text level={4}>If skipped we will generate a cover image from video.</Text>
          </Col>
          <Col className='image-content' span={24}>
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
              onSave={requestUploadUrl}
            />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  );
};

export default memo(CoverImage);
