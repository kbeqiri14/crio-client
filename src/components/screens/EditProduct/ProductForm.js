import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { getConnectAccount } from '@app/graphql/queries/payment-method.query';
import { Checkbox, Col, Input, Radio, Row, Switch, Tabs, Text, Tooltip } from '@ui-kit';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { ReactComponent as CloseIcon } from '@svgs/close-small.svg';
import CoverDragger from './CoverDragger';
import ActionButtons from './ActionButtons';
import HelpTooltip from '@screens/Product/HelpTooltip';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
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
  .info {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.2s linear;
  }
  .price:hover {
    .info {
      opacity: 1;
      visibility: visible;
    }
  }
  .help {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 10px;
    right: 0;
    .ant-tooltip {
      top: 0 !important;
    }
    .got-it-button {
      left: 160px;
      @media (max-width: 1060px) {
        left: -115px;
      }
      margin-top: 58px;
    }
  }
`;

const BroadcastWrapper = styled('div')`
  background: rgba(0, 160, 255, 0.5);
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
  const { data, loading } = useQuery(getConnectAccount, {
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
        <Tabs className='relative'>
          <Tabs.TabPane key='Service' tab='Service'>
            <Row align='center' gutter={[0, 8]}>
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
                      maxLength={1000}
                      autoSize={{ minRows: 3, maxRows: 3 }}
                      placeholder='Write here'
                    />
                  )}
                />
              </Col>
              <Col span={24} align='start'>
                <Text level={3} disabled={isFree || !data?.getConnectAccount?.charges_enabled}>
                  Price*
                </Text>
              </Col>
              <Col xs={19} md={20} padding_bottom={32} className='price'>
                <Controller
                  name='price'
                  control={control}
                  defaultValue={state?.price}
                  rules={{ pattern: /[0-9]/ }}
                  render={({ field }) =>
                    visibleBroadcast ? (
                      <Link to='/payment'>
                        <Tooltip
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode.querySelector('.ant-tooltip-open')
                          }
                          title='Start earning instantly using Crios simple payments platform.'
                        >
                          <div className='relative'>
                            <Input
                              {...field}
                              level={4}
                              maxLength={50}
                              placeholder='$'
                              disabled={isFree || !data?.getConnectAccount?.charges_enabled}
                            />
                          </div>
                        </Tooltip>
                      </Link>
                    ) : (
                      <Input
                        {...field}
                        level={4}
                        maxLength={50}
                        placeholder='$'
                        disabled={isFree || !data?.getConnectAccount?.charges_enabled}
                        onChange={(e) =>
                          field.onChange(isNaN(e.target.value) ? field.value || '' : e.target.value)
                        }
                      />
                    )
                  }
                />
              </Col>
              <Col
                xs={{ offset: 1 }}
                md={{ offset: 0 }}
                span={4}
                padding_bottom={32}
                align='end'
                className='self-center'
              >
                <Controller
                  name='isFree'
                  control={control}
                  defaultValue={isFree}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={isFree}
                      disabled={visibleBroadcast || !data?.getConnectAccount?.charges_enabled}
                      onChange={setFree}
                    >
                      <Text
                        level={3}
                        disabled={visibleBroadcast || !data?.getConnectAccount?.charges_enabled}
                      >
                        Free
                      </Text>
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
              <Col span={24} align='start' padding_bottom={32}>
                <Switch checked={limitVisible} onChange={setLimitation} />
                <Text level={3}> Limit your sales?</Text>
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
                        <Input
                          {...field}
                          level={4}
                          maxLength={50}
                          placeholder='Unlimited'
                          onChange={(e) =>
                            field.onChange(
                              isNaN(e.target.value) ? field.value || '' : e.target.value,
                            )
                          }
                        />
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
          </Tabs.TabPane>
          <div className='help'>
            <HelpTooltip
              placement='right'
              title='After a user makes a purchase, you will receive an automatic email. Please check your email and complete the order'
            />
          </div>
        </Tabs>
      </Wrapper>
    </>
  );
};

export default memo(ProductForm);
