import { memo, useMemo, useState, Fragment } from 'react';
import { useMutation } from '@apollo/client';

import useAsyncFn from '@app/hooks/useAsyncFn';
import useRedirectToProfile from '@app/hooks/useRedirectToProfile';
import { me } from '@app/graphql/queries/users.query';
import { createProduct, updateProduct } from '@app/graphql/mutations/product.mutation';
import { PRODUCTS } from '@configs/constants';
import ActionButtons from '@shared/ActionButtons';
import { errorToast, successToast } from '@ui-kit/Notification';
import { formItemContent } from '@utils/upload.helper';
import Confirmation from '@shared/Confirmation';

const ProductActionButtons = ({ state, image, disabled, handleSubmit, fillColor = 'blue' }) => {
  const buttonLabel = useMemo(() => (state?.productId ? 'UPDATE' : 'PUBLISH'), [state?.productId]);
  const { userId, redirect } = useRedirectToProfile();
  const [visible, setVisible] = useState(false);

  const [create, { loading: creating }] = useMutation(createProduct, {
    update: (cache, mutationResult) => {
      if (mutationResult.data.createProduct) {
        const existingLoggedInUser = cache.readQuery({ query: me });
        cache.writeQuery({
          query: me,
          data: {
            me: {
              ...existingLoggedInUser?.me,
              productsCount: existingLoggedInUser?.me?.productsCount + 1,
            },
          },
        });
      }
    },
    onCompleted: () => {
      redirect();
      successToast('The product is successfully created');
    },
    onError: () => errorToast('Something went wrong!', 'Please, try again later!'),
  });
  const [update, { loading: updating }] = useMutation(updateProduct, {
    onCompleted: () => {
      redirect();
      successToast('The product info is successfully updated');
    },
    onError: () => errorToast('Something went wrong!', 'Please, try again later!'),
  });

  const onPublish = useAsyncFn(async (attributes) => {
    let file;
    let thumbnail = state?.thumbnail && !image.src ? 'remove-thumbnail' : undefined;
    if (attributes.image?.file || (attributes.file && +attributes.productTypeId === 2)) {
      const content = await formItemContent({
        userId,
        image: image.file,
        file: +attributes.productTypeId === 2 ? attributes.file?.file : undefined,
        type: PRODUCTS,
      });
      thumbnail = content?.image;
      file = content?.file;
    }

    state?.productId
      ? update({
          variables: {
            attributes: {
              id: state.productId,
              productTypeId: attributes.productTypeId,
              title: attributes.title,
              description: attributes.desc,
              price: +attributes.price || undefined,
              limit: +attributes.limit || undefined,
              accessibility: attributes.accessibility,
              thumbnail,
              file,
            },
          },
        })
      : create({
          variables: {
            attributes: {
              productTypeId: attributes.productTypeId,
              title: attributes.title,
              description: attributes.desc,
              price: +attributes.price || undefined,
              limit: +attributes.limit || undefined,
              accessibility: attributes.accessibility,
              thumbnail,
              file,
            },
          },
        });
  });

  return (
    <Fragment>
      <ActionButtons
        fillColor={fillColor}
        saveText={buttonLabel}
        loading={onPublish.loading || creating || updating}
        disabled={disabled}
        onCancel={() => {
          if (!state?.productId) {
            setVisible(true);
            return;
          }
          return disabled ? redirect() : setVisible(true);
        }}
        onSave={handleSubmit(onPublish.call)}
      />
      {visible && (
        <Confirmation
          visible={visible}
          title={
            state?.productId
              ? 'Are you sure you want to discard these changes?'
              : 'Cancel the uploading?'
          }
          cancelText='NO'
          confirmText='YES'
          onConfirm={() => {
            setVisible(false);
            redirect();
          }}
          onCancel={() => setVisible(false)}
        />
      )}
    </Fragment>
  );
};

export default memo(ProductActionButtons);
