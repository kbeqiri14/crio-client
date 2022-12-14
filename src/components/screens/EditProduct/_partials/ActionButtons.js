import { Fragment, memo, useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import { useMutation, useReactiveVar } from '@apollo/client';

import uploader from '@app/configs/uploader';
import useAsyncFn from '@app/hooks/useAsyncFn';
import useRedirectToProfile from '@app/hooks/useRedirectToProfile';
import { me } from '@app/graphql/queries/users.query';
import { createProduct, updateProduct } from '@app/graphql/mutations/product.mutation';
import { PRODUCTS } from '@configs/constants';
import ActionButtons from '@shared/ActionButtons';
import { notification } from '@ui-kit';
import { sign } from '@utils/upload.helper';
import Confirmation from '@shared/Confirmation';
import { categoriesVar } from '@configs/client-cache';

const upload = async (item, userId) => {
  const type = item?.file?.type?.split('/')?.[0];
  if (type === 'image') {
    const name = Date.now().toString();
    console.log(name);
    await uploader.signAndUpload(
      `${userId}/${PRODUCTS}/thumbnail-${name}`,
      item.file.type,
      item.file,
    );
    return name;
  }
};

const ProductActionButtons = ({
  state,
  images,
  disabled,
  categoryId,
  handleSubmit,
  setUploading,
}) => {
  const buttonLabel = useMemo(() => (state?.productId ? 'UPDATE' : 'PUBLISH'), [state?.productId]);
  const { userId, redirect } = useRedirectToProfile();
  const [visible, setVisible] = useState(false);
  const categories = useReactiveVar(categoriesVar);

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
              categories: {
                ...existingLoggedInUser?.me?.categories,
                ...(existingLoggedInUser?.me?.categories?.productCategories?.some(
                  (item) => item === categoryId,
                )
                  ? {}
                  : {
                      productCategories: [
                        ...existingLoggedInUser?.me?.categories?.productCategories,
                        categoryId,
                      ],
                    }),
              },
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

  const timeStarted = new Date();

  const onPublish = useAsyncFn(async (attributes) => {
    let file;
    let thumbnails = images.filter(({ file }) => !file).map(({ fileName }) => fileName);
    // await Promise.allSettled(
    //   images
    //     .filter(({ file }) => file)
    //     .map(async (item) => {
    //       const fileName = await formItemContent({
    //         userId,
    //         image: item.file,
    //         type: PRODUCTS,
    //       });
    //       thumbnails.push(fileName);
    //     }),
    // );

    // await Promise.allSettled(
    //   images
    //     .filter(({ file }) => file)
    //     .map(async (item) => {
    //       const type = item?.file?.type?.split('/')?.[0];
    //       if (type === 'image') {
    //         const name = Date.now();
    //         console.log(name)
    //         await uploader.signAndUpload(`${userId}/${PRODUCTS}/thumbnail-${name}`, item.file.type, item.file);
    //         thumbnails.push(name);
    //       }
    //     }),
    // );
    const uploadImages = images.filter(({ file }) => file);
    if (uploadImages[0]) {
      thumbnails.push(await upload(images[0], userId));
    }
    if (uploadImages[1]) {
      thumbnails.push(await upload(images[1], userId));
    }
    if (uploadImages[2]) {
      thumbnails.push(await upload(images[2], userId));
    }
    if (attributes.file && attributes.categoryId !== categories.commissionId) {
      const { url, signedRequest } = await sign({
        userId,
        file: attributes.file?.file,
        type: PRODUCTS,
        prefix: 'file',
      });
      setUploading({ visible: true });
      await axios.put(signedRequest, attributes.file?.file, {
        headers: {
          'Content-Type': attributes.file?.file?.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          const timeElapsed = new Date() - timeStarted;
          const uploadSpeed = progressEvent.loaded / (timeElapsed / 1000);
          setUploading({
            visible: true,
            percent: percentCompleted,
            remainingTime: (progressEvent.total - progressEvent.loaded) / uploadSpeed,
          });
        },
      });
      file = url?.split('/')?.slice(-1)?.[0]?.slice('file-'.length);
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
              thumbnails,
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
              thumbnails,
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
