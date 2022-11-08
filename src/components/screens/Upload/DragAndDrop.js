import { memo, useCallback, useMemo } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { getUploadUrl } from '@app/graphql/queries/artworks.query';
import { deleteArtwork } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Badge, Col, notification, Row, Text, Title, Upload } from '@ui-kit';
import { Spinner } from '@ui-kit/Spinner';
import dragAndDropImage from '@images/drag-and-drop.png';

const { Dragger } = Upload;

const DragAndDrop = ({ content, file, types, dispatch, goToProfile }) => {
  const [requestUploadUrl, { data, loading }] = useLazyQuery(getUploadUrl, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ getUploadUrl }) =>
      dispatch({
        type: types.SET_VIDEO_URI,
        content: getUploadUrl.uri,
        uploadLink: getUploadUrl.upload_link,
      }),
    onError: () => notification.errorToast('Something went wrong!', 'Please, try again later!'),
  });
  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { content } },
  });

  const isVideo = useMemo(() => file?.type?.split('/')?.[0] === 'video', [file?.type]);
  const isImage = useMemo(() => file?.type?.split('/')?.[0] === 'image', [file?.type]);

  const disabled = useMemo(
    () => !((isVideo && !loading && data?.getUploadUrl?.uri) || isImage),
    [isVideo, isImage, loading, data?.getUploadUrl?.uri],
  );
  const onCancel = useCallback(
    () => (file ? dispatch({ type: types.CONFIRMATION_VISIBLE }) : goToProfile()),
    [file, goToProfile, dispatch, types.CONFIRMATION_VISIBLE],
  );
  const onContinue = useCallback(async () => {
    if (isImage) {
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });
      dispatch({ type: types.UPLOADED_VIDEO_VISIBLE, src });
    } else {
      dispatch({ type: types.UPLOADING });
    }
  }, [isImage, file, types.UPLOADING, types.UPLOADED_VIDEO_VISIBLE, dispatch]);

  const props = {
    name: 'file',
    accept: 'video/*,image/*',
    disabled: loading || removingArtwork,
    showUploadList: false,
    beforeUpload: async (newFile) => {
      if (file && isVideo) {
        removeArtwork();
      }
      switch (newFile.type.split('/')[0]) {
        case 'image':
          dispatch({ type: types.SET_FILE, file: newFile });
          break;
        case 'video':
          dispatch({ type: types.SET_FILE, file: newFile });
          requestUploadUrl({ variables: { size: newFile.size } });
          break;
        default:
          notification.warningToast(
            'Validation Failed',
            'Please, make sure to choose only a file of image/video type!',
          );
      }
      return false;
    },
  };

  return (
    <Row justify='center' gutter={[0, 50]} padding_top={34} padding_bottom={63}>
      <Col align='center' span={24}>
        <Title level={1}>Upload your content</Title>
      </Col>
      <Col span={24} align='center' padding_left={24} padding_right={24}>
        <Dragger {...props} className='dragger'>
          <Spinner spinning={loading} color='white'>
            <Row justify='center' align='center' gutter={[0, 27]} className='drag-and-drop'>
              <Col span={24} padding_bottom={13}>
                <img alt='drag-and-drop' src={dragAndDropImage} />
              </Col>
              <Col span={24} padding_bottom={13}>
                <Text level={4}>Drag and drop a File</Text>
              </Col>
              <div className='textContainer'>
                <Col span={24}>
                  <Badge
                    status='default'
                    text='1600x1200 or higher recommended. Max 10MB each (20MB for videos)'
                  />
                </Col>
                <Col span={24}>
                  <Badge status='default' text='HI-RES images (png, jpg, gif)' />
                </Col>
                <Col span={24}>
                  <Badge status='default' text='Videos (mp4, 4:3)' />
                </Col>
              </div>
              {file?.name && (
                <Col span={24}>
                  <Text level={4}>{file.name}</Text>
                </Col>
              )}
            </Row>
          </Spinner>
        </Dragger>
      </Col>
      <Col span={24}>
        <ActionButtons
          saveText='CONTINUE'
          disabled={disabled}
          cancelDisabled={loading}
          onCancel={onCancel}
          onSave={onContinue}
        />
      </Col>
    </Row>
  );
};

export default memo(DragAndDrop);
