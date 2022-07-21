import { Link } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { Checkbox, Col, Input, Radio, Row, Switch, Text, Tooltip, Select } from '@ui-kit';
import DraggerImage from './DraggerImage';
import ActionButtons from './ActionButtons';
import { useQuery } from '@apollo/client';

import { getProductTypes } from '@app/graphql/queries/products.query';

const Form = ({
  isProduct,
  control,
  state,
  isFree,
  visibleBroadcast,
  setFree,
  image,
  setImage,
  limitVisible,
  disabled,
  setLimitation,
  handleSubmit,
}) => {
  const { data } = useQuery(getProductTypes);

  return (
    <Row align='center' gutter={[0, 8]}>
      <Col span={22} offset={1} align='start'>
        <Text level={3} padding_bottom={8}>
          Title*
        </Text>
      </Col>
      <Col span={22} offset={1} padding_bottom={32}>
        <Controller
          name='title'
          control={control}
          defaultValue={state?.title}
          render={({ field }) => (
            <Input {...field} level={4} maxLength={100} placeholder='Write here' />
          )}
        />
      </Col>
      <Col span={22} offset={1} align='start'>
        <Text level={3}>Description</Text>
      </Col>
      <Col span={22} offset={1} padding_bottom={32}>
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
      <Col span={22} offset={1} align='start'>
        <Text level={3} disabled={isFree}>
          Price*
        </Text>
      </Col>
      <Col
        xs={{ span: 19, offset: 1 }}
        md={{ span: 18, offset: 1 }}
        padding_bottom={32}
        className='price'
      >
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
                  title='Start earning instantly using Crios simple payments platform.'
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
            <Checkbox {...field} checked={isFree} disabled={visibleBroadcast} onChange={setFree}>
              <Text level={3} disabled={visibleBroadcast}>
                Free
              </Text>
            </Checkbox>
          )}
        />
      </Col>
      <Col span={22} offset={1} align='start'>
        <Text level={3}>Thumbnail</Text>
      </Col>
      {isProduct && (
        <Col span={22} offset={1} padding_bottom={32}>
          <Controller
            name='desc'
            control={control}
            defaultValue={state?.productType}
            render={({ field }) => (
              <Select
                {...field}
                defaultOpen
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
      )}

      <Col span={22} offset={1} padding_bottom={32}>
        <DraggerImage isProduct={isProduct} control={control} image={image} setImage={setImage} />
      </Col>
      <Col span={22} offset={1} align='start'>
        <Text level={3} disabled={isFree}>
          Who can see this?
        </Text>
      </Col>
      <Col span={22} offset={1} padding_bottom={32} align='start'>
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
      <Col span={22} offset={1} align='start' padding_bottom={32}>
        <Switch checked={limitVisible} onChange={setLimitation} />
        <Text level={3}> Limit your sales?</Text>
      </Col>
      {limitVisible && (
        <>
          <Col span={22} offset={1} align='start'>
            <Text level={3}>Maximum numbers of purchases</Text>
          </Col>
          <Col span={22} offset={1} padding_bottom={32}>
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
      <Col span={22} offset={1}>
        <ActionButtons
          state={state}
          image={image}
          disabled={disabled}
          handleSubmit={handleSubmit}
        />
      </Col>
    </Row>
  );
};

export default Form;
