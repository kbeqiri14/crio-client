import { Spin } from 'antd';
import { Controller } from 'react-hook-form';
import { memo, useState, useMemo } from 'react';
import imageCompression from 'browser-image-compression';

import { Badge, Title, Upload } from '@ui-kit';
const { Dragger } = Upload;

const DraggerImage = ({ control, dispatch, images }) => {
  const [compressing, setCompressing] = useState(false);

  // const disabled = useMemo(() => images.length > 2, [images]);

  const props = useMemo(
    () => ({
      name: 'file',
      accept: 'image/*',
      showUploadList: false,
      listType: 'picture',
      beforeUpload(file) {
        if (images.length > 2) {
          return;
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
    [images, dispatch],
  );

  return (
    <Controller
      name='image'
      control={control}
      render={({ field }) => (
        <>
          <Spin spinning={compressing}>
            <Dragger {...props} {...field} disabled={false} multiple>
              <Title level={2} className='upload-text'>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                Drag and drop an image, or <a disabled={false}>Upload</a>
              </Title>
              <Badge
                status='default'
                text='HI-Res images (png, jpg, gif)'
                className='upload-text'
              />
              <Badge
                status='default'
                text='Maximum uploaded image count: 3'
                className='upload-text'
              />
            </Dragger>
          </Spin>
        </>
      )}
    />
  );
};

export default memo(DraggerImage);
