import { memo } from 'react';

import { Tooltip } from '@ui-kit';
import { ReactComponent as HelpIcon } from '@svgs/help.svg';

const HelpTooltip = () => {
  return (
    <Tooltip
      placement='left'
      width={235}
      getPopupContainer={(triggerNode) => triggerNode.parentNode.querySelector('.ant-tooltip-open')}
      title='After a user makes a purchase, you will recive an automatic email. Please check your email and complete the order'
    >
      <div style={{ position: 'relative' }}>
        <HelpIcon />
      </div>
    </Tooltip>
  );
};

export default memo(HelpTooltip);
