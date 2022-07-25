import { memo, useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { ARTWORKS } from '@configs/constants';
import history from '@configs/history';
import { getThumbnail } from '@utils/helpers';
import { successToast } from '@ui-kit/Notification';
import VideoDetails from './Details';

const Video = () => {
  const { state } = useLocation();

  const source = useMemo(
    () =>
      state.content.startsWith('/videos/')
        ? undefined
        : getThumbnail(ARTWORKS, state.userId, `main-${state.content}`),
    [state?.userId, state?.content],
  );

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

  return <VideoDetails state={state} src={source} onCancel={onCancel} onCompleted={onCompleted} />;
};

export default memo(Video);
