import { memo, useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Spin } from 'antd';
import imageCompression from 'browser-image-compression';

import { Badge, Col, notification, Row, Title, Upload } from '@ui-kit';
const { Dragger } = Upload;

const DraggerImage = ({ filesCount, control, dispatch }) => {
  const [visible, setVisible] = useState(false);
  const [compressing, setCompressing] = useState(false);

  useEffect(() => {
    if (visible) {
      notification.errorToast(`You can't upload more then 3 thumbnail`);
      setVisible(false);
    }
  }, [visible]);

  const props = useMemo(
    () => ({
      name: 'file',
      accept: 'image/*',
      multiple: true,
      showUploadList: false,
      listType: 'picture',
      beforeUpload(file, fileList) {
        if (filesCount > 3 || filesCount + fileList.length > 3) {
          setVisible(true);
          return false;
        }
        const compression = async () => {
          setCompressing(true);
          const compressionFile = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1600,
            useWebWorker: true,
          });
          const source = await imageCompression.getDataUrlFromFile(file);
          dispatch({ type: 'ADD_IMAGE', payload: { file: compressionFile, src: source } });
          setCompressing(false);
        };
        compression();
        return false;
      },
    }),
    [filesCount, dispatch],
  );

  return (
    <Controller
      name='images'
      control={control}
      render={({ field }) => (
        <>
          <Spin spinning={compressing}>
            <Dragger {...props} {...field}>
              <Row justify='center' gutter={[0, 20]}>
                <Col>
                  <Title level={2}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    Drag and drop an image, or <a>Upload</a>
                  </Title>
                </Col>
                <Col>
                  <Badge status='default' text='HI-Res images (png, jpg, gif)' />
                </Col>
                <Col>
                  <Badge status='default' text='Maximum uploaded image count: 3' />
                </Col>
              </Row>
            </Dragger>
          </Spin>
        </>
      )}
    />
  );
};

export default memo(DraggerImage);
