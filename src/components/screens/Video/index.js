import { memo, useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { updateMetadata } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Input } from '@ui-kit/Input';
import { successToast } from '@ui-kit/Notification';

const Video = () => {
  const { state } = useLocation();
  const { control, watch, handleSubmit } = useForm();
  const title = watch('title');
  const desc = watch('desc');

  const disabled = useMemo(() => !title?.trim() || !desc?.trim(), [desc, title]);

  const onCancel = useCallback(() => history.push('/account'), []);
  const videoId = useMemo(
    () => state?.videoUri?.substring(state?.videoUri?.lastIndexOf('/') + 1),
    [state?.videoUri],
  );

  const [updateArtwork, { loading: updatingArtwork }] = useMutation(updateMetadata, {
    variables: { params: { artworkId: state?.artworkId, title, description: desc } },
    onCompleted: () => {
      history.push('/account');
      successToast('The video info is successfully updated.');
    },
  });

  useEffect(() => {
    if (!state) {
      history.push('/account');
    }
  }, [state]);

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
      </Col>
      <Col span={24} className='player'>
        <div className='edit-video video-view__player embed-responsive aspect-ratio-16/9'>
          <iframe
            title={'Crio video player'}
            src={`https://player.vimeo.com/video/${videoId}?h=dc77330a55&color=ffffff&title=0&byline=0&portrait=0`}
            frameBorder='0'
            allow='autoplay; fullscreen; picture-in-picture'
            allowFullScreen
          />
        </div>
      </Col>
      <Col span={24}>
        <ActionButtons
          saveText='UPDATE'
          loading={updatingArtwork}
          disabled={disabled}
          onCancel={onCancel}
          onSave={handleSubmit(updateArtwork)}
        />
      </Col>
    </Row>
  );
};

export default memo(Video);
