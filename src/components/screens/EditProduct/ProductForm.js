import { memo, useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';

import { getConnectAccount } from '@app/graphql/queries/payment-method.query';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import Broadcast from './_partials/Broadcast';
import FormWrapper from './styled/FormWrapper';

import { Link } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { Checkbox, Input, Radio, Switch, Text, Tooltip, Select, Title, Row, Col } from '@ui-kit';
import DraggerImage from './_partials/DraggerImage';
import DraggerFile from './_partials/DraggerFile';
import ActionButtons from './_partials/ActionButtons';
import HelpTooltip from '@screens/Product/HelpTooltip';
import { getProductTypes } from '@app/graphql/queries/products.query';

const ProductForm = ({ state }) => {
  const [visibleBroadcast, setVisibleBroadcast] = useState(false);
  const [limitVisible, setLimitVisible] = useState(state?.limit !== null && state?.limit >= 0);
  const { data } = useQuery(getProductTypes);
  const [files, setFiles] = useState([]);
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
  const productTypeId = watch('productTypeId');
  const productType = data?.getProductTypes.find((item) => item.id === productTypeId);

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
        <Row justify='center'>
          <Col md={9}>
            <form>
              <Row style={{ position: 'relative' }} align='center' justify='center' gutter={[0, 8]}>
                <Col padding_bottom={32}>
                  <Title level={1}>Add new Digital Product or Service</Title>
                </Col>
                <Col className='help'>
                  <HelpTooltip
                    placement='right'
                    title='After a user makes a purchase, you will receive an automatic email. Please check your email and complete the order'
                  />
                </Col>
                <Col span={22} padding_bottom={32}>
                  <Controller
                    name='productTypeId'
                    control={control}
                    defaultValue={state?.productTypeId}
                    render={({ field }) => (
                      <Select
                        {...field}
                        bordered={false}
                        size='large'
                        placeholder='Select the type of your product'
                        options={data?.getProductTypes.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                      />
                    )}
                  />
                </Col>
                <Col span={22} align='start'>
                  <Text level={3} padding_bottom={8}>
                    Title*
                  </Text>
                </Col>
                <Col span={22} padding_bottom={32}>
                  <Controller
                    name='title'
                    control={control}
                    defaultValue={state?.title}
                    render={({ field }) => (
                      <Input {...field} level={4} maxLength={100} placeholder='Write here' />
                    )}
                  />
                </Col>
                <Col span={22} align='start'>
                  <Text level={3}>Description</Text>
                </Col>
                <Col span={22} padding_bottom={32}>
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
                <Col span={22} align='start'>
                  <Text level={3} disabled={isFree}>
                    Price*
                  </Text>
                </Col>
                <Col xs={19} md={18} padding_bottom={32} className='price'>
                  <Controller
                    name='price'
                    control={control}
                    defaultValue={state?.price}
                    render={({ field }) =>
                      visibleBroadcast ? (
                        <Link to='/payment'>
                          <Tooltip
                            getPopupContainer={(triggerNode) =>
                              triggerNode.parentNode.querySelector('.ant-tooltip-open')
                            }
                            title="Start earning instantly using Crio's simple payments platform."
                          >
                            <div className='relative'>
                              <Input
                                {...field}
                                level={4}
                                pattern='[0-9]*'
                                maxLength={50}
                                placeholder='$'
                                disabled={isFree}
                              />
                            </div>
                          </Tooltip>
                        </Link>
                      ) : (
                        <Input
                          {...field}
                          level={4}
                          pattern='[0-9]*'
                          maxLength={50}
                          placeholder='$'
                          disabled={isFree}
                          onChange={(e) =>
                            field.onChange(
                              isNaN(e.target.value) ? field.value || '' : e.target.value,
                            )
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
                        disabled={visibleBroadcast}
                        onChange={setFree}
                      >
                        <Text level={3} disabled={visibleBroadcast}>
                          Free
                        </Text>
                      </Checkbox>
                    )}
                  />
                </Col>
                <Col span={22} align='start'>
                  <Text level={3}>Thumbnail</Text>
                </Col>
                <Col span={22} padding_bottom={32}>
                  <DraggerImage control={control} image={image} setImage={setImage} />
                </Col>
                {productType?.name === 'Digital Product' && (
                  <Fragment>
                    <Col span={22} align='start'>
                      <Text level={3}>Product File*</Text>
                    </Col>
                    <Col span={22} padding_bottom={6}>
                      <DraggerFile
                        control={control}
                        file={state?.file}
                        userId={state?.userId}
                        files={files}
                        setFiles={setFiles}
                      />
                    </Col>
                  </Fragment>
                )}
                <Col span={22} align='start'>
                  <Text level={3} disabled={isFree}>
                    Who can see this?
                  </Text>
                </Col>
                <Col span={22} padding_bottom={32} align='start'>
                  <Controller
                    name='accessibility'
                    control={control}
                    defaultValue={state?.accessibility || 'subscriber_only'}
                    render={({ field }) => (
                      <Radio.Group
                        value={
                          isFree ? 'subscriber_only' : state?.accessibility || 'subscriber_only'
                        }
                        {...field}
                        disabled={isFree}
                      >
                        <Radio value='subscriber_only'>Subscriber Only</Radio>
                        <Radio value='everyone'>Everyone</Radio>
                      </Radio.Group>
                    )}
                  />
                </Col>
                <Col span={22} align='start' padding_bottom={32} className='limit-section'>
                  <Switch checked={limitVisible} onChange={setLimitation} />
                  <Text level={3}>Limit your sales?</Text>
                </Col>
                {limitVisible && (
                  <>
                    <Col span={22} align='start'>
                      <Text level={3}>Maximum numbers of purchases</Text>
                    </Col>
                    <Col span={22} padding_bottom={32}>
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
                <Col span={22}>
                  <ActionButtons
                    state={state}
                    image={image}
                    disabled={disabled}
                    handleSubmit={handleSubmit}
                  />
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </FormWrapper>
    </>
  );
};

export default memo(ProductForm);
