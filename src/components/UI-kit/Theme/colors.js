const dark = {
  dark100: '#2B2B2B',
  dark50: '#878C94',
  dark25: '#BBBCBC',
};

const success = {
  green100: '#4C9A08',
  green25: '#DCEDCD',
};

const error = {
  error100: '#E9112B',
  error25: '#F9C4CA',
};

const gradient = {
  gradient_green: 'linear-gradient(180deg, #11CD5C 0%, #14995A 100%)',
  gradient_blue: 'linear-gradient(151.27deg, #0369FF 13.55%, #0B47FD 80.64%)',
  gradient_pink: 'linear-gradient(183.71deg, #F99585 2.59%, #F24B77 96.5%)',
};

const colors = {
  primary: '#00A0FF',
  secondary: '#CF04A3',
  tertiary: '#A304CB',
  white: '#FFFFFF',
  ...dark,
  ...success,
  ...error,
  ...gradient,
};

export default colors;
