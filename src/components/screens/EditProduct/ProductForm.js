import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';

import { getConnectAccount } from '@app/graphql/queries/payment-method.query';
import { Tabs } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import HelpTooltip from '@screens/Product/HelpTooltip';
import Broadcast from './_partials/Broadcast';
import FormWrapper from './styled/FormWrapper';
import Form from './_partials/Form';

const ProductForm = ({ state }) => {
  const [visibleBroadcast, setVisibleBroadcast] = useState(false);
  const [limitVisible, setLimitVisible] = useState(state?.limit !== null && state?.limit >= 0);
  const [image, setImage] = useState(
    state?.thumbnail && !state?.thumbnail?.startsWith('/static/media/product')
      ? { src: state.thumbnail }
      : {},
  );
  const hideBroadcast = useCallback(() => setVisibleBroadcast(false), []);
  const { loading } = useQuery(getConnectAccount, {
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ getConnectAccount }) => {
      const chargesEnabled = getConnectAccount?.charges_enabled;
      setVisibleBroadcast(!chargesEnabled);
      if (!chargesEnabled) {
        setValue('isFree', true);
      }
    },
  });

  const { control, watch, setValue, handleSubmit } = useForm();
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

  useEffect(
    () => setValue('isFree', state?.productId && !state?.price),
    [state?.productId, state?.price, setValue],
  );

  const setLimitation = useCallback(() => {
    setLimitVisible(!limitVisible);
    setValue('limit', undefined);
  }, [limitVisible, setValue]);

  const setFree = useCallback(
    (e) => {
      setValue('price', undefined);
      setValue('accessibility', 'subscriber_only');
      setValue('isFree', e.target.checked);
    },
    [setValue],
  );

  if (loading) {
    return <GlobalSpinner />;
  }

  return (
    <>
      {visibleBroadcast && <Broadcast hideBroadcast={hideBroadcast} />}
      <FormWrapper>
        <Tabs className='relative'>
          <Tabs.TabPane key='product' tab='Product'>
            <Form
              isProduct={true}
              control={control}
              state={state}
              isFree={isFree}
              visibleBroadcast={visibleBroadcast}
              setFree={setFree}
              image={image}
              setImage={setImage}
              limitVisible={limitVisible}
              disabled={disabled}
              setLimitation={setLimitation}
              handleSubmit={handleSubmit}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key='service' tab='Service'>
            <Form
              isProduct={false}
              control={control}
              state={state}
              isFree={isFree}
              visibleBroadcast={visibleBroadcast}
              setFree={setFree}
              image={image}
              setImage={setImage}
              limitVisible={limitVisible}
              disabled={disabled}
              setLimitation={setLimitation}
              handleSubmit={handleSubmit}
            />
          </Tabs.TabPane>
          <div className='help'>
            <HelpTooltip
              placement='right'
              title='After a user makes a purchase, you will receive an automatic email. Please check your email and complete the order'
            />
          </div>
        </Tabs>
      </FormWrapper>
    </>
  );
};

export default memo(ProductForm);
