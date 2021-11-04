import { Fragment, memo, useCallback, useState } from 'react';
import { Col, Row, Upload } from 'antd';

import history from '@app/configs/history';
import ActionButtons from '@shared/ActionButtons';
import { Text, Title } from '@ui-kit/Text';
import { BlurredModal } from '@ui-kit/Modal';
import coverImage from '@images/cover-image.png';

const { Dragger } = Upload;

const CoverImage = ({ visible }) => {
  const [source, setSource] = useState();
  const onCancel = useCallback(() => history.push('/account'), []);

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
      <BlurredModal blurred maskClosable={false} visible={visible} width={686} onCancel={onCancel}>
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
                    <Row justify='center' align='center' gutter={[0, 11]} className='drag-and-drop'>
                      <Col span={24}>
                        <img alt='cover' src={coverImage} />
                      </Col>
                      <Col span={24}>
                        <Text inline level='10' color='white'>Drag and drop an image, or <a>Upload</a></Text>
                      </Col>
                    </Row>
                  </Col>
                </Fragment>)
          }
          <Col span={24}>
            <ActionButtons cancelText='SKIP' saveText='PUBLISH' disabled={!source} onCancel={onCancel} onSave={onCancel} />
          </Col>
        </Row>
      </BlurredModal>
    </Dragger>
  );
};

export default memo(CoverImage);
