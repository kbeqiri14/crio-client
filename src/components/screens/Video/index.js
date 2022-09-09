import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ARTWORKS } from '@configs/constants';
import history from '@configs/history';
import Confirmation from '@shared/Confirmation';
import { getThumbnail } from '@utils/helpers';
import { notification } from '@ui-kit';
import VideoDetails from './Details';

const Video = () => {
  const { state } = useLocation();
  const [visible, setVisible] = useState(false);
  const hideConfirmation = useCallback(() => setVisible(false), []);

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
    notification.successToast('The content info is successfully updated');
  };

  return (
    <>
      <VideoDetails
        state={state}
        src={source}
        setVisible={setVisible}
        onCancel={onCancel}
        onCompleted={onCompleted}
      />
      {visible && (
        <Confirmation
          visible={visible}
          title='Are you sure you want to discard these changes?'
          onConfirm={onCancel}
          onCancel={hideConfirmation}
        />
      )}
    </>
  );
};

export default memo(Video);
