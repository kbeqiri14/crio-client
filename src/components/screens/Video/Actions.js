import { memo, useCallback, useMemo, useState } from 'react';
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
  const name = useMemo(() => (props.isProduct ? 'product' : 'artwork'), [props.isProduct]);
  const handleEdit = useCallback(() => history.push(`/edit-${name}`, props), [name, props]);

  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { artworkId: props.artworkId } },
    onCompleted: () => {
      hideConfirmation();
      successToast('The video is successfully deleted');
      window.location.href = `/profile/${props.username}`;
    },
  });
  const removeProduct = useCallback(() => 'The product is successfully deleted', []);
  const removing = useMemo(
    () => (props.isProduct ? removingArtwork : false),
    [props.isProduct, removingArtwork],
  );
  const handleRemove = useMemo(
    () => (props.isProduct ? removeProduct : removeArtwork),
    [props.isProduct, removeArtwork, removeProduct],
  );

  return (
    <>
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
          title={`Delete the ${name}?`}
          cancelText='CANCEL'
          confirmText='DELETE'
          loading={removing}
          onConfirm={handleRemove}
          onCancel={hideConfirmation}
        />
      )}
    </>
  );
};

export default memo(Actions);
