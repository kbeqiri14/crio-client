import { Fragment, memo, useCallback, useMemo, useState } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';

import useAsyncFn from '@app/hooks/useAsyncFn';
import useRedirectToProfile from '@app/hooks/useRedirectToProfile';
import { me } from '@app/graphql/queries/users.query';
import { createProduct, updateProduct } from '@app/graphql/mutations/product.mutation';
import { PRODUCTS } from '@configs/constants';
import ActionButtons from '@shared/ActionButtons';
import { notification } from '@ui-kit';
import { formItemContent } from '@utils/upload.helper';
import Confirmation from '@shared/Confirmation';
import { productTypesVar } from '@configs/client-cache';

const ProductActionButtons = ({
  state,
  image,
  disabled,
  categoryId,
  handleSubmit,
  fillColor = 'blue',
}) => {
  const buttonLabel = useMemo(() => (state?.productId ? 'UPDATE' : 'PUBLISH'), [state?.productId]);
  const { userId, redirect } = useRedirectToProfile();
  const [visible, setVisible] = useState(false);
  const productTypes = useReactiveVar(productTypesVar);

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
      notification.successToast('The product is successfully created');
    },
    onError: () => notification.errorToast('Something went wrong!', 'Please, try again later!'),
  });
  const [update, { loading: updating }] = useMutation(updateProduct, {
    onCompleted: () => {
      redirect();
      notification.successToast('The product info is successfully updated');
    },
    onError: () => notification.errorToast('Something went wrong!', 'Please, try again later!'),
  });

  const onPublish = useAsyncFn(async (attributes) => {
    let file;
    let thumbnail = state?.thumbnail && !image.src ? 'remove-thumbnail' : undefined;
    if (
      attributes.image?.file ||
      (attributes.file && attributes.categoryId === productTypes.digitalId)
    ) {
      const content = await formItemContent({
        userId,
        image: image.file,
        file: attributes.categoryId === productTypes.digitalId ? attributes.file?.file : undefined,
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
              categoryId: attributes.categoryId,
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
              categoryId: attributes.categoryId,
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

  const onCancel = useCallback(() => {
    if (!state?.productId) {
      setVisible(true);
      return;
    }
    return disabled && (!categoryId || (categoryId && categoryId === state?.categoryId))
      ? redirect()
      : setVisible(true);
  }, [disabled, categoryId, state?.productId, state?.categoryId, redirect]);

  return (
    <Fragment>
      <ActionButtons
        fillColor={fillColor}
        saveText={buttonLabel}
        loading={onPublish.loading || creating || updating}
        disabled={disabled}
        onCancel={onCancel}
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
