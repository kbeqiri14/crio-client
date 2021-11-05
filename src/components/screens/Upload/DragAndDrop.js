import { memo, useCallback, useState } from 'react';
import { Col, Row, Upload } from 'antd';

import history from '@app/configs/history';
import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import dragAndDropImage from '@images/drag-and-drop.png';

const { Dragger } = Upload;

const DragAndDrop = ({ types, dispatch }) => {
  const [fileName, setFileName] = useState();
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    showUploadList: false,
    onDrop(e) {
      setFileName(e.dataTransfer.files?.[0]?.name);
    },
    beforeUpload(file) {
      const getSource = async () => {
        const src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        });
        console.log(src)
      };
      getSource();
    },
  };
  const onCancel = useCallback(() => history.push('/account'), []);
  const onContinue = useCallback(() => dispatch({ type: types.UPLOADING }), [types, dispatch]);

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
        <ActionButtons saveText='CONTINUE' disabled={!fileName} onCancel={onCancel} onSave={onContinue} />
      </Col>
    </Row>

  );
};

export default memo(DragAndDrop);
