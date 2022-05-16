import { Fragment, memo, useCallback, useState } from 'react';
import history from '@app/configs/history';
import { useMutation } from '@apollo/client';

import { deleteArtwork } from '@app/graphql/mutations/artwork.mutation';
import Confirmation from '@shared/Confirmation';
import { Text } from '@ui-kit';
import { successToast } from '@ui-kit/Notification';
import './styles.less';

const Actions = (props) => {
  const [visible, setVisible] = useState(false);
  const showConfirmation = useCallback(() => setVisible(true), []);
  const hideConfirmation = useCallback(() => setVisible(false), []);
  const handleEdit = useCallback(() => history.push('/video', props), [props]);

  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { artworkId: props.artworkId } },
    onCompleted: () => {
      hideConfirmation();
      successToast('The video is successfully deleted.');
      window.location.href = `/profile/${props.username}`;
    },
  });

  return (
    <Fragment>
      <div className='actions'>
        <div className='action-button'>
          <div className='dot' />
          <div className='dot' />
          <div className='dot' />
        </div>
        <div className='action-content'>
          <Text level={3} onClick={handleEdit}>
            Edit
          </Text>
          <Text level={3} onClick={showConfirmation}>
            Delete
          </Text>
        </div>
      </div>
      {visible && (
        <Confirmation
          visible={visible}
          title='Delete the video?'
          cancelText='CANCEL'
          confirmText='DELETE'
          loading={removingArtwork}
          onConfirm={removeArtwork}
          onCancel={hideConfirmation}
        />
      )}
    </Fragment>
  );
};

export default memo(Actions);
