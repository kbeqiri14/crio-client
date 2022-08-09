import { memo, Fragment, useState, useEffect, useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { Button, Col, Row, Text, Title, Upload } from '@ui-kit';
import { errorToast } from '@ui-kit/Notification';
import deleteIcon from '@images/delete.png';
import FileDraggerWrapper from '../styled/FileDraggerWrapper';

const { Dragger } = Upload;

const DraggerFile = ({ control, files, setFiles }) => {
  const [isLimitReached, setIsLimitReached] = useState(false);
  const props = useMemo(
    () => ({
      name: 'file',
      accept: 'file/*',
      listType: 'file',
      showUploadList: false,
      // multiple: true,
      beforeUpload: (file, fileList) => {
        if (fileList.length > 5 || files.length + fileList.length > 5) {
          setIsLimitReached(true);
          return true;
        }
        setFiles((files) => [...files, file]);
        return false;
      },
    }),
    [files.length, setFiles],
  );

  useEffect(() => isLimitReached && errorToast('Maximum uploaded file count: 5'), [isLimitReached]);

  return (
    <FileDraggerWrapper>
      <Controller
        name='file'
        control={control}
        render={({ field }) => (
          <Fragment>
            <Dragger {...props} {...field} disabled={files.length > 4}>
              <Title level={2} className='upload-text'>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>Upload</a> your file
              </Title>
              {/* <Badge status='default' text='Maximum uploaded file count: 5' /> */}
            </Dragger>
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
          </Fragment>
        )}
      />
    </FileDraggerWrapper>
  );
};

export default memo(DraggerFile);
