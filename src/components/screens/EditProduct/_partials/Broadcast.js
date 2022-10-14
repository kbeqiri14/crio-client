import styled from 'styled-components';
import { Text } from '@ui-kit';
import { ReactComponent as CloseIcon } from '@svgs/close-small.svg';

const BroadcastWrapper = styled('div')`
  background: rgba(0, 160, 255, 0.5);
  padding: 13px 36px;
  a {
    color: white;
    text-decoration: underline;
    :hover {
      color: white;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const Broadcast = ({ message, hideBroadcast }) => (
  <BroadcastWrapper>
    <Text level='2' color='white'>
      {message}
    </Text>
    <CloseIcon className='vertical-middle float-right' onClick={hideBroadcast} />
  </BroadcastWrapper>
);

export default Broadcast;
