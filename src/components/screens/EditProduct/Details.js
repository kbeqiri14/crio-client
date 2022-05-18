import { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Upload } from 'antd';
import { useMutation } from '@apollo/client';

import useAsyncFn from '@app/hooks/useAsyncFn';
import { createProduct, updateProduct } from '@app/graphql/mutations/product.mutation';
import ActionButtons from '@shared/ActionButtons';
import { errorToast } from '@ui-kit/Notification';
import { Col, Input, Radio, Row, Switch, Text, Title } from '@ui-kit';
// import { formItemContent } from '@utils/upload.helper';

const { Dragger } = Upload;

const ProductDetail = ({ state }) => {
  const [limitVisible, setLimitVisible] = useState(false);
  const [image, setImage] = useState(state?.thumbnail ? { src: state.thumbnail } : {});

  const { control, watch, setValue, handleSubmit } = useForm();
  const title = watch('title');
  const price = watch('price');

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
  const disabled = useMemo(() => !title?.trim() || !price?.trim(), [title, price]);
  const buttonLabel = useMemo(() => (state ? 'UPDATE' : 'PUBLISH'), [state]);

  const setLimitation = useCallback(() => {
    setLimitVisible(!limitVisible);
    setValue('limit', undefined);
  }, [limitVisible, setValue]);

  const [create] = useMutation(createProduct, {
    onError: () => errorToast('Something went wrong!', 'Please, try again later!'),
  });

  const [update] = useMutation(updateProduct, {
    onError: () => errorToast('Something went wrong!', 'Please, try again later!'),
  });

  const onPublish = useAsyncFn(async (attributes) => {
    state
      ? update({
          variables: {
            attributes: {
              id: state.id,
              type: 'service',
              title: attributes.title,
              description: attributes.desc,
              price: +attributes.price,
              limit: +attributes.limit,
              accessibility: attributes.accessibility,
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
            },
          },
        });
    // if (attributes.image.file) {

    // }
    // const content = await formItemContent({ image: attributes.image.file });

    // console.log('content', content?.split('/')?.slice(-1)[0])
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Row gutter={[0, 8]} className='upload' style={{ maxWidth: 568 }}>
        <Col span={24} padding_bottom={32}>
          <Title level={1} align='center'>
            {state ? 'Update Service' : 'Add new Service'}
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
                autoSize={{ maxRows: 5 }}
                placeholder='Write here'
              />
            )}
          />
        </Col>
        <Col span={24} align='start'>
          <Text level={3}>Price*</Text>
        </Col>
        <Col span={24} padding_bottom={32}>
          <Controller
            name='price'
            control={control}
            defaultValue={state?.price}
            render={({ field }) => (
              <Input {...field} level={4} pattern='[0-9]*' maxLength={50} placeholder='$' />
            )}
          />
        </Col>
        <Col span={24} align='start'>
          <Text level={3}>Thumbnail</Text>
        </Col>
        <Col span={24} padding_bottom={32}>
          {image.src ? (
            <img
              alt='uploaded file'
              src={image.src}
              style={{
                margin: 'auto',
                maxWidth: 568,
                maxHeight: 259,
                borderRadius: 43,
              }}
            />
          ) : (
            <Controller
              name='image'
              control={control}
              render={({ field }) => (
                <Dragger {...props} {...field}>
                  <Row justify='center' align='center' gutter={[0, 11]} className='drag-and-drop'>
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
          <Switch onChange={setLimitation} />
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
            loading={onPublish.loading}
            disabled={disabled}
            // onCancel={onCancel}
            onSave={handleSubmit(onPublish.call)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(ProductDetail);
