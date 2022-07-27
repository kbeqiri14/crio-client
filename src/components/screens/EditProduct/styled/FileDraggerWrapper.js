import styled from 'styled-components';

const FileDraggerWrapper = styled('div')`
  .file-box {
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: #202020;
    padding: 0 20px;
    border-radius: 8px;
    margin: 20px 0;
    color: red !important;
    cursor: pointer;
    :hover {
      .remove-icon {
        display: block;
      }
      .file-name {
        color: #878C94;
      }
    }
  .remove-icon {
    display: none;
  }
}
`
export default FileDraggerWrapper;
