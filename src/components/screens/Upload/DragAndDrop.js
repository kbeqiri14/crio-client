import { memo, useCallback, useMemo } from 'react';
import { Col, Row, Upload } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';

import { getUploadUrl } from '@app/graphql/queries/artworks.query';
import { deleteArtwork } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit';
import { Spinner } from '@ui-kit/Spinner';
import { errorToast, warningToast } from '@ui-kit/Notification';
import dragAndDropImage from '@images/drag-and-drop.png';

const { Dragger } = Upload;

const DragAndDrop = ({ videoUri, file, types, dispatch, goToProfile }) => {
  const [requestUploadUrl, { data, loading }] = useLazyQuery(getUploadUrl, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ getUploadUrl }) =>
      dispatch({
        type: types.SET_VIDEO_URI,
        videoUri: getUploadUrl.uri,
        uploadLink: getUploadUrl.upload_link,
      }),
    onError: () => errorToast('Something went wrong!', 'Please, try again later!'),
  });
  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { videoUri } },
  });

  const isVideo = useMemo(() => file?.type?.split('/')?.[0] === 'video', [file?.type]);
  const isImage = useMemo(() => file?.type?.split('/')?.[0] === 'image', [file?.type]);

  const disabled = useMemo(
    () => !(isVideo && !loading && data?.getUploadUrl?.uri) || !isImage,
    [isVideo, isImage, loading, data?.getUploadUrl?.uri],
  );
  const onCancel = useCallback(
    () => (videoUri ? dispatch({ type: types.CONFIRMATION_VISIBLE }) : goToProfile()),
    [videoUri, goToProfile, dispatch, types.CONFIRMATION_VISIBLE],
  );
  const onContinue = useCallback(
    () => dispatch({ type: types.UPLOADING }),
    [types.UPLOADING, dispatch],
  );

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
          warningToast(
            'Validation Failed',
            'Please, make sure to choose only a file of image/video type!',
          );
      }
      return false;
    },
  };

  return (
    <Row justify='center' gutter={[0, 50]} className='upload'>
      <Col span={24}>
        <Title level={1}>Upload your artwork</Title>
      </Col>
      <Col span={12}>
        <Dragger {...props}>
          <Spinner spinning={loading} color='white'>
            <Row justify='center' align='center' gutter={[0, 25]} className='drag-and-drop'>
              <Col span={24}>
                <img alt='drag-and-drop' src={dragAndDropImage} />
              </Col>
              <Col span={24}>
                <Text level={4}>Drag and drop a video</Text>
              </Col>
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
