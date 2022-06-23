import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { getConnectAccount } from '@app/graphql/queries/payment-method.query';
import { Checkbox, Col, Input, Radio, Row, Switch, Text, Title } from '@ui-kit';
import { ReactComponent as CloseIcon } from '@svgs/close-small.svg';
import CoverDragger from './CoverDragger';
import ActionButtons from './ActionButtons';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 0;
  > div {
    max-width: 568px;
  }
  .ant-upload {
    .ant-upload-btn {
      padding: 78px 0;
    }
    &.ant-upload-drag {
      border-radius: 8px;
    }
  }
`;

const BroadcastWrapper = styled('div')`
  background: #00a0ff;
  opacity: 0.5;
  padding: 13px 36px;
  a {
    color: white;
    text-decoration: underline;
    :hover {
      color: white;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const ProductForm = ({ state }) => {
  const [visibleBroadcast, setVisibleBroadcast] = useState(false);
  const [limitVisible, setLimitVisible] = useState(state?.limit !== null && state?.limit >= 0);
  const [image, setImage] = useState(
    state?.thumbnail && !state?.thumbnail?.startsWith('/static/media/product')
      ? { src: state.thumbnail }
      : {},
  );
  const hideBroadcast = useCallback(() => setVisibleBroadcast(false), []);
  useQuery(getConnectAccount, {
    onCompleted: ({ getConnectAccount }) => {
      setVisibleBroadcast(!getConnectAccount?.charges_enabled);
      setValue('isFree', true);
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

  return (
    <>
      {visibleBroadcast && (
        <BroadcastWrapper>
          <Text level='2' color='white'>
            Start earning instantly using Crio's simple payments platform.{' '}
            <Link to='/payment'>Onboard your Stripe account</Link> now.
          </Text>
          <CloseIcon className='vertical-middle float-right' onClick={hideBroadcast} />
        </BroadcastWrapper>
      )}
      <Wrapper>
        <Row align='center' gutter={[0, 8]}>
          <Col span={24} padding_bottom={32}>
            <Title level={1} align='center'>
              {state?.productId
                ? 'Update Digital Product or Service'
                : 'Add New Digital Product or Service'}
            </Title>
          </Col>
          <Col span={24} align='start'>
            <Text level={3} padding_bottom={8}>
              Title*
            </Text>
          </Col>
          <Col span={24} padding_bottom={32}>
            <Controller
              name='title'
              control={control}
              defaultValue={state?.title}
              render={({ field }) => (
                <Input {...field} level={4} maxLength={100} placeholder='Write here' />
              )}
            />
          </Col>
          <Col span={24} align='start'>
            <Text level={3}>Description</Text>
          </Col>
          <Col span={24} padding_bottom={32}>
            <Controller
              name='desc'
              control={control}
              defaultValue={state?.description}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  level={3}
                  maxLength={500}
                  autoSize={{ minRows: 3, maxRows: 3 }}
                  placeholder='Write here'
                />
              )}
            />
          </Col>
          <Col span={24} align='start'>
            <Text level={3} disabled={isFree}>
              Price*
            </Text>
          </Col>
          <Col span={20} padding_bottom={32}>
            <Controller
              name='price'
              control={control}
              defaultValue={state?.price}
              render={({ field }) => (
                <Input
                  {...field}
                  level={4}
                  pattern='[0-9]*'
                  maxLength={50}
                  placeholder='$'
                  disabled={isFree}
                />
              )}
            />
          </Col>
          <Col offset={1} span={3} padding_bottom={32} className='self-center'>
            <Controller
              name='isFree'
              control={control}
              defaultValue={isFree}
              render={({ field }) => (
                <Checkbox {...field} checked={isFree} onChange={setFree}>
                  <Text level={3}>Free</Text>
                </Checkbox>
              )}
            />
          </Col>
          <Col span={24} align='start'>
            <Text level={3}>Thumbnail</Text>
          </Col>
          <Col span={24} padding_bottom={32}>
            <CoverDragger control={control} image={image} setImage={setImage} />
          </Col>
          <Col span={24} align='start'>
            <Text level={3} disabled={isFree}>
              Who can see this?
            </Text>
          </Col>
          <Col span={24} padding_bottom={32} align='start'>
            <Controller
              name='accessibility'
              control={control}
              defaultValue={state?.accessibility || 'subscriber_only'}
              render={({ field }) => (
                <Radio.Group
                  value={isFree ? 'subscriber_only' : state?.accessibility || 'subscriber_only'}
                  {...field}
                  disabled={isFree}
                >
                  <Radio value='subscriber_only'>Subscriber Only</Radio>
                  <Radio value='everyone'>Everyone</Radio>
                </Radio.Group>
              )}
            />
          </Col>
          <Col span={24} align='start'>
            <Text level={3}>Limit your sales?</Text>
          </Col>
          <Col span={24} padding_bottom={32} align='start'>
            <Switch checked={limitVisible} onChange={setLimitation} />
          </Col>
          {limitVisible && (
            <>
              <Col span={24} align='start'>
                <Text level={3}>Maximum numbers of purchases</Text>
              </Col>
              <Col span={24} padding_bottom={32}>
                <Controller
                  name='limit'
                  control={control}
                  defaultValue={state?.limit}
                  render={({ field }) => (
                    <Input {...field} level={4} maxLength={50} placeholder='Unlimited' />
                  )}
                />
              </Col>
            </>
          )}
          <Col span={24}>
            <ActionButtons
              state={state}
              image={image}
              disabled={disabled}
              handleSubmit={handleSubmit}
            />
          </Col>
        </Row>
      </Wrapper>
    </>
  );
};

export default memo(ProductForm);
