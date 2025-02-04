import styled from 'styled-components';

const Spinner = styled('div')`
  @-webkit-keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes spin {
    0% {
      -moz-transform: rotate(0);
    }
    100% {
      -moz-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1003;
  background: #000000;
  overflow: hidden;

  div:first-child {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    box-shadow: 0 3px 3px 0 #ff3d71;
    transform: translate3d(0, 0, 0);
    animation: spin 2s linear infinite;
  }

  div:first-child:after,
  div:first-child:before {
    content: '';
    position: absolute;
    border-radius: 50%;
  }

  div:first-child:before {
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    box-shadow: 0 3px 3px 0 #ffaa00;
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
  }

  div:first-child:after {
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    box-shadow: 0 3px 3px 0 #0095ff;
    animation: spin 1.5s linear infinite;
  }
`;

const GlobalSpinner = () => (
  <Spinner>
    <div className='blob blob-0' />
    <div className='blob blob-1' />
    <div className='blob blob-2' />
    <div className='blob blob-3' />
    <div className='blob blob-4' />
    <div className='blob blob-5' />
  </Spinner>
);

export default GlobalSpinner;
