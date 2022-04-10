import { memo, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';

import { updateMetadata } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Radio, Text } from '@ui-kit';
import { Input } from '@ui-kit/Input';

const VideoInfo = ({ artworkId, file, state, onCancel, onCompleted }) => {
  const { control, watch, handleSubmit } = useForm();
  const title = watch('title');
  const desc = watch('desc');
  const accessibility = watch('accessibility');

  const url = useMemo(() => {
    if (artworkId) {
      return URL.createObjectURL(file);
    }
  }, [artworkId, file]);
  const disabled = useMemo(() => !title?.trim() || !desc?.trim(), [desc, title]);
  const videoId = useMemo(
    () => state?.videoUri?.substring(state?.videoUri?.lastIndexOf('/') + 1),
    [state?.videoUri],
  );
  const [updateArtwork, { loading: updatingArtwork }] = useMutation(updateMetadata, {
    variables: {
      params: { artworkId: artworkId || state?.artworkId, title, description: desc, accessibility },
    },
    onCompleted,
  });

  return (
    <Row justify='start' className='video-info'>
      <Col span={24}>
        <Controller
          name='title'
          control={control}
          defaultValue={state?.title}
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
          defaultValue={state?.description}
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
              <Radio.Group defaultValue={state?.accessibility} {...field}>
                <Radio value='subscriber_only'>Subscribed</Radio>
                <Radio value='everyone'>Everyone</Radio>
              </Radio.Group>
            )}
          />
        </Col>
      </Col>
      <Col span={24} className='player'>
        {artworkId ? (
          <ReactPlayer url={url} controls={true} width='inherit' height={520} />
        ) : (
          <div className='edit-video video-view__player embed-responsive aspect-ratio-16/9'>
            <iframe
              title={'Crio video player'}
              src={`https://player.vimeo.com/video/${videoId}?h=dc77330a55&color=ffffff&title=0&byline=0&portrait=0`}
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              allowFullScreen
            />
          </div>
        )}
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
