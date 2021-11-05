import { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { deleteArtwork, updateArtwork } from '@app/graphql/mutations/artwork.mutation';
import ActionButtons from '@shared/ActionButtons';
import { Input } from '@ui-kit/Input';
import thumbnail from '@images/thumbnail.png';
import { ReactComponent as PlayIcon } from '@svgs/play-big.svg';

const VideoInfo = ({ artworkId, types, dispatch }) => {
  const { control, watch, handleSubmit } = useForm();
  const title = watch('title');
  const desc = watch('desc');

  const [requestUpdateArtwork, { loading: updatingArtwork }] = useMutation(updateArtwork, {
    variables: { attributes: { id: artworkId, title, description: desc } },
  });
  const [removeArtwork, { loading: deletingArtwork }] = useMutation(deleteArtwork, { variables: { artworkId: artworkId } });

  const disabled = useMemo(() => !title?.trim() || !desc?.trim(), [desc, title]);
  const onCancel = useCallback(() => removeArtwork() && history.push('/account'), [removeArtwork]);
  const onContinue = useCallback(() => {
    requestUpdateArtwork();
    dispatch({ type: types.UPLOAD_COVER_IMAGE });
  }, [types.UPLOAD_COVER_IMAGE, dispatch, requestUpdateArtwork]);

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
          loading={updatingArtwork}
          disabled={disabled}
          onCancel={onCancel}
          onSave={handleSubmit(onContinue)} />
      </Col>
    </Row>
    );
  };

export default memo(VideoInfo);
