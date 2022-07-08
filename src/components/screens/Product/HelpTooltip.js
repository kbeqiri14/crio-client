import { memo, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { me } from '@app/graphql/queries/users.query';
import { updateUser } from '@app/graphql/mutations/user.mutation';
import { Button, Tooltip } from '@ui-kit';
import { ReactComponent as HelpIcon } from '@svgs/help.svg';

const HelpTooltip = () => {
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
        visible={user.id && !user.helpSeen ? true : undefined}
        placement='left'
        width={235}
        trigger={['hover']}
        getPopupContainer={(triggerNode) =>
          triggerNode.parentNode.querySelector('.ant-tooltip-open')
        }
        title='After a user makes a purchase, you will receive an automatic email. Please check your email and complete the order'
      >
        <div style={{ position: 'relative' }}>
          <HelpIcon />
        </div>
      </Tooltip>
      <br />
      {!user.helpSeen && (
        <Button type='link' className='got-it-button' onClick={handleClick} loading={loading}>
          Got it
        </Button>
      )}
    </>
  );
};

export default memo(HelpTooltip);
