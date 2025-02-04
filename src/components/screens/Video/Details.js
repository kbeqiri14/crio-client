import { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import { Col, Row } from 'antd';
import imageCompression from 'browser-image-compression';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import useCategories from '@app/hooks/useCategories';
import { createArtwork, updateMetadata } from '@app/graphql/mutations/artwork.mutation';
import { ARTWORKS } from '@configs/constants';
import ActionButtons from '@shared/ActionButtons';
import { formItemContent } from '@utils/upload.helper';
import { Input, notification, Radio, Text, Select } from '@ui-kit';

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
    margin: auto;
    margin-bottom: 48px;
    max-width: 922px;
    min-height: 520px;
    video {
      border-radius: 16px;
    }
    img {
      height: auto;
      width: 100%;
      max-height: 538px;
      object-fit: cover;
    }
  }
  .access-section {
    margin: 0 15px;
  }
`;

const VideoInfo = ({
  artworkId,
  file,
  src,
  state,
  setVisible,
  onCancel,
  onCompleted,
  goToProfile,
}) => {
  const { user } = useLoggedInUser();
  const { categories } = useCategories('content');
  const [uploading, setUploading] = useState(false);
  const { control, watch, handleSubmit } = useForm();
  const title = watch('title');
  const desc = watch('desc');
  const categoryId = watch('categoryId');
  const accessibility = watch('accessibility');

  const isImage = useMemo(() => file?.type?.split('/')?.[0] === 'image', [file?.type]);
  const url = useMemo(() => {
    if (artworkId) {
      return URL.createObjectURL(file);
    }
  }, [artworkId, file]);
  const disabled = useMemo(
    () =>
      !title?.trim() ||
      !desc?.trim() ||
      !categoryId ||
      !(
        (title && state?.title !== title) ||
        (desc && state?.description !== desc) ||
        (categoryId && state?.categoryId !== categoryId) ||
        (accessibility && state?.accessibility !== accessibility)
      ),
    [
      title,
      desc,
      categoryId,
      accessibility,
      state?.title,
      state?.description,
      state?.categoryId,
      state?.accessibility,
    ],
  );
  const videoId = useMemo(
    () => state?.content?.substring(state?.content?.lastIndexOf('/') + 1),
    [state?.content],
  );
  const completeCreateArtwork = useCallback(
    () => (isImage ? goToProfile() : onCompleted()),
    [isImage, goToProfile, onCompleted],
  );

  const [saveArtwork, { loading: creatingArtwork }] = useMutation(createArtwork, {
    onCompleted: completeCreateArtwork,
    onError: () => {
      notification.errorToast('Something went wrong!', 'Please, try again later!');
    },
  });

  const [updateArtwork, { loading: updatingArtwork }] = useMutation(updateMetadata, {
    variables: {
      params: {
        artworkId: artworkId || state?.artworkId,
        title,
        description: desc,
        accessibility,
        categoryId: categoryId,
      },
    },
    onCompleted,
    onError: (data) => notification.errorToast(data?.message),
  });

  const loading = useMemo(
    () => creatingArtwork || updatingArtwork || uploading,
    [creatingArtwork, updatingArtwork, uploading],
  );

  const onContinue = useCallback(async () => {
    if (isImage) {
      setUploading(true);
      const compressionFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
      });
      const fileName = await formItemContent({
        userId: user.id,
        image: compressionFile,
        type: ARTWORKS,
      });
      setUploading(false);
      saveArtwork({
        variables: {
          params: {
            content: fileName,
            thumbnail: fileName,
            title,
            description: desc,
            accessibility,
            categoryId: categoryId,
          },
        },
      });
    } else {
      updateArtwork();
    }
  }, [isImage, user.id, file, title, accessibility, desc, categoryId, saveArtwork, updateArtwork]);

  const handleCancel = useCallback(() => {
    if (state && !disabled) {
      setVisible(true);
    } else {
      onCancel();
    }
  }, [state, disabled, setVisible, onCancel]);

  return (
    <StyledVideoDetails>
      <Row gutter={[0, 20]} className='info'>
        <Col span={24}>
          <Controller
            name='title'
            control={control}
            defaultValue={state?.title}
            render={({ field }) => (
              <Input {...field} level={4} maxLength={50} placeholder='Write the content title' />
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
        <Col span={14} padding_bottom={32}>
          <Controller
            name='categoryId'
            control={control}
            defaultValue={state?.categoryId}
            render={({ field }) => (
              <Select
                {...field}
                bordered={false}
                size='large'
                placeholder='Select the type of your content'
                options={categories.contents.map((item) => ({
                  label: <>{item.name}</>,
                  value: item.id,
                }))}
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
        {src ? (
          <img alt='artwork' src={src} className='border-radius-16' />
        ) : artworkId ? (
          <ReactPlayer url={url} controls={true} width='inherit' height={520} />
        ) : (
          <div className='video-view__player embed-responsive aspect-ratio-16/9'>
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
        onCancel={handleCancel}
        onSave={handleSubmit(onContinue)}
      />
    </StyledVideoDetails>
  );
};

export default memo(VideoInfo);
