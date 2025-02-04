import { memo, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { me } from '@app/graphql/queries/users.query';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import { Button, Tooltip } from '@ui-kit';
import { ReactComponent as HelpIcon } from '@svgs/help.svg';

const HelpTooltip = ({ title, placement = 'left', ...props }) => {
  const { user } = useLoggedInUser();
  const [updateUserInfo, { loading }] = useMutation(updateUser, {
    variables: { attributes: { helpSeen: true } },
    update: (cache, mutationResult) => {
      if (mutationResult?.data?.updateUser) {
        const existingData = cache.readQuery({ query: me });
        cache.writeQuery({
          query: me,
          data: { me: { ...existingData?.me, helpSeen: true } },
        });
      }
    },
  });

  const handleClick = useCallback(() => updateUserInfo(), [updateUserInfo]);

  return (
    <>
      <Tooltip
        open={user.id && !user.helpSeen ? true : undefined}
        width={235}
        title={title}
        placement={placement}
        getPopupContainer={(triggerNode) =>
          triggerNode.parentNode.querySelector('.ant-tooltip-open')
        }
        {...props}
      >
        <div className='relative self-end'>
          <HelpIcon />
        </div>
      </Tooltip>
      <br />
      {user.id && !user.helpSeen && (
        <Button type='link' className='got-it-button' onClick={handleClick} loading={loading}>
          Got it
        </Button>
      )}
    </>
  );
};

export default memo(HelpTooltip);
