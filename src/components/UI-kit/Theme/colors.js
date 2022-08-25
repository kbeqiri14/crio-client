const dark = {
  dark200: '#202020',
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
  gradient_green: 'linear-gradient(180deg, #0FBE6B 0%, #069852 100%)',
  gradient_dark_green:
    'linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(180deg, #0FBE6B 0%, #069852 100%)',
  gradient_blue: 'linear-gradient(151.27deg, #0369FF 13.55%, #0B47FD 80.64%)',
  gradient_dark_blue:
    'linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(151.27deg, #026DFF 13.55%, #0B47FD 80.64%)',
  gradient_pink: 'linear-gradient(183.71deg, #F37899 2.59%, #F24B77 96.5%)',
  gradient_dark_pink:
    'linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(183.71deg, #F37899 2.59%, #F24B77 96.5%)',
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
