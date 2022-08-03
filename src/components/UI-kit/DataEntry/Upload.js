import { Upload as antUpload } from 'antd';
import styled from 'styled-components';

const Upload = styled(antUpload)`
  .ant-upload:hover,
  .ant-upload.ant-upload-drag.ant-upload-drag-hover {
    /* border-color: @white_50 !important; */
  }
`;

const Dragger = styled(Upload.Dragger)`
  &.ant-upload.ant-upload-drag {
    /* border-color: @white_50; */
    border-radius: 43px;
    background: none !important;
    min-width: 280px;
    padding: 0 30px;
  }
  &.dragger {
    max-width: 922px;
    min-width: 338px;
    margin: auto;

    img {
      min-height: 200px;
      max-width: 270px;
    }
    .drag-and-drop {
      padding: 58px 0 71px;
    }
    .ant-upload-drag-container {
      max-width: 330px;
      padding: 20px 10px;
    }
    .less-than-sign {
      padding-bottom: 3px;
    }
  }
`;

Upload.Dragger = Dragger;

export default Upload;
