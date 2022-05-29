import { memo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Upload } from 'antd';
import imageCompression from 'browser-image-compression';
import { Spin } from 'antd';

import { Col, Row, Text } from '@ui-kit';
import { ReactComponent as RemoveIcon } from '@svgs/remove.svg';

const { Dragger } = Upload;

const EditProduct = ({ control, image, setImage }) => {
  const [compressing, setCompressing] = useState(false);

  const props = {
    name: 'file',
    accept: 'image/*',
    showUploadList: false,
    listType: 'picture',
    beforeUpload(file) {
      const compression = async () => {
        setCompressing(true);
        const compressionFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1600,
          useWebWorker: true,
        });
        const source = await imageCompression.getDataUrlFromFile(file);
        setImage({ file: compressionFile, src: source });
        setCompressing(false);
      };
      compression();
      return false;
    },
  };

  return image.src ? (
    <div className='cover'>
      <img
        alt='uploaded file'
        src={image.src}
        width={568}
        height={232}
        className='border-radius-8 fit-cover'
      />
      <RemoveIcon className='remove' onClick={() => setImage({})} />
    </div>
  ) : (
    <Controller
      name='image'
      control={control}
      render={({ field }) => (
        <Spin spinning={compressing}>
          <Dragger {...props} {...field}>
            <Row justify='center' align='center' gutter={[0, 20]}>
              <Col span={24}>
                <Text level={4}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  Drag and drop an image, or <a>Upload</a>
                </Text>
              </Col>
              <Col span={24}>
                <Text level={4}>HI-Res images (png, jpg, gif)</Text>
              </Col>
            </Row>
          </Dragger>
        </Spin>
      )}
    />
  );
};

export default memo(EditProduct);
