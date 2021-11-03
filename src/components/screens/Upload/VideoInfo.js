import { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Col, Row } from 'antd';

import ActionButtons from '@shared/ActionButtons';
import { Input } from '@ui-kit/Input';
import thumbnail from '@images/thumbnail.png';
import { ReactComponent as PlayIcon } from '@svgs/play-big.svg';
import { ReactComponent as RemoveIcon } from '@svgs/remove.svg';

const VideoInfo = ({ onCancel, onContinue }) => {
  const { control, watch, handleSubmit } = useForm();
  const title = watch('title');
  const desc = watch('desc');

  const disabled = useMemo(() => !title || !desc, [desc, title]);
  const onSubmit = useCallback(() => {
    console.log(title, desc)
    onContinue();
  }, [title, desc, onContinue]);

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
        <RemoveIcon className='remove' />
        <PlayIcon className='play' />
      </Col>
      <Col span={24}>
        <ActionButtons saveText='CONTINUE' disabled={disabled} onCancel={onCancel} onSave={handleSubmit(onSubmit)} />
      </Col>
    </Row>
    );
  };

export default memo(VideoInfo);
