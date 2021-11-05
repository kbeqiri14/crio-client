import { memo, useCallback, useState } from 'react';
import { Col, Row, Upload } from 'antd';
import { useLazyQuery } from '@apollo/client';

import history from '@app/configs/history';
import { getUploadUrl } from '@app/graphql/queries/artworks.query';
import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import dragAndDropImage from '@images/drag-and-drop.png';

const { Dragger } = Upload;

const DragAndDrop = ({ types, dispatch }) => {
  const [fileName, setFileName] = useState();
  const [requestUploadUrl, { data, loading }] = useLazyQuery(getUploadUrl, {
    onCompleted: ({ uri }) => dispatch({ type: types.SET_VIDEO_URI, videoUri: uri }),
  });
  const onCancel = useCallback(() => history.push('/account'), []);
  const onContinue = useCallback(() => dispatch({ type: types.UPLOADING }), [types, dispatch]);

  const props = {
    name: 'file',
    action: data?.upload_link,
    showUploadList: false,
    onDrop(e) {
      setFileName(e.dataTransfer.files?.[0]?.name);
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
            {fileName && <Col span={24}>
              <Text inline level='10' color='white'>{fileName}</Text>
            </Col>}
          </Row>
        </Dragger>
      </Col>
      <Col span={24}>
        <ActionButtons saveText='CONTINUE' disabled={!(fileName && !loading)} onCancel={onCancel} onSave={onContinue} />
      </Col>
    </Row>

  );
};

export default memo(DragAndDrop);
