import { Fragment, memo, useCallback, useState } from 'react';

import history from '@app/configs/history';
import DragAndDrop from './DragAndDrop';
import Uploading from './Uploading';
import VideoInfo from './VideoInfo';
import CoverImage from './CoverImage';
import './styles.less';

const Upload = () => {
  const [percent, setPercent] = useState(0);
  const [remainingTime, setRemainingTime] = useState(100);
  const [state, setState] = useState();
  const [uploadingVisible, setUploadingVisible] = useState(false);
  const [uploadedVideoVisible, setUploadedVideoVisible] = useState(false);
  const [coverImageVisible, setCoverImageVisible] = useState(false);

  const handleCancel = useCallback(() => history.push('/account'), []);
  const handleUploading = useCallback(() => setUploadingVisible(true), []);
  const handleCoverImageUploading = useCallback(() => setCoverImageVisible(true), []);
  const handleClose = useCallback(() => {
    setCoverImageVisible(false);
    handleCancel();
  }, [handleCancel]);

  return (
    <Fragment>
      {!uploadedVideoVisible && <DragAndDrop onCancel={handleCancel} onContinue={handleUploading} />}
      {uploadingVisible && <Uploading
        percent={percent}
        setPercent={setPercent}
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
        visible={uploadingVisible}
        setVisible={setUploadingVisible}
        setUploadedVideoVisible={setUploadedVideoVisible}
      />}
      {uploadedVideoVisible && <VideoInfo onCancel={handleCancel} onContinue={handleCoverImageUploading} />}
      {coverImageVisible && <CoverImage visible={coverImageVisible} onClose={handleClose} />}
    </Fragment>
  );
};

export default memo(Upload);
