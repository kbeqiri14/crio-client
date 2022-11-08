import { Upload as antUpload } from 'antd';
import styled from 'styled-components';

const Upload = styled(antUpload)``;

const Dragger = styled(Upload.Dragger)`
  &.ant-upload.ant-upload-drag {
    border-color: rgba(255, 255, 255, 0.5) !important;
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
      .textContainer > div {
        display: flex;
      }
    }
    .ant-upload-drag-container {
      max-width: 330px;
      padding: 20px 10px;
    }
  }
`;

Upload.Dragger = Dragger;

export default Upload;
