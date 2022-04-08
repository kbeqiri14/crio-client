import { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';

import { updateMetadata } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Radio, Text } from '@ui-kit';
import { Input } from '@ui-kit/Input';

const VideoInfo = ({ artworkId, file, types, dispatch }) => {
  const { control, watch, handleSubmit } = useForm();
  const title = watch('title');
  const desc = watch('desc');
  const accessibility = watch('accessibility');

  const disabled = useMemo(() => !title?.trim() || !desc?.trim(), [desc, title]);
  const url = useMemo(() => URL.createObjectURL(file), [file]);

  const onCancel = useCallback(
    () => dispatch({ type: types.CONFIRMATION_VISIBLE }),
    [types.CONFIRMATION_VISIBLE, dispatch],
  );
  const [updateArtwork, { loading: updatingArtwork }] = useMutation(updateMetadata, {
    variables: { params: { artworkId, title, description: desc, accessibility } },
    onCompleted: () => dispatch({ type: types.UPLOAD_COVER_IMAGE }),
  });

  return (
    <Row justify='start' className='video-info'>
      <Col span={24}>
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              maxLength={50}
              className='title'
              placeholder='Write the artwork title'
            />
          )}
        />
      </Col>
      <Col span={24}>
        <Controller
          name='desc'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              maxLength={80}
              className='description'
              placeholder='Write anything what you’d like to mention about this work'
            />
          )}
        />
        <Col span={24}>
          <Text level={3}>Accessibility</Text>
          <Controller
            name='accessibility'
            control={control}
            render={({ field }) => (
              <Radio.Group defaultValue='subscribed' {...field}>
                <Radio value='subscribed'>Subscribed</Radio>
                <Radio value='everyone'>Everyone</Radio>
              </Radio.Group>
            )}
          />
        </Col>
      </Col>
      <Col span={24} className='player'>
        <ReactPlayer url={url} controls={true} width='inherit' height={520} />
      </Col>
      <Col span={24}>
        <ActionButtons
          saveText='CONTINUE'
          loading={updatingArtwork}
          disabled={disabled}
          onCancel={onCancel}
          onSave={handleSubmit(updateArtwork)}
        />
      </Col>
    </Row>
  );
};

export default memo(VideoInfo);
