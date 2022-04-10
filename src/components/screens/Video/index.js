import { memo, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import history from '@app/configs/history';
import { successToast } from '@ui-kit/Notification';
import VideoDetails from './Details';

const Video = () => {
  const { state } = useLocation();

  const onCancel = useCallback(() => history.push('/account'), []);
  const onCompleted = () => {
    onCancel();
    successToast('The video info is successfully updated.');
  };

  useEffect(() => {
    if (!state) {
      history.push('/account');
    }
  }, [state]);

  return <VideoDetails state={state} onCancel={onCancel} onCompleted={onCompleted} />;
};

export default memo(Video);
