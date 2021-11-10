import { memo, useCallback, useState } from 'react';
import { Col, Row, Upload } from 'antd';
import { useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { updateMetadata } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import coverImage from '@images/cover-image.png';

const { Dragger } = Upload;

const CoverImage = ({ visible, artworkId }) => {
  const [source, setSource] = useState();

  const [updateArtwork, { loading: updatingArtwork }] = useMutation(updateMetadata, {
    onCompleted: () => history.push('/account'),
  });
  const onCancel = useCallback(
    () =>
      updateArtwork({
        variables: { params: { artworkId } },
      }),
    [artworkId, updateArtwork],
  );

  const props = {
    name: 'file',
    accept: 'image/*',
    disabled: updatingArtwork,
    showUploadList: false,
    listType: 'picture',
    beforeUpload(file) {
      const getSource = async () => {
        const src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        });
        setSource(src);
      };
      getSource();
    },
  };

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
          {source ? (
            <img alt='uploaded file' src={source} className='uploaded-image' />
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
            onCancel={onCancel}
            onSave={onCancel}
          />
        </Col>
      </Row>
    </BlurredModal>
  );
};

export default memo(CoverImage);
