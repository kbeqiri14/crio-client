import cc from 'classcat';
import '@styles/typography.less';

const levelMapping = {
  10: 2,
  20: 3,
  30: 4,
};

export const Title = ({ level, children, className, inline = false, color, onClick }) => {
  const TitleTag = inline ? 'span' : `h${levelMapping[level]}`;

  if (!TitleTag) {
    return null;
  }

  return (
    <TitleTag
      className={cc([
        'crio-heading',
        `header-${level}`,
        `crio-heading--color--${color}`,
        className,
      ])}
      onClick={onClick}
    >
      {children}
    </TitleTag>
  );
};

export const Text = ({ level, children, inline = false, className, color, ellipsis, onClick }) => {
  const TextTag = inline ? 'span' : 'p';
  return (
    <TextTag
      className={cc([
        'crio-text',
        `text-${level}`,
        `crio-text--color--${color}`,
        { ellipsis },
        className,
      ])}
      onClick={onClick}
    >
      {children}
    </TextTag>
  );
};
