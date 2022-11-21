import { memo, useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useCategories from '@app/hooks/useCategories';
import { getConnectAccount } from '@app/graphql/queries/payment-method.query';
import { ReactComponent as ArrowIcon } from '@svgs/arrow.svg';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import {
  Badge,
  Checkbox,
  Input,
  GlobalSpinner,
  Modal,
  Progress,
  Radio,
  Switch,
  Text,
  Title,
  Tooltip,
  TreeSelect,
  Row,
  Col,
} from '@ui-kit';
import { Spinner } from '@ui-kit/Spinner';
import HelpTooltip from '@screens/Product/HelpTooltip';
import DraggerImage from './_partials/DraggerImage';
import DraggerFile from './_partials/DraggerFile';
import ActionButtons from './_partials/ActionButtons';
import Broadcast from './_partials/Broadcast';
import FormWrapper from './styled/FormWrapper';

const ProductForm = ({ state }) => {
  const { user } = useLoggedInUser();
  const { categories } = useCategories('product');
  const [openTooltip, setOpenTooltip] = useState(user.id && !user.helpSeen);
  const [visibleBroadcast, setVisibleBroadcast] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [limitVisible, setLimitVisible] = useState(state?.limit !== null && state?.limit >= 0);
  const [file, setFile] = useState(state?.file);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(
    state?.thumbnail && !state?.thumbnail?.startsWith('/static/media/product')
      ? { src: state.thumbnail }
      : {},
  );
  const hideBroadcast = useCallback(() => setVisibleBroadcast(false), []);
  const { data: stripeAccount, loading } = useQuery(getConnectAccount, {
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ getConnectAccount }) => {
      const chargesEnabled = getConnectAccount?.charges_enabled;
      setVisibleBroadcast(!chargesEnabled);
      if (!chargesEnabled) {
        setValue('isFree', true);
      }
    },
  });

  const formatRemainingTime = (time) => {
    if (!time) {
      return;
    }
    let formattedTime = Math.round(time);
    let timeUnit = 'seconds';
    if (time > 60) {
      let minutes = Math.round(time / 60);
      const hours = Math.round(minutes / 60);
      minutes = minutes - hours * 60;
      formattedTime = hours ? `${hours} hour ${minutes < 0 ? 0 : minutes}` : minutes;
      timeUnit = 'minutes';
    }
    return `${formattedTime} ${timeUnit} left`;
  };

  const { control, watch, setValue, handleSubmit } = useForm();
  const title = watch('title');
  const description = watch('desc');
  const price = watch('price');
  const isFree = watch('isFree');
  const limit = watch('limit');
  const accessibility = watch('accessibility');
  const categoryId = watch('categoryId');
  const isDigitalProduct = useMemo(
    () =>
      categories.products.find((item) => item.id === (categoryId || state?.categoryId))
        ?.mainCategoryId === categories.digitalId,
    [categories.products, categories.digitalId, categoryId, state?.categoryId],
  );

  const disabled = useMemo(
    () =>
      !(
        title?.trim() &&
        (categoryId || state?.categoryId) &&
        (+price > 0 || isFree) &&
        (!limitVisible || (limitVisible && +limit > 0)) &&
        !(isDigitalProduct && !(files.length || file)) &&
        ((categoryId && categoryId !== state?.categoryId) ||
          (title?.trim() && title?.trim() !== state?.title) ||
          (state?.file && file !== state?.file) ||
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
      state?.file,
      state?.categoryId,
      categoryId,
      isDigitalProduct,
      file,
      files,
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
        <Broadcast
          message={
            <>
              Start earning instantly using Crio's simple payments platform.{' '}
              <Link to='/payment'>Onboard your Stripe account</Link> now.
            </>
          }
          hideBroadcast={hideBroadcast}
        />
      )}
      <FormWrapper>
        <Row justify='center'>
          <Col span={19} className='formContainer'>
            <form>
              <Row style={{ position: 'relative' }} align='center' justify='center' gutter={[0, 8]}>
                <Col
                  span={16}
                  align='middle'
                  padding_bottom={32}
                  padding_left={categoryId === categories.commissionId ? 27 : ''}
                  className={
                    categoryId === categories.commissionId &&
                    (openTooltip || (user.id && !user.helpSeen))
                      ? 'select-title'
                      : ''
                  }
                >
                  <Title level={1}>Add new Digital Product or Service</Title>
                </Col>
                {!isDigitalProduct && (
                  <Col span={2} align='end' className='help'>
                    <HelpTooltip
                      onOpenChange={(value) => setOpenTooltip(value)}
                      placement='right'
                      title='After a user makes a purchase, you will receive an automatic email. Please check your email and complete the order'
                    />
                  </Col>
                )}

                <Col span={18} padding_bottom={32}>
                  <Controller
                    name='categoryId'
                    control={control}
                    defaultValue={state?.categoryId}
                    render={({ field }) => (
                      <TreeSelect
                        {...field}
                        treeDefaultExpandAll
                        treeExpandAction='click'
                        bordered={false}
                        size='large'
                        placeholder='Select the type of your product'
                      >
                        <TreeSelect.TreeNode
                          value={
                            categories.products.find((item) => item.id === categories.commissionId)
                              ?.id
                          }
                          title={
                            <>
                              {
                                categories.products.find(
                                  (item) => item.id === categories.commissionId,
                                )?.name
                              }
                            </>
                          }
                        />
                        <TreeSelect.TreeNode
                          selectable={false}
                          value={
                            categories.products.find((item) => item.id === categories.digitalId)
                              ?.name
                          }
                          title={
                            <>
                              {
                                categories.products.find((item) => item.id === categories.digitalId)
                                  ?.name
                              }
                              <ArrowIcon className='custom-arrow' />
                            </>
                          }
                        >
                          {categories.products
                            .filter((item) => item.mainCategoryId !== null)
                            .map((item) => (
                              <TreeSelect.TreeNode
                                value={item.id}
                                title={<Badge color='white' text={item.name} />}
                                key={item.id}
                              />
                            ))}
                        </TreeSelect.TreeNode>
                      </TreeSelect>
                    )}
                  />
                </Col>
                <Col span={18} align='start'>
                  <Text level={3} padding_bottom={8}>
                    Title*
                  </Text>
                </Col>
                <Col span={18} padding_bottom={32}>
                  <Controller
                    name='title'
                    control={control}
                    defaultValue={state?.title}
                    render={({ field }) => (
                      <Input {...field} level={4} maxLength={100} placeholder='Write here' />
                    )}
                  />
                </Col>
                <Col span={18} align='start'>
                  <Text level={3}>Description</Text>
                </Col>
                <Col span={18} padding_bottom={32}>
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
                <Col span={18} align='start'>
                  <Text
                    level={3}
                    disabled={isFree || !stripeAccount?.getConnectAccount?.charges_enabled}
                  >
                    Price*
                  </Text>
                </Col>
                <Col span={14} md={14} xs={13} padding_bottom={32} className='price'>
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
                                disabled={
                                  isFree || !stripeAccount?.getConnectAccount?.charges_enabled
                                }
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
                          disabled={isFree || !stripeAccount?.getConnectAccount?.charges_enabled}
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
                        checked={isFree || !stripeAccount?.getConnectAccount?.charges_enabled}
                        disabled={visibleBroadcast}
                        onChange={setFree}
                      >
                        <Text
                          level={3}
                          disabled={
                            visibleBroadcast || !stripeAccount?.getConnectAccount?.charges_enabled
                          }
                        >
                          Free
                        </Text>
                      </Checkbox>
                    )}
                  />
                </Col>
                <Col span={18} align='start'>
                  <Text level={3}>Thumbnail</Text>
                </Col>
                <Col span={18} padding_bottom={32}>
                  <DraggerImage control={control} image={image} setImage={setImage} />
                </Col>
                {isDigitalProduct && (
                  <Fragment>
                    <Col span={18} align='start'>
                      <Text level={3}>Product File*</Text>
                    </Col>
                    <Col span={18} padding_bottom={32}>
                      <DraggerFile
                        control={control}
                        file={file}
                        userId={state?.userId}
                        files={files}
                        setFile={setFile}
                        setFiles={setFiles}
                      />
                    </Col>
                  </Fragment>
                )}
                <Col span={18} align='start'>
                  <Text level={3} disabled={isFree}>
                    Who can get this?
                  </Text>
                </Col>
                <Col span={18} padding_bottom={32} align='start'>
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
                <Col span={18} align='start' padding_bottom={32} className='limit-section'>
                  <Switch checked={limitVisible} onChange={setLimitation} />
                  <Text level={3}>Limit your sales?</Text>
                </Col>
                {limitVisible && (
                  <>
                    <Col span={18} align='start'>
                      <Text level={3}>Maximum numbers of purchases</Text>
                    </Col>
                    <Col span={18} padding_bottom={32}>
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
                <Col span={18}>
                  <ActionButtons
                    state={state}
                    image={image}
                    disabled={disabled}
                    categoryId={categoryId}
                    uploading={uploading}
                    setUploading={setUploading}
                    handleSubmit={handleSubmit}
                  />
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        <Modal
          centered
          footer={null}
          closeIcon={<CloseIcon />}
          open={uploading.visible}
          closable={false}
          maskClosable={false}
          width={686}
          className='uploading'
        >
          <Spinner spinning={loading} color='white'>
            <Title level={2}>Uploading</Title>
            <Text level={3}>
              <span>{uploading.percent} % &bull; </span>
              <span>{formatRemainingTime(uploading.remainingTime)}</span>
            </Text>
            <Progress percent={uploading.percent} showInfo={false} />
          </Spinner>
        </Modal>
      </FormWrapper>
    </>
  );
};

export default memo(ProductForm);
