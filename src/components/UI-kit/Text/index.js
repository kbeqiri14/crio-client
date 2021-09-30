import cc from 'classcat';
import '@styles/typography.less';

const levelMapping = {
  10: 2,
  20: 3,
  30: 4,
};

export const Title = ({ level, children, className }) => {
  const TitleTag = `h${levelMapping[level]}`;

  if (!TitleTag) {
    return null;
  }

  return <TitleTag className={cc([`header-${level}`, className])}>{children}</TitleTag>;
};

export const Text = ({ level, children, className }) => {
  return <p className={cc([`text-${level}`, className])}>{children}</p>;
};
