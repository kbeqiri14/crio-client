import { Fragment, memo, useState } from 'react';
import { Col, Row, Upload } from 'antd';

import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import coverImage from '@images/cover-image.png';

const { Dragger } = Upload;

const CoverImage = ({ visible, onClose}) => {
  const [source, setSource] = useState();
  const props = {
    name: 'file',
    accept: 'image/*',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    showUploadList: false,
    openFileDialogOnClick: false,
    listType: 'picture',
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

  return (
    <Dragger {...props}>
      <BlurredModal blurred maskClosable={false} visible={visible} width={686} onCancel={onClose}>
        <Row gutter={[0, 40]} className='cover-image'>
          <Col span={24}>
            <Title inline level='10' color='white'>Upload cover image</Title>
          </Col>
          <Col span={24}>
            <Text inline level='10' color='white'>If skipped we will generate a cover image from video.</Text>
          </Col>
          {
            source
              ? <Col className='uploaded-image'>
                  <img alt='uploaded file' src={source} />
                </Col>
              : (<Fragment>
                  <Col span={24}>
                    <Row justify='center' align='center' gutter={[0, 11]} className='dray-and-drop'>
                      <Col span={24}>
                        <img alt='cover' src={coverImage} />
                      </Col>
                      <Col span={24}>
                        <Text inline level='10' color='white'>Drag and drop an image, or <a href='/'>Upload</a></Text>
                      </Col>
                    </Row>
                  </Col>
                </Fragment>)
          }
          <Col span={24}>
            <ActionButtons cancelText='SKIP' saveText='PUBLISH' disabled={!source} onCancel={onClose} onSave={onClose} />
          </Col>
        </Row>
      </BlurredModal>
    </Dragger>
  );
};

export default memo(CoverImage);
