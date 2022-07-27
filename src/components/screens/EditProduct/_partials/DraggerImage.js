import { memo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Spin, Upload } from 'antd';
import imageCompression from 'browser-image-compression';
import styled from 'styled-components';

import { Col, Row, Text } from '@ui-kit';
import { ReactComponent as RemoveIcon } from '@svgs/remove.svg';
import ImageDraggerWrapper from '../styled/ImageDraggerWrapper';

const { Dragger } = Upload;

const Dot = styled.span`
  background-color: ${(props) => props.theme.colors.dark25};
  border-radius: 50%;
  display: inline-block;
  height: 4px;
  left: -12px;
  position: relative;
  top: -4px;
  width: 4px;
`;

const DraggerImage = ({ control, image, setImage }) => {
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
    <ImageDraggerWrapper>
      <img alt='cover' src={image.src} />
      <RemoveIcon className='remove' onClick={() => setImage({})} />
    </ImageDraggerWrapper>
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
                <Text level={4} color='dark25'>
                  <Dot />
                  HI-Res images (png, jpg, gif)
                </Text>
              </Col>
            </Row>
          </Dragger>
        </Spin>
      )}
    />
  );
};

export default memo(DraggerImage);
