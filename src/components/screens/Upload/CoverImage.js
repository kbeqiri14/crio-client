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
import coverImage from '@images/cover-image.png';

const { Dragger } = Upload;

const CoverImage = ({ visible, artworkId = 35 }) => {
  const [source, setSource] = useState();
  const [file, setFile] = useState();
  const onCancel = useCallback(() => history.push('/account'), []);
  const [updateArtwork, { loading: updatingArtwork }] = useMutation(updateMetadata, {
    onCompleted: () => history.push('/account')
  });
  const props = {
    name: 'file',
    accept: 'image/*',
    disabled: updatingArtwork,
    showUploadList: false,
    listType: 'picture',
    onDrop: (e) => {
      setFile(e.dataTransfer.files?.[0]);
    },
    beforeUpload(file) {
      const getSource = async () => {
        const src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        });
        setSource(src)
      };
      getSource();
    },
  };
  const [requestUploadUrl, { loading: loadingUploadUrl }] = useLazyQuery(getUploadImageLink, {
    fetchPolicy: 'no-cache',
    variables: { artworkId },
    onCompleted: async ({ getUploadImageLink }) => {
      const { status} = await axios.put(getUploadImageLink.link, file, { headers: { 'Content-Type': 'image/png' } });
      if (status === 200) {
        updateArtwork({
          variables: { params: { artworkId, uri: getUploadImageLink.uri } },
        });
      }
    },
  });

  return (
    <BlurredModal blurred maskClosable={false} visible={visible} width={686} onCancel={onCancel}>
      <Row justify='center'gutter={[0, 40]} className='cover-image'>
        <Col span={24}>
          <Title inline level='10' color='white'>Upload cover image</Title>
        </Col>
        <Col span={24} className='desc'>
          <Text inline level='10' color='white'>If skipped we will generate a cover image from video.</Text>
        </Col>
        <Col span={24}>
          {source
            ? <img alt='uploaded file' src={source} className='uploaded-image' />
            : <Dragger {...props}>
              <Row justify='center' align='center' gutter={[0, 11]} className='drag-and-drop'>
                <Col span={24}>
                  <img alt='cover' src={coverImage} />
                </Col>
                <Col span={24}>
                  <Text inline level='10' color='white'>Drag and drop an image, or <a>Upload</a></Text>
                </Col>
              </Row>
            </Dragger>}
        </Col>
        <Col span={24}>
          <ActionButtons cancelText='SKIP' saveText='PUBLISH' loading={loadingUploadUrl || updatingArtwork} onCancel={onCancel} onSave={requestUploadUrl} />
        </Col>
      </Row>
    </BlurredModal>
  );
};

export default memo(CoverImage);
