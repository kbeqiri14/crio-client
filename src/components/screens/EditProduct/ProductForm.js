import { memo, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Checkbox } from 'antd';

import { Col, Input, Radio, Row, Switch, Text, Title } from '@ui-kit';
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
  .cover:hover {
    .remove {
      opacity: 1;
      visibility: visible;
    }
  }
  .remove {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.4s linear;
    position: absolute;
    right: 8px;
    top: 12px;
    cursor: pointer;
  }
`;

const ProductForm = ({ state }) => {
  const [limitVisible, setLimitVisible] = useState(state?.limit && state?.limit >= 0);
  const [image, setImage] = useState(
    state?.thumbnail && !state?.thumbnail?.startsWith('/static/media/product')
      ? { src: state.thumbnail }
      : {},
  );

  const { control, watch, setValue } = useForm();
  const isFree = watch('isFree');

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
          <ActionButtons state={state} image={image} limitVisible={limitVisible} watch={watch} />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default memo(ProductForm);
