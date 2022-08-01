import { memo, useState, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { Spin, Upload } from 'antd';
import imageCompression from 'browser-image-compression';

import { Title, Badge } from '@ui-kit';
import { ReactComponent as RemoveIcon } from '@svgs/remove.svg';
import ImageDraggerWrapper from '../styled/ImageDraggerWrapper';

const { Dragger } = Upload;

const DraggerImage = ({ control, image, setImage }) => {
  const [compressing, setCompressing] = useState(false);
  const props = useMemo(
    () => ({
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
    }),
    [setImage],
  );

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
            <Title level={2}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              Drag and drop an image, or <a>Upload</a>
            </Title>
            <Badge status='default' text='HI-Res images (png, jpg, gif)' />
          </Dragger>
        </Spin>
      )}
    />
  );
};

export default memo(DraggerImage);
