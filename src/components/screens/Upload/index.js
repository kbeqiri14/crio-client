import { Fragment, memo, useState } from 'react';
import { Col, Row } from 'antd';

import { Input } from '@ui-kit/Input';
import ActionButtons from '@shared/ActionButtons';
import { ReactComponent as PlayIcon } from '@svgs/play-big.svg';
import { ReactComponent as RemoveIcon } from '@svgs/remove.svg';
import DragAndDrop from './DragAndDrop';
import Uploading from './Uploading';
import CoverImage from './CoverImage';
import './styles.less';

const Upload = () => {
  const [percent, setPercent] = useState(0);
  const [remainingTime, setRemainingTime] = useState(100);
  const [state, setState] = useState();
  const [uploadingVisible, setUploadingVisible] = useState(false);
  const [uploadedVideoVisible, setUploadedVideoVisible] = useState(false);
  const [coverImageVisible, setCoverImageVisible] = useState(false);

  return (
    <Fragment>
      {uploadedVideoVisible && <Row gutter={[0, 50]} className='upload'>
        <Col span={8} offset={6}>
          <Input placeholder='Write the artwork title' />
        </Col>
        <Col span={8} offset={6}>
          <Input placeholder='Write anything what you’d like to mention about this work' />
        </Col>
        <Col span={24}>
          <div className='video-view__player embed-responsive aspect-ratio-16/9'>
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
        <Col span={12} offset={10}>
          <ActionButtons saveText='CONTINUE' onSave={() => setCoverImageVisible(true)} />
        </Col>
      </Row>}
      {!uploadedVideoVisible && <DragAndDrop onContinue={() => setUploadingVisible(true)} />}
      {coverImageVisible && <CoverImage
        visible={coverImageVisible}
        setVisible={setCoverImageVisible}
      />}
      {uploadingVisible && <Uploading
        percent={percent}
        setPercent={setPercent}
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
        visible={uploadingVisible}
        setVisible={setUploadingVisible}
        setUploadedVideoVisible={setUploadedVideoVisible}
      />}
    </Fragment>
  );
};

export default memo(Upload);
