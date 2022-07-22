import { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { createArtwork, updateMetadata } from '@app/graphql/mutations/artwork.mutation';
import { ARTWORKS } from '@configs/constants';
import ActionButtons from '@shared/ActionButtons';
import { formItemContent } from '@utils/upload.helper';
import { Input, Radio, Text } from '@ui-kit';
import { errorToast } from '@ui-kit/Notification';

const StyledVideoDetails = styled('div')`
  padding: 40px 10px;
  .ant-input {
    color: white;
    font-size: 22px;
    font-weight: 400;
    font-style: 'normal';
    line-height: 33px;
    background-color: transparent !important;
    border: 1px solid transparent;
    :hover,
    :focus {
      box-shadow: none;
      border: 1px solid transparent !important;
    }
  }
  textarea {
    font-size: 18px !important;
    font-weight: 400 !important;
    font-style: normal !important;
    line-height: 27px !important;
  }
  .info {
    padding-bottom: 40px;
    max-width: 930px;
    margin: auto;
  }
  .player {
    display: flex;
    justify-content: center;
    padding: 24px 0 48px;
    min-height: 520px;
    video {
      border-radius: 16px;
    }
  }
  .access-section {
    margin: 0 15px;
  }
`;

const VideoInfo = ({ artworkId, file, src, state, onCancel, onCompleted }) => {
  const { user } = useLoggedInUser();
  const { control, watch, handleSubmit } = useForm();
  const title = watch('title');
  const desc = watch('desc');
  const accessibility = watch('accessibility');

  const isImage = useMemo(() => file?.type?.split('/')?.[0] === 'image', [file?.type]);
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

  const [saveArtwork, { loading: creatingArtwork }] = useMutation(createArtwork, {
    onCompleted,
    onError: () => {
      errorToast('Something went wrong!', 'Please, try again later!');
    },
  });

  const [updateArtwork, { loading: updatingArtwork }] = useMutation(updateMetadata, {
    variables: {
      params: { artworkId: artworkId || state?.artworkId, title, description: desc, accessibility },
    },
    onCompleted,
    onError: (data) => errorToast(data?.message),
  });

  const loading = useMemo(
    () => creatingArtwork || updatingArtwork,
    [creatingArtwork, updatingArtwork],
  );

  const onContinue = useCallback(async () => {
    if (isImage) {
      const content = await formItemContent({ userId: user.id, image: file, type: ARTWORKS });
      const videoUri = content?.image?.split('/')?.slice(-1)[0];
      saveArtwork({
        variables: {
          params: { videoUri, thumbnail: videoUri, title, description: desc, accessibility },
        },
      });
    } else {
      updateArtwork();
    }
  }, [isImage, user.id, file, title, desc, accessibility, saveArtwork, updateArtwork]);

  return (
    <StyledVideoDetails>
      <Row gutter={[0, 20]} className='info'>
        <Col span={24}>
          <Controller
            name='title'
            control={control}
            defaultValue={state?.title}
            render={({ field }) => (
              <Input {...field} level={4} maxLength={50} placeholder='Write the artwork title' />
            )}
          />
        </Col>
        <Col span={24}>
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
                placeholder='Write anything what you’d like to mention about this work'
              />
            )}
          />
        </Col>
        <Col className='access-section' span={24}>
          <Text level={3}>Accessibility</Text>
          <br />
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
      </Row>
      <div className='player'>
        {isImage ? (
          <img alt='artwork' src={src} />
        ) : artworkId ? (
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
      </div>
      <ActionButtons
        saveText='CONTINUE'
        loading={loading}
        disabled={disabled}
        onCancel={onCancel}
        onSave={handleSubmit(onContinue)}
      />
    </StyledVideoDetails>
  );
};

export default memo(VideoInfo);
