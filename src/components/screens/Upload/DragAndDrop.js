import { memo, useCallback, useMemo, useState } from 'react';
import { Col, Row, Upload } from 'antd';
import { useLazyQuery } from '@apollo/client';

import history from '@app/configs/history';
import { getUploadUrl } from '@app/graphql/queries/artworks.query';
import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import { Spinner } from '@ui-kit/Spinner';
import { errorToast } from '@ui-kit/Notification';
import dragAndDropImage from '@images/drag-and-drop.png';

const { Dragger } = Upload;

const DragAndDrop = ({ types, dispatch }) => {
  const [file, setFile] = useState();
  const [requestUploadUrl, { data, loading }] = useLazyQuery(getUploadUrl, {
    onCompleted: ({ getUploadUrl }) => dispatch({
      type: types.SET_VIDEO_URI,
      videoUri: getUploadUrl.uri,
      uploadLink: getUploadUrl.upload_link,
    }),
    onError: () => errorToast('Error', 'Something went wrong. Please try later.'),
  });

  const disabled = useMemo(() => !(data?.getUploadUrl?.uri && file?.name && !loading), [
    data?.getUploadUrl?.uri, file?.name, loading,
  ]);
  const onCancel = useCallback(() => history.push('/account'), []);
  const onContinue = useCallback(() => dispatch({ type: types.UPLOADING, file }), [file, types.UPLOADING, dispatch]);

  const props = {
    name: 'file',
    disabled: loading,
    showUploadList: false,
    onDrop: (e) => {
      setFile(e.dataTransfer.files?.[0]);
      requestUploadUrl({
        variables: { size: e.dataTransfer.files?.[0]?.size },
      });
    },
  };

  return (
    <Row justify='center'gutter={[0, 50]} className='upload'>
      <Col span={24}>
        <Title inline level='10' color='white'>Upload your artwork</Title>
      </Col>
      <Col span={12}>
        <Spinner spinning={loading} color='white'>
          <Dragger {...props}>
            <Row justify='center' align='center' gutter={[0, 11]} className='drag-and-drop'>
              <Col span={24}>
                <img alt='drag-and-drop' src={dragAndDropImage} />
              </Col>
              <Col span={24}>
                <Text inline level='10' color='white'>Drag and drop a video</Text>
              </Col>
              <Col span={24}>
                <Text inline level='10' color='white'>1920 x 1080 higher recommended. Max 20GB each.</Text>
              </Col>
              {file?.name && <Col span={24}>
                <Text inline level='10' color='white'>{file.name}</Text>
              </Col>}
            </Row>
          </Dragger>
        </Spinner>
      </Col>
      <Col span={24}>
        <ActionButtons saveText='CONTINUE' disabled={disabled} onCancel={onCancel} onSave={onContinue} />
      </Col>
    </Row>

  );
};

export default memo(DragAndDrop);
