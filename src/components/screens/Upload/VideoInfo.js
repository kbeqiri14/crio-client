import { memo } from 'react';
import { Col, Row } from 'antd';

import ActionButtons from '@shared/ActionButtons';
import { Input } from '@ui-kit/Input';
import { ReactComponent as PlayIcon } from '@svgs/play-big.svg';
import { ReactComponent as RemoveIcon } from '@svgs/remove.svg';

const VideoInfo = ({ onCancel, onContinue }) => (
  <Row gutter={[0, 50]}>
    <Col span={8} offset={6}>
      <Input placeholder='Write the artwork title' />
    </Col>
    <Col span={8} offset={6}>
      <Input placeholder='Write anything what you’d like to mention about this work' />
    </Col>
    <Col span={24}>
      <div>
        <iframe
          title='Crio video player'
          src='https://player.vimeo.com/video/382975976?h=dc77330a55&color=ffffff&title=0&byline=0&portrait=0'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
        />
      </div>
      <RemoveIcon className='remove' />
    </Col>
    <Col span={24}>
      <ActionButtons saveText='CONTINUE' onCancel={onCancel} onSave={onContinue} />
    </Col>
  </Row>
);

export default memo(VideoInfo);
