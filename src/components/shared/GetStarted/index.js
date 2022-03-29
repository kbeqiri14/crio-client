import { memo, useCallback, useState } from 'react';
import { Col, Row } from 'antd';

import { signIn } from '@app/auth';
import { SecondaryButton } from '@ui-kit/Button';
import { BlurredModal } from '@ui-kit/Modal';
import { ReactComponent as GoogleIcon } from '@svgs/google-sign-in.svg';
import { ReactComponent as FbIcon } from '@svgs/fb-sign-in.svg';
import './styles.less';

const GetStarted = ({ size }) => {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  const socialSignIn = useCallback(
    (provider) => {
      hide();
      signIn(provider);
    },
    [hide],
  );
  const googleSignIn = useCallback(() => socialSignIn('Google'), [socialSignIn]);
  const facebookSignIn = useCallback(() => socialSignIn('Facebook'), [socialSignIn]);

  return (
    <div className='get-started'>
      <SecondaryButton
        filled
        fillColor='secondary'
        textColor='white'
        size={size}
        className='get-started__button'
        onClick={show}
      >
        Get Started
      </SecondaryButton>
      {visible && (
        <BlurredModal width={509} visible={visible} onCancel={hide} className='get-started__modal'>
          <Row gutter={[0, 26]} justify='center'>
            <Col id='googleLogin' className='cr-landing__connect google'>
              <GoogleIcon />
              <SecondaryButton
                onClick={googleSignIn}
                filled
                fillColor='fifth'
                textColor='dark'
                size='large'
              >
                Connect with Google
              </SecondaryButton>
            </Col>
            <Col className='cr-landing__connect'>
              <FbIcon />
              <SecondaryButton
                onClick={facebookSignIn}
                filled
                fillColor='secondary'
                textColor='white'
                size='large'
              >
                Connect with Facebook
              </SecondaryButton>
            </Col>
          </Row>
        </BlurredModal>
      )}
    </div>
  );
};

export default memo(GetStarted);
