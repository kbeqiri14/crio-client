import { memo, useCallback, useMemo, useState } from 'react';
import history from '@configs/history';
import { useMutation } from '@apollo/client';

import { deleteProduct } from '@app/graphql/mutations/product.mutation';
import { deleteArtwork } from '@app/graphql/mutations/artwork.mutation';
import Confirmation from '@shared/Confirmation';
import { Dropdown, Menu, notification } from '@ui-kit';
import { ReactComponent as SettingsIcon } from '@svgs/settings.svg';

const Actions = (props) => {
  const [visible, setVisible] = useState(false);
  const showConfirmation = useCallback(() => setVisible(true), []);
  const hideConfirmation = useCallback(() => setVisible(false), []);
  const name = useMemo(() => (props.isProduct ? 'product' : 'content'), [props.isProduct]);
  const handleEdit = useCallback(() => history.push(`/edit-${name}`, props), [name, props]);

  const [removeProduct, { loading: removingProduct }] = useMutation(deleteProduct, {
    variables: { productId: props.productId },
    onCompleted: () => {
      hideConfirmation();
      notification.successToast('The product is successfully deleted');
      setTimeout(() => (window.location.href = `/profile/${props.username}`), 1300);
    },
  });

  const [removeArtwork, { loading: removingArtwork }] = useMutation(deleteArtwork, {
    variables: { params: { artworkId: props.artworkId } },
    onCompleted: () => {
      hideConfirmation();
      notification.successToast('The content is successfully deleted');
      setTimeout(() => (window.location.href = `/profile/artworks/${props.username}`), 1300);
    },
  });

  const removing = useMemo(
    () => removingProduct || removingArtwork,
    [removingProduct, removingArtwork],
  );
  const handleRemove = useMemo(
    () => (props.isProduct ? removeProduct : removeArtwork),
    [props.isProduct, removeProduct, removeArtwork],
  );

  const items = useMemo(
    () => [
      {
        label: 'Edit',
        key: 'edit',
        onClick: handleEdit,
      },
      {
        label: 'Delete',
        key: 'delete',
        onClick: showConfirmation,
      },
    ],
    [handleEdit, showConfirmation],
  );

  return (
    <>
      <Dropdown overlay={<Menu items={items} />}>
        <SettingsIcon />
      </Dropdown>
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
