import { memo, useCallback, useState } from 'react';
import { Col, Row } from 'antd';

import { signIn } from '@app/auth';
import { Button } from '@ui-kit';
import { BlurredModal } from '@ui-kit/Modal';
import { ReactComponent as GoogleIcon } from '@svgs/google-sign-in.svg';
import { ReactComponent as FbIcon } from '@svgs/fb-sign-in.svg';
import './styles.less';

const GetStarted = ({ size }) => {
  const [visible, setVisible] = useState('');

  const show = useCallback((isSignUp) => setVisible(isSignUp ? 'sign-up' : 'sign-in'), []);
  const hide = useCallback(() => setVisible(''), []);
  const socialSignIn = useCallback(
    (provider) => {
      hide();
      signIn(provider);
    },
    [hide],
  );
  const googleSignIn = useCallback(() => socialSignIn('Google'), [socialSignIn]);
  const facebookSignIn = useCallback(() => socialSignIn('Facebook'), [socialSignIn]);

  const signUp = useCallback(() => show(true), [show]);
  const logIn = useCallback(() => show(), [show]);

  return (
    <>
      <Button type='link' white='true' onClick={logIn}>
        Log in
      </Button>
      <Button type='primary' width={171} onClick={signUp}>
        Get Started
      </Button>
      {visible && (
        <BlurredModal width={509} visible={visible} onCancel={hide} className='get-started__modal'>
          <Row justify='center' gutter={[0, 26]}>
            <Col id='googleLogin'>
              <Button type='google' icon={<GoogleIcon />} width={302} onClick={googleSignIn}>
                {visible === 'sign-up' ? 'Sign up with Google' : 'Log in with Google'}
              </Button>
            </Col>
            <Col>
              <Button type='facebook' icon={<FbIcon />} width={302} onClick={facebookSignIn}>
                {visible === 'sign-up' ? 'Sign up with Facebook' : 'Log in with Facebook'}
              </Button>
            </Col>
          </Row>
        </BlurredModal>
      )}
    </>
  );
};

export default memo(GetStarted);
