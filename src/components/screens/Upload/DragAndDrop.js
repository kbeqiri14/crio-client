import { memo, useState } from 'react';
import { Col, Row, Upload } from 'antd';

import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import { ReactComponent as DragAndDropIcon } from '@svgs/drag-and-drop.svg';

const { Dragger } = Upload;

const DragAndDrop = ({ onCancel, onContinue }) => {
  const [fileName, setFileName] = useState();
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    showUploadList: false,
    openFileDialogOnClick: false,
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

  return (
    <Dragger {...props}>
      <Row gutter={[0, 50]} className='upload'>
        <Col span={24}>
          <Title inline level='10' color='white'>Upload your artwork</Title>
        </Col>
        <Col span={12} offset={6}>
          <Row justify='center' align='center' gutter={[0, 11]} className='dray-and-drop'>
            <Col span={24}>
              <DragAndDropIcon />
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
        </Col>
        <Col span={24}>
          <ActionButtons saveText='CONTINUE' onCancel={onCancel} onSave={onContinue} />
        </Col>
      </Row>
    </Dragger>
  );
};

export default memo(DragAndDrop);
