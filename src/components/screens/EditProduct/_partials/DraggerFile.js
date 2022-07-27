import { memo, Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { Upload } from 'antd';
import { Col, Row, Text } from '@ui-kit';
import deleteIcon from '@images/delete.png';
import FileDraggerWrapper from '../styled/FileDraggerWrapper';
const { Dragger } = Upload;

const DraggerFile = ({ control, files, setFiles }) => {
  const props = {
    name: 'file',
    accept: 'file/*',
    listType: 'file',
    showUploadList: false,
    multiple: true,
    beforeUpload: (file) => {
      setFiles((files) => [...files, file]);
      return false;
    },
  };

  return (
    <FileDraggerWrapper>
      <Controller
        name='file'
        control={control}
        render={({ field }) => (
          <Fragment>
            <Dragger {...props} {...field}>
              <Text level={4}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>Upload</a> your files
              </Text>
            </Dragger>
            {files.map((file) => (
              <Row className='file-box' key={file.uid}>
                <Col>
                  <Text level={4} className='file-name'>
                    {file.name}
                  </Text>
                </Col>
                <Col
                  className='remove-icon'
                  onClick={() => setFiles((files) => files.filter((f) => f.uid !== file.uid))}
                >
                  <img alt='delete' src={deleteIcon} />
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
