import { memo, useCallback, useMemo } from 'react';
import { Col, Row, Upload } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { getUploadUrl } from '@app/graphql/queries/artworks.query';
import { deleteArtwork } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import { Spinner } from '@ui-kit/Spinner';
import { errorToast } from '@ui-kit/Notification';
import dragAndDropImage from '@images/drag-and-drop.png';

const { Dragger } = Upload;

const DragAndDrop = ({ videoUri, file, types, dispatch }) => {
  const [requestUploadUrl, { data, loading }] = useLazyQuery(getUploadUrl, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ getUploadUrl }) =>
      dispatch({
        type: types.SET_VIDEO_URI,
        videoUri: getUploadUrl.uri,
        uploadLink: getUploadUrl.upload_link,
      }),
    onError: () => errorToast('Error', 'Something went wrong. Please try later.'),
  });
  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { videoUri } },
  });

  const disabled = useMemo(
    () => !(data?.getUploadUrl?.uri && file?.name && !loading),
    [data?.getUploadUrl?.uri, file?.name, loading],
  );
  const onCancel = useCallback(
    () => (videoUri ? dispatch({ type: types.CONFIRMATION_VISIBLE }) : history.push('/account')),
    [videoUri, dispatch, types.CONFIRMATION_VISIBLE],
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
    beforeUpload: (newFile) => {
      if (file) {
        removeArtwork();
      }
      dispatch({ type: types.SET_FILE, file: newFile });
      requestUploadUrl({ variables: { size: newFile.size } });
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
            <Row justify='center' align='center' gutter={[0, 11]} className='drag-and-drop'>
              <Col span={24}>
                <img alt='drag-and-drop' src={dragAndDropImage} />
              </Col>
              <Col span={24}>
                <Text inline level='10' color='white'>
                  Drag and drop a video
                </Text>
              </Col>
              <Col span={24}>
                <Text inline level='10' color='white'>
                  1920 x 1080 higher recommended. Max 20GB each.
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
