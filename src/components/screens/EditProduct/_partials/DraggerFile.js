import { memo, Fragment, useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { PRODUCTS } from '@configs/constants';
import { getThumbnail } from '@utils/helpers';
import { Button, Col, Row, Text, Title, Upload } from '@ui-kit';
import deleteIcon from '@images/delete.png';
import FileDraggerWrapper from '../styled/FileDraggerWrapper';

const { Dragger } = Upload;

const DraggerFile = ({ control, file, userId, files, setFile, setFiles }) => {
  const props = useMemo(
    () => ({
      name: 'file',
      accept: 'file/*',
      listType: 'file',
      showUploadList: false,
      beforeUpload: (file, fileList) => {
        setFiles((files) => [...files, file]);
        return false;
      },
    }),
    [setFiles],
  );

  return (
    <FileDraggerWrapper>
      <Controller
        name='file'
        control={control}
        render={({ field }) => (
          <Fragment>
            {!(file || files.length) && (
              <Dragger {...props} {...field} disabled={files.length > 4}>
                <Title level={2} className='upload-text'>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>Upload</a> your file
                </Title>
              </Dragger>
            )}
            {files.map((file) => (
              <Row className='file-box' key={file.uid}>
                <Col md={22}>
                  <Text level={4} className='file-name'>
                    {file.name}
                  </Text>
                </Col>
                <Col md={2} className='remove-icon'>
                  <Button
                    onClick={() => setFiles((files) => files.filter((f) => f.uid !== file.uid))}
                    type='link'
                  >
                    <img alt='delete' src={deleteIcon} />
                  </Button>
                </Col>
              </Row>
            ))}
            {file && (
              <Row className='file-box'>
                <Col md={22}>
                  <Text level={4} className='file-name'>
                    <a
                      href={getThumbnail(PRODUCTS, userId, `file-${file}`)}
                      target='_blank'
                      download
                      rel='noreferrer'
                    >
                      {file}
                    </a>
                  </Text>
                </Col>
                <Col md={2} className='remove-icon'>
                  <Button onClick={() => setFile()} type='link'>
                    <img alt='delete' src={deleteIcon} />
                  </Button>
                </Col>
              </Row>
            )}
          </Fragment>
        )}
      />
    </FileDraggerWrapper>
  );
};

export default memo(DraggerFile);
