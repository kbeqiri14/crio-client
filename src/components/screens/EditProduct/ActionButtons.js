import { memo, useMemo } from 'react';
import { useMutation } from '@apollo/client';

import useAsyncFn from '@app/hooks/useAsyncFn';
import useRedirectToProfile from '@app/hooks/useRedirectToProfile';
import { me } from '@app/graphql/queries/users.query';
import { createProduct, updateProduct } from '@app/graphql/mutations/product.mutation';
import ActionButtons from '@shared/ActionButtons';
import { errorToast, successToast } from '@ui-kit/Notification';
import { formItemContent } from '@utils/upload.helper';

const ProductActionButtons = ({ state, image, limitVisible, watch, handleSubmit }) => {
  const buttonLabel = useMemo(() => (state?.productId ? 'UPDATE' : 'PUBLISH'), [state?.productId]);
  const { userId, redirect } = useRedirectToProfile();

  const title = watch('title');
  const description = watch('desc');
  const price = watch('price');
  const isFree = watch('isFree');
  const limit = watch('limit');
  const accessibility = watch('accessibility');

  const disabled = useMemo(
    () =>
      !(
        title?.trim() &&
        (+price > 0 || isFree) &&
        (!limitVisible || (limitVisible && +limit > 0)) &&
        ((title?.trim() && title?.trim() !== state?.title) ||
          (description?.trim() && description?.trim() !== state?.description) ||
          (description?.trim() === '' && !!state?.description) ||
          (price && +price !== +state?.price) ||
          (!price && isFree && state?.price > 0) ||
          (limitVisible && limit && +limit !== state?.limit) ||
          !!limitVisible !== !!state?.limit ||
          accessibility !== state?.accessibility ||
          image?.file ||
          (image.src !== state?.thumbnail &&
            !state?.thumbnail?.startsWith('/static/media/product')))
      ),
    [
      title,
      description,
      price,
      isFree,
      limit,
      accessibility,
      limitVisible,
      image?.file,
      image.src,
      state?.title,
      state?.description,
      state?.price,
      state?.limit,
      state?.accessibility,
      state?.thumbnail,
    ],
  );

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
    let thumbnail = state?.thumbnail && !image.src ? 'remove-thumbnail' : undefined;
    if (attributes.image?.file) {
      const content = await formItemContent({ userId, image: image.file });
      thumbnail = content?.image?.split('/')?.slice(-1)[0].slice('thumbnail-'.length);
    }

    state?.productId
      ? update({
          variables: {
            attributes: {
              id: state.productId,
              type: 'service',
              title: attributes.title,
              description: attributes.desc,
              price: +attributes.price || undefined,
              limit: +attributes.limit || undefined,
              accessibility: attributes.accessibility,
              thumbnail,
            },
          },
        })
      : create({
          variables: {
            attributes: {
              type: 'service',
              title: attributes.title,
              description: attributes.desc,
              price: +attributes.price || undefined,
              limit: +attributes.limit || undefined,
              accessibility: attributes.accessibility,
              thumbnail,
            },
          },
        });
  });

  return (
    <ActionButtons
      saveText={buttonLabel}
      loading={onPublish.loading || creating || updating}
      disabled={disabled}
      onCancel={redirect}
      onSave={handleSubmit(onPublish.call)}
    />
  );
};

export default memo(ProductActionButtons);
