import { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Upload, Checkbox } from 'antd';
import { useMutation } from '@apollo/client';

import useAsyncFn from '@app/hooks/useAsyncFn';
import useRedirectToProfile from '@app/hooks/useRedirectToProfile';
import { createProduct, updateProduct } from '@app/graphql/mutations/product.mutation';
import ActionButtons from '@shared/ActionButtons';
import { errorToast, successToast } from '@ui-kit/Notification';
import { Col, Input, Radio, Row, Switch, Text, Title } from '@ui-kit';
import { formItemContent } from '@utils/upload.helper';
import { ReactComponent as NewUpload } from '@svgs/new-upload.svg';
import { ReactComponent as Delete } from '@svgs/delete.svg';

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
  .cover:hover {
    .actions {
      opacity: 1;
      visibility: visible;
    }
  }
  .actions {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.4s linear;
    position: absolute;
    right: 8px;
    top: 12px;
    svg {
      cursor: pointer;
    }
  }
`;

const { Dragger } = Upload;

const ProductDetail = ({ state }) => {
  const [limitVisible, setLimitVisible] = useState(state?.limit);
  const [image, setImage] = useState(state?.thumbnail ? { src: state.thumbnail } : {});

  const { userId, redirect } = useRedirectToProfile();
  const { control, watch, setValue, handleSubmit } = useForm();
  const title = watch('title');
  const description = watch('desc');
  const price = watch('price');
  const limit = watch('limit');
  const accessibility = watch('accessibility');

  const props = {
    name: 'file',
    accept: 'image/*',
    showUploadList: false,
    listType: 'picture',
    beforeUpload(file) {
      const getSource = async () => {
        const src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        });
        setImage({ file, src });
      };
      getSource();
      return false;
    },
  };
  const disabled = useMemo(() => {
    return !(
      title?.trim() !== '' &&
      !!price &&
      ((title?.trim() && title?.trim() !== state?.title) ||
        (description?.trim() && description?.trim() !== state?.description) ||
        (description?.trim() === '' && !!state?.description) ||
        (price && +price !== state?.price) ||
        accessibility !== state?.accessibility ||
        (limitVisible && limit && +limit !== state?.limit))
    );
  }, [
    title,
    description,
    price,
    limit,
    accessibility,
    limitVisible,
    state?.title,
    state?.description,
    state?.price,
    state?.limit,
    state?.accessibility,
  ]);
  const buttonLabel = useMemo(() => (state?.productId ? 'UPDATE' : 'PUBLISH'), [state?.productId]);

  const setLimitation = useCallback(() => {
    setLimitVisible(!limitVisible);
    setValue('limit', undefined);
  }, [limitVisible, setValue]);

  const setFree = useCallback(() => setValue('price', undefined), [setValue]);

  const [create, { loading: creating }] = useMutation(createProduct, {
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
    let thumbnail;
    if (attributes.image?.file) {
      const content = await formItemContent({ userId, image: attributes.image.file });
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
              price: +attributes.price,
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
              price: +attributes.price,
              limit: +attributes.limit,
              accessibility: attributes.accessibility,
              thumbnail,
            },
          },
        });
  });

  return (
    <Wrapper>
      <Row align='center' gutter={[0, 8]}>
        <Col span={24} padding_bottom={32}>
          <Title level={1} align='center'>
            {state?.productId ? 'Update Service' : 'Add new Service'}
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
              <Input {...field} level={4} maxLength={50} placeholder='Write here' />
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
          <Text level={3}>Price*</Text>
        </Col>
        <Col span={20} padding_bottom={32}>
          <Controller
            name='price'
            control={control}
            defaultValue={state?.price}
            render={({ field }) => (
              <Input {...field} level={4} pattern='[0-9]*' maxLength={50} placeholder='$' />
            )}
          />
        </Col>
        <Col offset={1} span={3} padding_bottom={32} className='self-center'>
          <Controller
            name='isFree'
            control={control}
            defaultValue={!!state?.price}
            render={({ field }) => (
              <Checkbox {...field} onChange={setFree}>
                <Text level={3}>Free</Text>
              </Checkbox>
            )}
          />
        </Col>
        <Col span={24} align='start'>
          <Text level={3}>Thumbnail</Text>
        </Col>
        <Col span={24} padding_bottom={32}>
          {image.src ? (
            <div className='cover'>
              <img
                alt='uploaded file'
                src={image.src}
                width={568}
                height={232}
                className='border-radius-8 fit-cover'
              />
              <Row gutter={12} className='actions'>
                <Col>
                  <NewUpload className='new-upload' />
                </Col>
                <Col>
                  <Delete className='delete' />
                </Col>
              </Row>
            </div>
          ) : (
            <Controller
              name='image'
              control={control}
              render={({ field }) => (
                <Dragger {...props} {...field}>
                  <Row justify='center' align='center' gutter={[0, 20]}>
                    <Col span={24}>
                      <Text level={4}>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        Drag and drop an image, or <a>Upload</a>
                      </Text>
                    </Col>
                    <Col span={24}>
                      <Text level={4}>HI-Res images (png, jpg, gif)</Text>
                    </Col>
                  </Row>
                </Dragger>
              )}
            />
          )}
        </Col>
        <Col span={24} align='start'>
          <Text level={3}>Who can see this?</Text>
        </Col>
        <Col span={24} padding_bottom={32} align='start'>
          <Controller
            name='accessibility'
            control={control}
            defaultValue={state?.accessibility || 'subscriber_only'}
            render={({ field }) => (
              <Radio.Group defaultValue={state?.accessibility || 'subscriber_only'} {...field}>
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
            saveText={buttonLabel}
            loading={onPublish.loading || creating || updating}
            disabled={disabled}
            onCancel={redirect}
            onSave={handleSubmit(onPublish.call)}
          />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(ProductDetail);
