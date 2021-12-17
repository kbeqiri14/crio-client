import { memo, useCallback, useMemo } from 'react';
import { Col, Row, Upload } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { getUploadUrl } from '@app/graphql/queries/artworks.query';
import { deleteArtwork } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import { Spinner } from '@ui-kit/Spinner';
import { errorToast, warningToast } from '@ui-kit/Notification';
import dragAndDropImage from '@images/drag-and-drop.png';

const { Dragger } = Upload;

const validateVideo = (file) =>
  new Promise((resolve, reject) => {
    const videoEl = document.createElement('video');
    videoEl.src = window.URL.createObjectURL(file);
    videoEl.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoEl.src);
      const { name, type } = file;
      const { videoWidth, videoHeight } = videoEl;
      resolve({ name, type, videoHeight, videoWidth });
    };
    videoEl.onerror = () => {
      reject(new TypeError('Wrong file type provided'));
    };
  });

const DragAndDrop = ({ videoId, file, types, dispatch }) => {
  const [requestUploadUrl, { data, loading }] = useLazyQuery(getUploadUrl, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ getUploadUrl }) =>
      dispatch({
        type: types.SET_VIDEO_URI,
        videoId: getUploadUrl.uri.substring(getUploadUrl.uri.lastIndexOf('/') + 1),
        uploadLink: getUploadUrl.upload_link,
      }),
    onError: () => errorToast('Something went wrong!', 'Please, try again later!'),
  });
  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { videoId } },
  });

  const disabled = useMemo(
    () => !(data?.getUploadUrl?.uri && file?.name && !loading),
    [data?.getUploadUrl?.uri, file?.name, loading],
  );
  const onCancel = useCallback(
    () => (videoId ? dispatch({ type: types.CONFIRMATION_VISIBLE }) : history.push('/account')),
    [videoId, dispatch, types.CONFIRMATION_VISIBLE],
  );
  const onContinue = useCallback(
    () => dispatch({ type: types.UPLOADING }),
    [types.UPLOADING, dispatch],
  );

  const props = {
    name: 'file',
    accept: 'video/*',
    disabled: loading || removingArtwork,
    showUploadList: false,
    beforeUpload: async (newFile) => {
      if (file) {
        removeArtwork();
      }

      try {
        await validateVideo(newFile);
      } catch (e) {
        warningToast('Validation Failed', 'Please, make sure to choose only a file of video type!');
        return false;
      }
      dispatch({ type: types.SET_FILE, file: newFile });
      requestUploadUrl({ variables: { size: newFile.size } });
      return false;
    },
  };

  return (
    <Row justify='center' gutter={[0, 50]} className='upload'>
      <Col span={24}>
        <Title inline level='10' color='white'>
          Upload your artwork
        </Title>
      </Col>
      <Col span={12}>
        <Dragger {...props}>
          <Spinner spinning={loading} color='white'>
            <Row justify='center' align='center' gutter={[0, 25]} className='drag-and-drop'>
              <Col span={24}>
                <img alt='drag-and-drop' src={dragAndDropImage} />
              </Col>
              <Col span={24}>
                <Text inline level='10' color='white'>
                  Drag and drop a video
                </Text>
              </Col>
              {file?.name && (
                <Col span={24}>
                  <Text inline level='10' color='white'>
                    {file.name}
                  </Text>
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
