import { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { createArtwork, deleteArtwork } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Input } from '@ui-kit/Input';
import thumbnail from '@images/thumbnail.png';
import { ReactComponent as PlayIcon } from '@svgs/play-big.svg';

const VideoInfo = ({ types, dispatch }) => {
  const { control, watch, handleSubmit } = useForm();
  const title = watch('title');
  const desc = watch('desc');

  const [saveArtwork, { loading: creatingArtwork }] = useMutation(createArtwork, {
    variables: {
      artwork: { title, description: desc }
    },
    onCompleted: () => dispatch({ type: types.UPLOAD_COVER_IMAGE }),
    onError: () => dispatch({ type: types.UPLOAD_COVER_IMAGE }),
  });

  const [removeArtwork, { loading: deletingArtwork }] = useMutation(deleteArtwork, { variables: { artworkId: '1' } });

  const disabled = useMemo(() => !title?.trim() || !desc?.trim(), [desc, title]);
  const onCancel = useCallback(() => removeArtwork() && history.push('/account'), [removeArtwork]);

  return (
    <Row justify='start' className='video-info'>
      <Col span={24}>
        <Controller
          name='title'
          control={control}
          render={({ field }) => <Input {...field} className='title' placeholder='Write the artwork title' />}
        />
      </Col>
      <Col span={24}>
        <Controller
          name='desc'
          control={control}
          render={({ field }) => <Input {...field} placeholder='Write anything what you’d like to mention about this work' />}
        />
      </Col>
      <Col span={24} className='player'>
        <img alt='video' src={thumbnail} />
        <PlayIcon className='play' />
      </Col>
      <Col span={24}>
        <ActionButtons
          saveText='CONTINUE'
          cancelLoading={deletingArtwork}
          loading={creatingArtwork}
          disabled={disabled}
          onCancel={onCancel}
          onSave={handleSubmit(saveArtwork)} />
      </Col>
    </Row>
    );
  };

export default memo(VideoInfo);
