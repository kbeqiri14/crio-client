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

export const Text = ({ level, children, inline = false, className }) => {
  const TextTag = inline ? 'span' : 'p';
  return <TextTag className={cc([`text-${level}`, className])}>{children}</TextTag>;
};
