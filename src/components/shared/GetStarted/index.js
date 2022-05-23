import { memo, useCallback, useState } from 'react';
import { Col, Row } from 'antd';

import { signIn } from '@app/auth';
import { Button } from '@ui-kit';
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
    <>
      <Button type='primary' width={171} onClick={show}>
        Get Started
      </Button>
      {visible && (
        <BlurredModal width={509} visible={visible} onCancel={hide} className='get-started__modal'>
          <Row justify='center' gutter={[0, 26]}>
            <Col id='googleLogin'>
              <Button type='google' icon={<GoogleIcon />} width={302} onClick={googleSignIn}>
                Connect with Google
              </Button>
            </Col>
            <Col>
              <Button type='facebook' icon={<FbIcon />} width={302} onClick={facebookSignIn}>
                Connect with Facebook
              </Button>
            </Col>
          </Row>
        </BlurredModal>
      )}
    </>
  );
};

export default memo(GetStarted);
