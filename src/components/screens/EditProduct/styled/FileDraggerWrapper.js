import styled from 'styled-components';

const FileDraggerWrapper = styled('div')`
  .ant-upload.ant-upload-drag {
    height: 135px;
  }
  .ant-upload {
    .ant-upload-btn {
      padding: 0 !important;
    }
  }
  .file-box {
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: #202020;
    padding: 0 20px;
    border-radius: 8px;
    margin: 20px 0;
    color: white;
    cursor: pointer;
    a {
      color: white;
    }
    :hover {
      color: ${(props) => props.theme.colors.dark50};
      .remove-icon {
        display: block;
        text-align: end;
      }
      .file-name {
        color: ${(props) => props.theme.colors.dark50};
        a {
          color: ${(props) => props.theme.colors.dark50};
        }
      }
    }
    > div {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .remove-icon {
      display: none;
    }
  }
`;
export default FileDraggerWrapper;
