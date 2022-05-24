import { memo, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import history from '@app/configs/history';
import { successToast } from '@ui-kit/Notification';
import VideoDetails from './Details';

const Video = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      history.push('/artworks');
    }
  }, [state]);

  const onCancel = useCallback(
    () => history.push(`/profile/artworks/${state?.username}`),
    [state?.username],
  );
  const onCompleted = () => {
    onCancel();
    successToast('The video info is successfully updated');
  };

  return <VideoDetails state={state} onCancel={onCancel} onCompleted={onCompleted} />;
};

export default memo(Video);
